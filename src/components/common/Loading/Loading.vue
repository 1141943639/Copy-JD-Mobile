<template>
  <div v-show="isLoading"
       class="loading">
    <van-loading color="#ee0a24"
                 size="40" />
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
    },
  },
}
</script>

<style scoped lang='less'>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-content: center;
}
</style>