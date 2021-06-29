<template>
  <div class="sku-window-wrap"
       v-if="Object.keys(skuData).length">
    <div class="sku-window"
         @click="click">
      <div class="sku-window-title">已选</div>
      <div class="sku-window-selected">{{selectedText}}</div>
      <div class="sku-window-right-icon">
        <img :src="rightIcon"
             alt="">
      </div>
    </div>
    <van-sku v-model="show"
             :sku="skuData.sku"
             :goods="skuData.goodsInfo"
             :goods-id="productIid"
             :initial-sku="skuData.initialSku"
             :start-sale-num="skuData.startSaleNum"
             :quota="skuData.quota"
             :lazy-load="true"
             @add-cart="addCart"
             @buy-clicked="clickBuy"
             @sku-selected="changeSelected"
             @stepper-change="changeSelectedNum"
             ref="sku" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState: productState, mapMutations: productMutations } =
  createNamespacedHelpers('product')

const { mapActions: cartListActions } = createNamespacedHelpers('cartList')

export default {
  data() {
    return {
      show: false,
      selectedText: '',
      rightIcon: require('assets/image/Product/public/right-icon.png'),
    }
  },
  computed: {
    ...productState([
      'selectedSkuComb',
      'selectedNum',
      'title',
      'shop',
      'productIid',
      'skuData',
      'showSku',
    ]),
  },
  watch: {
    show(show) {
      this.changeShowSku(show)
    },
    showSku(show) {
      this.show = show
    },
  },
  methods: {
    ...productMutations([
      'updateSelectedSkuComb',
      'findSelectedImage',
      'updateSelectedNum',
      'changeShowSku',
    ]),
    ...cartListActions(['addProduct']),
    click() {
      this.show = true
    },
    async addCart() {
      this.addProduct()

      this.show = false
    },
    clickBuy() {
      this.ste()
    },
    getSkuValueName(obj) {
      const keyValue = {}
      const res = []

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
    changeSelected() {
      const data = this.$refs.sku.getSkuData()
      const { selectedNum, selectedSkuComb } = data

      this.updateSelectedSkuComb(selectedSkuComb)

      if (!selectedSkuComb) return

      const textArr = `${this.getSkuValueName(selectedSkuComb).join(
        '，'
      )}，${selectedNum}个`

      this.selectedText = textArr
    },
    changeSelectedNum(num) {
      this.updateSelectedNum(num)
    },
  },
}
</script>

<style scoped lang='less'>
.sku-window {
  position: relative;
  display: flex;
  padding: 18px 0px;
  font-size: 13px;

  .sku-window-title {
    width: 35px;
    font-weight: 700;
  }

  .sku-window-selected {
    width: 261px;
    margin-left: 3px;
    color: #333;
  }

  .sku-window-right-icon {
    position: absolute;
    right: 0px;
    top: 12px;
    width: 20px;
    height: 20px;

    & img {
      width: 100%;
    }
  }
}
</style>