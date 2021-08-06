<template>
  <div class="sort-content">
    <sort-side-bar />
    <sort-content-info />
  </div>
</template>

<script>
import SortSideBar from './ChildComponents/SortSideBar.vue'
import SortContentInfo from './ChildComponents/SortContentInfo.vue'

export default {
  components: {
    SortSideBar,
    SortContentInfo,
  },
}
</script>

<style scoped lang='less'>
.sort-content {
  display: flex;

  height: calc(100vh - 55px);
  overflow: hidden;
}
</style>