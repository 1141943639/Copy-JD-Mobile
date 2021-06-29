<template>
  <div class="cart-wrap">
    <top-nav-bar />
    <cart-list />
    <cart-list-blank />
    <submit-bar />
    <cart-list-sku />
    <bottom-nav-bar />
  </div>
</template>

<script>
import TopNavBar from './ChildrenComponents/TopNavBar.vue'
import CartList from './ChildrenComponents/CartList.vue'
import CartListBlank from './ChildrenComponents/CartListBlank.vue'
import SubmitBar from './ChildrenComponents/SubmitBar.vue'
import CartListSku from './ChildrenComponents/CartListSku.vue'
import BottomNavBar from './ChildrenComponents/BottomNavBar.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('cartList')

export default {
  components: {
    TopNavBar,
    CartList,
    CartListBlank,
    SubmitBar,
    CartListSku,
    BottomNavBar,
  },

  computed: {
    ...mapState(['cartList']),
  },
}
</script>

<style scoped>
</style>