<template>
  <div class="profile-top-bar">
    <van-nav-bar fixed
                 class="profile-top-bar">
      <template #left>
        <van-icon class-prefix="icon"
                  name="left-back-arrow"
                  class="profile-top-bar-left-icon"
                  @click="clickBack" />
      </template>
      <template #title>
        <div class="profile-top-bar-title">个人中心</div>
      </template>
      <template #right>
        <van-icon class-prefix="icon"
                  name="right-more-icon"
                  class="profile-top-bar-right-icon" />
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
.profile-top-bar {
  height: 45px;

  .profile-top-bar-left-icon {
    font-weight: 700;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
  }

  .profile-top-bar-right-icon {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>