<template>
  <div class="login-top-bar">
    <van-nav-bar fixed
                 class="login-top-bar">
      <template #left>
        <van-icon class-prefix="icon"
                  name="left-back-arrow"
                  class="login-top-bar-left-icon"
                  @click="clickBack" />
      </template>
      <template #title>
        <div class="login-top-bar-title">登录</div>
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
.login-top-bar {
  height: 45px;

  .login-top-bar-left-icon {
    font-weight: 700;
    font-size: 16px;
    color: rgba(0, 0, 0);
  }

  .login-top-bar-title {
    font-size: 18px;
  }
}
</style>