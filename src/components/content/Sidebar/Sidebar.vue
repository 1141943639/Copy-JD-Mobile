<template>
  <div class="sidebar"
       @click="clickItme"
       ref="sidebar">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
  },

  methods: {
    clickItme({ target }) {
      const child = [].slice.call(this.$refs.sidebar.children)

      child.forEach((item) => {
        item.classList.remove('sidebar-item-active')
      })

      target.classList.add('sidebar-item-active')
    },
  },
}
</script>

<style scoped lang='less'>
.sidebar {
  overflow: hidden;
  height: 100%;
}
</style>