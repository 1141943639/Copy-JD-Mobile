<template>
  <div>

    <keep-alive exclude="Product, NavBar">
      <router-view :key="key" />
    </keep-alive>

    <loading :isLoading="isLoading" />
  </div>
</template>

<script>
import Loading from 'components/common/Loading/Loading.vue'

import { createNamespacedHelpers, mapState } from 'vuex'

const { mapActions: cartListActions } = createNamespacedHelpers('cartList')
const { mapActions: historyActions } = createNamespacedHelpers('history')
const { mapActions: collectionActions } = createNamespacedHelpers('collection')
const { mapActions: loginActions } = createNamespacedHelpers('login')
const { mapActions: userListActions } = createNamespacedHelpers('userData')
const { mapActions: sortActions } = createNamespacedHelpers('sort')

export default {
  components: {
    Loading,
  },

  created() {
    this.initRequst()
  },

  computed: {
    ...mapState(['isLoading']),

    key() {
      return this.$route.path + Math.random
    },
  },

  methods: {
    ...cartListActions(['requestCartList']),
    ...historyActions(['requestHistory']),
    ...collectionActions(['requestCollection']),
    ...loginActions(['requestLogin']),
    ...userListActions(['requestUserData']),
    ...sortActions(['requestSortList']),

    // 初始化数据请求
    initRequst() {
      this.requestCartList()
      this.requestHistory()
      this.requestCollection()
      this.requestLogin()
      this.requestUserData()
      this.requestSortList()
    },
  },
}
</script>

<style scoped>
</style>