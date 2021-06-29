<template>
  <div class="login-input-wrap">
    <pass-word-login />
  </div>
</template>

<script>
import PassWordLogin from './ChildComponents/PassWordLogin.vue'

export default {
  components: {
    PassWordLogin,
  },
}
</script>

<style scoped lang='less'>
.login-input-wrap {
  padding: 0px 25px;
}
</style>