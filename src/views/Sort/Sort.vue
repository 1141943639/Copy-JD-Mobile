<template>
  <div class="sort-wrap">
    <sort-side-bar :sortList="sortList" :activeKey="activeKey" />
    <bottom-nav-bar />
  </div>
</template>

<script>
import SortSideBar from './ChildComponents/SortSideBar.vue'
import BottomNavBar from './ChildComponents/BottomNavBar.vue'

import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('sort')

export default {
  components: {
    SortSideBar,
    BottomNavBar,
  },

  computed: {
    ...mapState(['sortList', 'activeKey']),
  },
}
</script>

<style scoped>
</style>