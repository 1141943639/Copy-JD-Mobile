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
const { mapState, mapActions } = createNamespacedHelpers('cartList')

import { hasCookie } from 'common/cookieAPI.js'

export default {
  name: 'Cart',
  components: {
    TopNavBar,
    CartList,
    CartListBlank,
    SubmitBar,
    CartListSku,
    BottomNavBar,
  },

  data() {
    return {
      isLogin: false,
    }
  },

  computed: {
    ...mapState(['cartList']),
  },

  methods: {
    ...mapActions(['requestCartList']),
  },

  created() {
    // 当第一次访问购物车时请求数据 并且保存初次访问时的登录状态
    this.requestCartList()
    this.isLogin = hasCookie('isLogin')
  },

  activated() {
    // 当购物车组件被缓存完之后每次进入都会判断登录状态的改变
    if (hasCookie('isLogin') !== this.isLogin) {
      // 如果登录状态改变了就重新请求数据
      this.requestCartList()
    }
  },
}
</script>

<style scoped>
</style>