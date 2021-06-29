<template>
  <div class="cart-list-item-wrap clear-fix">
    <van-swipe-cell right-width="50">
      <div class="cart-list-item-body">
        <div class="cart-list-item-select"
             @click="changeSelected">
          <van-icon class-prefix="icon"
                    name="cart-list-selected-icon"
                    class="cart-list-item-selected-icon"
                    v-show="selected" />
          <div class="cart-list-item-selec-icon"
               v-show="!selected"></div>
        </div>
        <van-card class="cart-list-item">
          <template #thumb>
            <div class="cart-list-item-thumb">
              <img :src="image"
                   alt="">
            </div>
          </template>
          <template #title>
            <div class="cart-list-item-title">{{title.text}}</div>
          </template>
          <template #desc>
            <div class="cart-list-item-desc">
              <div class="cart-list-item-desc-sku-window"
                   @click="clickShowSku">{{selecedText}}选服务
                <img :src="require('assets/image/Cart/down-arrow.png')"
                     alt=""
                     class="cart-list-item-desc-sku-window-right-icon">
              </div>
            </div>
          </template>
          <template #price>
            <div class="cart-list-item-price">
              <span class="cart-list-item-price-currency">￥</span>
              <span class="cart-list-item-price-integer">{{price | integer}}</span>
              <span class="cart-list-item-price-decimal">{{price | decimal}}</span>
            </div>
          </template>
          <template #num>
            <van-stepper :value="selectedNum"
                         async-change
                         class="cart-list-item-num"
                         @change="changeNum" />
          </template>
        </van-card>
      </div>

      <template #right>
        <div class="cart-list-item-delete-button"
             @click="clickDelete">
          删除
        </div>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapMutations, mapGetters } =
  createNamespacedHelpers('cartList')

export default {
  props: {
    selectedSkuComb: {
      type: Object,
    },
    skuData: {
      type: Object,
    },
    index: {
      type: [Number, String],
    },
    iid: {
      type: [Number, String],
    },
    shopsIid: {
      type: [Number, String],
    },
    image: {
      type: String,
    },
    title: {
      type: Object,
    },
    selectedNum: {
      type: [Number, String],
    },
    selected: {
      type: Boolean,
    },
  },

  data() {
    return {
      showSku: false,
      selecedText: '',
      isConfirm: false,
      selectedNumCopy: this.selectedNum,
    }
  },

  computed: {
    ...mapGetters(['getShop']),

    price() {
      const price = String(this.selectedSkuComb.price).split('')
      price.splice(-2, 0, '.')
      return price.join('')
    },
  },

  watch: {
    selectedSkuComb: {
      handler: 'changeSelectedText',
      immediate: true,
    },
  },

  filters: {
    integer(value) {
      value = String(value)
      return value.indexOf('.') < 0 ? value : value.slice(0, value.indexOf('.'))
    },
    decimal(value) {
      value = String(value)

      return value.indexOf('.') < 0 ? '00' : value.slice(value.indexOf('.'))
    },
  },

  methods: {
    ...mapActions([
      'changeCount',
      'deleteProduct',
      'changeProductSelectedNum',
      'changeSkuDetail',
      'changeProductProperty',
      'changeShopProperty',
      'changeProductSelected',
    ]),
    ...mapMutations(['setProperty']),

    changeNum(value) {
      this.changeProductProperty([
        'selectedNum',
        value,
        this.shopsIid,
        this.iid,
      ])
    },

    async changeSelected() {
      this.changeProductSelected([this.shopsIid, this.iid, !this.selected])
    },

    async clickDelete() {
      await this.deleteProduct([this.shopsIid, this.iid])
    },

    getSkuValueName(obj) {
      const keyValue = {}
      const res = []

      if (!obj) return

      for (const k of Object.keys(obj)) {
        if (new RegExp(/^s\d+/).test(k)) {
          keyValue[k] = obj[k]
        }
      }

      for (const k in keyValue) {
        for (const prop of this.skuData.sku.tree) {
          if (String(prop.k_s) === k) {
            for (const v of prop.v) {
              if (v.id === keyValue[k]) {
                res.push(v.name)
                break
              }
            }
          }
        }
      }

      return res
    },

    changeSelectedText() {
      let textArr = this.getSkuValueName(this.selectedSkuComb)

      if (!textArr) return

      textArr = textArr.join('，') + '，'

      this.selecedText = textArr
    },

    clickShowSku() {
      this.changeSkuDetail([this.shopsIid, this.iid])
      this.setProperty(['skuShow', true])
    },
  },
}
</script>

<style scoped lang='less'>
.cart-list-item-wrap {
  .cart-list-item-body {
    display: flex;

    .cart-list-item-select {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      position: relative;

      .cart-list-item-selected-icon {
        font-size: 20px;
        color: var(--red);
      }

      .cart-list-item-selec-icon {
        position: absolute;
        width: 18px;
        height: 17px;
        border: 2px solid rgba(0, 0, 0, 0.5);
        border-radius: 50%;
      }
    }

    .cart-list-item {
      padding: 0px;
      padding-right: 18px;

      .cart-list-item-thumb {
        width: 100px;
        height: 100px;
        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .cart-list-item-title {
        width: 195px;
        line-height: 18px;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .cart-list-item-desc {
        .cart-list-item-desc-sku-window {
          position: relative;
          display: inline-block;
          line-height: 16px;
          margin: 6px 0px 8px;

          .cart-list-item-desc-sku-window-right-icon {
            position: absolute;
            top: 1px;
            margin-left: 3px;
            width: 13px;
            height: 13px;
          }
        }
      }

      .cart-list-item-price {
        font-size: 12px;
        font-weight: 700;
        color: var(--red);

        .cart-list-item-price-integer {
          font-size: 20px;
        }
      }
    }
  }

  .cart-list-item-delete-button {
    background: var(--red);
    color: #fff;
    line-height: 108px;
    width: 50px;
    text-align: center;
    margin-right: 20px;
  }
}
</style>