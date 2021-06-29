<template>
  <div class="profile-header-wrap">
    <div class="profile-header-info">
      <div class="profile-header-info-icon">
        <img :src="require('assets/image/Profile/user-default-icon.png')"
             alt="">
      </div>
      <div class="profile-header-info-user-nickyname">{{nickname}}</div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('userData')

export default {
  computed: {
    ...mapState(['userList']),

    nickname() {
      return this.userList.nickname
    },
  },
}
</script>

<style scoped lang='less'>
.profile-header-wrap {
  position: relative;
  height: 230px;
  background: linear-gradient(135deg, var(--red), #f03a4b);

  .profile-header-info {
    .profile-header-info-icon {
      width: 100px;
      margin: 0px auto;
      padding-top: 40px;

      & img {
        width: 100%;
        height: 100%;
      }
    }

    .profile-header-info-user-nickyname {
      color: #fff;
      font-size: 20px;
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>