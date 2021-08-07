<template>
  <div class="sort-wrap">
    <sort-content />
    <bottom-nav-bar />
  </div>
</template>

<script>
import SortContent from './ChildComponents/SortContent/SortContent.vue'
import BottomNavBar from './ChildComponents/BottomNavBar.vue'

export default {
  name: 'Sort',

  components: {
    SortContent,
    BottomNavBar,
  },
}
</script>

<style scoped>
</style>