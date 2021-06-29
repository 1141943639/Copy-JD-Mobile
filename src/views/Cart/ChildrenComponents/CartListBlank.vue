<template>
  <div class="cart-list-blank-wrap"
       v-if="!Object.keys(cartList).length">
    <van-empty image="https://img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png"
               class="cart-list-blank">
      <template #description>
        <div class="cart-list-blank-description">
          购物车空空如也
        </div>
      </template>
    </van-empty>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('cartList')

export default {
  computed: {
    ...mapState(['cartList']),
  },
}
</script>

<style scoped lang='less'>
.cart-list-blank-wrap {
  display: flex;
  align-items: center;
  height: calc(100vh - 44px - 100px);
  .cart-list-blank {
    width: 100%;

    .cart-list-blank-description {
      color: #333;
    }
  }
}
</style>