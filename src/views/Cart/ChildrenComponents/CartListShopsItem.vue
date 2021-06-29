<template>
  <div class="cart-list-shops-item-wrap">
    <div class="cart-list-shops-item-header">
      <div class="cart-list-shops-item-header-select"
           @click="changeSelected">
        <van-icon class-prefix="icon"
                  name="cart-list-selected-icon"
                  class="cart-list-shops-item-header-selected-icon"
                  v-show="shop.selected" />
        <div class="cart-list-shops-item-header-select-icon"
             v-show="!shop.selected"></div>
      </div>
      <div class="cart-list-shops-item-header-title">
        <van-icon class-prefix="icon"
                  name="product-bottom-bar-business"
                  class="cart-list-shops-item-header-title-left-icon" />
        <div class="cart-list-shops-item-header-title-text">{{shop.shopsName}}</div>
      </div>
    </div>
    <cart-list-i-product-item v-for="(item, i) in shop.list"
                              :key="item.iid"
                              :selectedSkuComb="item.selectedSkuComb"
                              :skuData="item.skuData"
                              :index="i"
                              :iid="item.productIid"
                              :title="item.title"
                              :selectedNum="item.selectedNum"
                              :image="item.image"
                              :shopsIid="shop.shopsIid"
                              :selected="item.selected" />
  </div>
</template>

<script>
import CartListIProductItem from './CartListIProductItem.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapMutations } = createNamespacedHelpers('cartList')

export default {
  components: {
    CartListIProductItem,
  },

  props: {
    shop: {
      type: Object,
    },
  },

  computed: {
    productHasSelected() {
      return this.shop.list.every(({ selected }) => selected)
    },
  },

  watch: {
    async productHasSelected(hasSelected) {
      // if (!hasSelected) {
      //   await this.changeShopProperty(['selected', false, this.shop.shopsIid])
      // }
    },
  },

  methods: {
    ...mapActions(['changeShopSelected', 'changeProductProperty']),
    ...mapMutations(['updateCartList']),

    async changeSelected() {
      // await this.changeShopProperty([
      //   'selected',
      //   !this.shop.selected,
      //   this.shop.shopsIid,
      // ])

      // const newList = this.shop.list.map((item) => {
      //   item.selected = this.shop.selected

      //   return item
      // })

      // await this.changeShopProperty(['list', newList, this.shop.shopsIid])

      this.changeShopSelected([this.shop.shopsIid, !this.shop.selected])
    },
  },
}
</script>

<style scoped lang='less'>
.cart-list-shops-item-wrap {
  .cart-list-shops-item-header {
    display: flex;
    height: 30px;
    margin-bottom: 12px;

    .cart-list-shops-item-header-select {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 50px;

      .cart-list-shops-item-header-selected-icon {
        margin-top: 5px;
        font-size: 20px;
        width: 19px;
        color: var(--red);
      }

      .cart-list-shops-item-header-select-icon {
        margin-top: 4px;
        margin-left: 2px;
        width: 18px;
        height: 17px;
        border: 2px solid rgba(0, 0, 0, 0.5);
        border-radius: 50%;
      }
    }

    .cart-list-shops-item-header-title {
      display: flex;
      align-items: center;

      .cart-list-shops-item-header-title-left-icon {
        margin-top: 5px;
        margin-right: 6px;
      }

      .cart-list-shops-item-header-title-text {
        display: inline-block;
        font-size: 12px;
        font-weight: 700;
        color: #333;
      }
    }
  }
}
</style>