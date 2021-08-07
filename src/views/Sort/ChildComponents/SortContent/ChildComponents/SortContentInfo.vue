<template>
  <div class="sort-content-info-wrap">
    <sidebar-content :list="contentList"
                     class="sort-content-info-item" />
  </div>
</template>

<script>
import SidebarContent from 'components/content/SidebarContent/SidebarContent.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sort')

export default {
  components: {
    SidebarContent,
  },

  data() {
    return {
      contentList: [],
    }
  },

  computed: {
    ...mapState(['activeKey']),
  },

  watch: {
    activeKey: {
      handler: 'requestNewContent',
      immediate: true,
    },
  },

  methods: {
    ...mapActions(['requestSortContent']),

    async requestNewContent(index) {
      this.contentList = await this.requestSortContent(index)
    },
  },
}
</script>

<style scoped lang='less'>
.sort-content-info {
}
</style>