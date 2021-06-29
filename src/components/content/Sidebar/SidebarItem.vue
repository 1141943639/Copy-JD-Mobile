<template>
  <div class="sidebar-item">
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