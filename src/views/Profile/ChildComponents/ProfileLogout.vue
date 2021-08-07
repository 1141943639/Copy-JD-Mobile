<template>
  <div class="profile-logout-wrap">
    <van-button @click="onLogout"
                class="profile-logout-button">退出登录</van-button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('login')

export default {
  methods: {
    ...mapActions(['logout']),

    async onLogout() {
      await this.logout()

      this.$router.push('/')
    },
  },
}
</script>

<style scoped lang='less'>
.profile-logout-wrap {
  margin: 20px 10px;

  .profile-logout-button {
    width: 100%;

    color: #fff;
    font-size: 16px;
    background: var(--red);

    border-radius: 20px;
  }
}
</style>