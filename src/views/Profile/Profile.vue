<template>
  <div class="profile-wrap">
    <top-nav-bar />
    <profile-header />
    <profile-record />
    <profile-order />
    <profile-logout />
    <bottom-nav-bar />
  </div>
</template>

<script>
import TopNavBar from './ChildComponents/TopNavBar.vue'
import ProfileHeader from './ChildComponents/ProfileHeadPortrait.vue'
import ProfileRecord from './ChildComponents/ProfileRecord.vue'
import ProfileOrder from './ChildComponents/ProfileOrder.vue'
import ProfileLogout from './ChildComponents/ProfileLogout.vue'
import BottomNavBar from './ChildComponents/BottomNavBar.vue'

export default {
  name: 'Profile',
  components: {
    TopNavBar,
    ProfileHeader,
    ProfileRecord,
    ProfileOrder,
    ProfileLogout,
    BottomNavBar,
  },
}
</script>

<style scoped>
.profile-wrap {
  background: #f6f6f6;
}
</style>