<template>
  <div class="sidebar-item"
       ref="sidebarItem">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },

  computed: {
    offsetTop() {
      return this.$refs.sidebarItem.offsetTop
    },
  },

  mounted() {
    const sidebarItem = this.$refs.sidebarItem
    const child = [].slice.call(this.$parent.$refs.position.children)[0]

    // 设置第一个标签为active状态
    if (child === sidebarItem) {
      sidebarItem.classList.add('sidebar-item-active')
    }
  },
}
</script>

<style scoped lang='less'>
.sidebar-item {
  text-align: center;
  font-size: 14px;
}

.sidebar-item-active {
  color: var(--red);
}
</style>