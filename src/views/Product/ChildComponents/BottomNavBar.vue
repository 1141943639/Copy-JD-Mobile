<template>
  <div class="bottom-bar-wrapper">
    <van-goods-action>
      <van-goods-action-icon class="icon-wrapper"
                             @click="clickBusiness">
        <div class="icon-text">店铺</div>
        <template #icon>
          <van-icon class-prefix="icon"
                    name="product-bottom-bar-business"
                    class="business icon" />
        </template>
      </van-goods-action-icon>

      <van-goods-action-icon class="icon-wrapper"
                             @click="clickCustomerService">
        <div class="icon-text">客服</div>
        <template #icon>
          <van-icon class-prefix="icon"
                    name="product-bottom-bar-customer-service"
                    class="icon" />
        </template>
      </van-goods-action-icon>
      <van-goods-action-icon class="icon-wrapper"
                             @click="clickCart">
        <div class="icon-text">购物车</div>
        <template #icon>
          <van-badge :content="getProductNumber"
                     v-if="getProductNumber">
            <van-icon class-prefix="icon"
                      name="product-bottom-bar-cart"
                      class="icon" />
          </van-badge>
          <van-icon class-prefix="icon"
                    name="product-bottom-bar-cart"
                    class="icon"
                    v-if="!getProductNumber" />
        </template>
      </van-goods-action-icon>
      <van-goods-action-button class="button"
                               type="primary"
                               text="加入购物车"
                               color="linear-gradient(to right, #f2180c, #f23f0c)"
                               @click="clickAddCart" />
      <van-goods-action-button class="button"
                               type="primary"
                               text="立刻购买"
                               color="linear-gradient(to right, #ffbb0d, #ffcb0d)"
                               @click="clickBuy" />
    </van-goods-action>
    <div class="bottom-bar-placeholder"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapActions: cartListActions,

  mapGetters: cartListGetters,
} = createNamespacedHelpers('cartList')

const { mapState: productState, mapMutations: productMutations } =
  createNamespacedHelpers('product')

export default {
  computed: {
    ...cartListGetters(['getProductNumber']),
    ...productState(['selectedSkuComb']),
  },

  methods: {
    ...cartListActions(['addProduct']),

    ...productMutations(['changeShowSku']),

    clickBusiness() {
      this.ste()
    },
    clickCustomerService() {
      this.ste()
    },
    clickCart() {
      this.$router.push({
        name: 'Cart',
      })
    },
    clickAddCart() {
      if (!this.selectedSkuComb) {
        this.changeShowSku(true)
        return
      }

      this.addProduct()
    },
    clickBuy() {
      this.ste()
    },
  },
}
</script>

<style scoped lang='less'>
.bottom-bar-wrapper {
  .icon-wrapper {
    width: 52.5px;

    .icon-text {
      color: #262626;
    }

    .icon {
      font-size: 20px;
    }

    .business {
      color: var(--red);
    }
  }

  .button {
    font-weight: 700;
  }

  .bottom-bar-placeholder {
    width: 100%;
    height: 50px;
  }
}
</style>