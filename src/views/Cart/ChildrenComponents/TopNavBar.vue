<template>
  <div class="top-bar-wrap">
    <van-nav-bar fixed
                 class="top-bar">
      <template #left>
        <van-icon class-prefix="icon"
                  name="left-back-arrow"
                  class="top-bar-left-icon"
                  @click="clickBack" />
      </template>
      <template #title>
        <div class="top-bar-title">购物车</div>
      </template>
      <template #right>
        <van-icon class-prefix="icon"
                  name="right-more-icon"
                  class="top-bar-right-icon" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  methods: {
    clickBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang='less'>
.top-bar-wrap {
  height: 44px;
  .top-bar {
    height: 44px;
    color: #333;

    .top-bar-left-icon {
      font-weight: 700;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.5);
    }

    .top-bar-title {
      font-size: 18px;
    }

    .top-bar-right-icon {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>