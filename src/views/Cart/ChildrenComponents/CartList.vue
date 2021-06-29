<template>
  <div class="cart-list-wrap">
    <cart-list-shops-item v-for="item in cartList"
                          :key="item.shopsIid"
                          :shop="item" />
  </div>
</template>

<script>
import CartListShopsItem from './CartListShopsItem.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('cartList')

export default {
  components: {
    CartListShopsItem,
  },

  computed: {
    ...mapState(['cartList']),
  },
}
</script>

<style scoped lang='less'>
</style>