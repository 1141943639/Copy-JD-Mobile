<template>
  <div class="sort-side-bar-wrap">
    <!-- <van-sidebar class="sort-side-bar">
      <div @click="clickItem(index)"
           v-for="(item, index) in sortList"
           :key="item.id"
           class="sort-side-bar-item-position"
           :ref="index">
        <van-sidebar-item :title="item.title" />
      </div>
    </van-sidebar> -->
    <sidebar class="sort-side-bar">
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

const { mapMutations } = createNamespacedHelpers('sort')

export default {
  components: {
    Sidebar,
    SidebarItem,
  },

  props: {
    sortList: {
      type: Array,

      default() {
        return []
      },
    },

    activeKey: {
      type: Number,
    },
  },

  data() {
    return {
      activeKeyCopy: this.activeKey,
    }
  },

  watch: {
    // activeKey的双向绑定
    activeKey(key) {
      this.activeKeyCopy = key
    },

    activeKeyCopy(key) {
      this.updateActiveKey(key)
    },
  },

  methods: {
    ...mapMutations(['updateActiveKey']),

    clickItem(i) {
      const dom = document.querySelector('.sort-side-bar')
      const item = this.$refs[i][0]

      dom.scrollTop = this.$refs[i][0].offsetTop
    },
  },
}
</script>

<style scoped lang='less'>
.sort-side-bar-wrap {
  display: inline-block;
  width: 85px;

  .sort-side-bar {
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