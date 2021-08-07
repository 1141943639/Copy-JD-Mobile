<template>
  <div class="login-wrap">
    <top-nav-bar />
    <login-input />
  </div>
</template>

<script>
import TopNavBar from './ChildComponents/TopNavBar.vue'
import LoginInput from './ChildComponents/LoginInput/LoginInput.vue'

export default {
  name: 'Login',
  components: {
    TopNavBar,
    LoginInput,
  },
}
</script>

<style scoped lang='less'>
</style>