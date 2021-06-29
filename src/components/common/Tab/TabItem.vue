<template>
  <div class="tab-item">
    <span class="tab-item-text">{{title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
  },
}
</script>

<style scoped lang='less'>
.tab-item {
  height: 100%;

  .tab-item-text {
    padding: 0px 3px;
  }
}
</style>