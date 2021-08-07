<template>
  <div class="register-wrap">
    <top-nav-bar />
    <register-input />
  </div>
</template>

<script>
import TopNavBar from './ChildComponents/TopNavBar.vue'
import RegisterInput from './ChildComponents/RegisterInput.vue'

export default {
  name: 'Register',
  components: {
    TopNavBar,
    RegisterInput,
  },
}
</script>

<style scoped lang='less'>
</style>