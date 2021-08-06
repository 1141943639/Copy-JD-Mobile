<template>
  <div class="sort-side-bar-wrap">
    <sidebar class="sort-side-bar"
             v-model="activeKeyCopy">
      <sidebar-item v-for="item in sortList"
                    :key="item.id"
                    :title="item.title"
                    class="sort-side-bar-item" />
    </sidebar>
  </div>
</template>

<script>
import Sidebar from 'components/content/Sidebar/Sidebar.vue'
import SidebarItem from 'components/content/Sidebar/SidebarItem.vue'

import { createNamespacedHelpers } from 'vuex'

const { mapMutations, mapState } = createNamespacedHelpers('sort')

export default {
  components: {
    Sidebar,
    SidebarItem,
  },

  data() {
    return {
      activeKeyCopy: 0,
    }
  },

  computed: {
    ...mapState(['activeKey', 'sortList']),
  },

  watch: {
    // 跟vuex的activeKey进行双向绑定
    activeKey: {
      handler: 'updateActiveKeyCopy',
      immediate: true,
    },

    activeKeyCopy(key) {
      this.updateActiveKey(key)
    },
  },

  methods: {
    ...mapMutations(['updateActiveKey']),

    updateActiveKeyCopy(key) {
      this.activeKeyCopy = key
    },
  },
}
</script>

<style scoped lang='less'>
.sort-side-bar-wrap {
  flex-shrink: 0;
  width: 85px;
  height: 100%;

  .sort-side-bar {
    height: 100%;

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }

    .sort-side-bar-item {
      width: 100%;
      line-height: 46px;
    }
  }
}
</style>