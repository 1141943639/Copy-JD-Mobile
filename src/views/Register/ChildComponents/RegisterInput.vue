<template>
  <van-form class="register-input-wrap"
            :show-error="false"
            @submit="submit">
    <div class="username wrap">
      <div class="username-text text">用户名</div>
      <van-field type="text"
                 v-model="username"
                 name="username"
                 :rules="[{
                   validator: checkRepeatUsername,
                   message: '用户名已被使用'
                 },
                 {
                   validator: checkIsEmpty,
                 }]"
                 class="username-input input" />
    </div>
    <div class="password wrap">
      <div class="password-text text">密码</div>
      <van-field type="password"
                 v-model="password"
                 name="password"
                 :rules="[{
                    validator: checkIsEmpty,
                 }]"
                 class="password-input input" />
    </div>
    <div class="password-rewrite wrap">
      <div class="password-rewrite-text text">确认密码</div>
      <van-field type="password"
                 v-model="passwordRewrite"
                 name="passwordRewrite"
                 class="password-rewrite-input input"
                 :rules="[{
                  validator: checkPasswordRewrite,
                  message: '两次密码不相同'
                 },
                 {
                   validator: checkIsEmpty,
                 }]" />
    </div>
    <div class="email wrap">
      <div class="email-text text">邮箱</div>
      <van-field type="text"
                 v-model="email"
                 name="email"
                 class="email-input input"
                 :rules="[{
                   validator: checkEmail,
                    message: '邮箱格式不正确'
                  },
                  {
                    validator: checkRepeatEmail,
                    message: '邮箱已被使用'
                  },
                  {
                    validator: checkIsEmpty,
                  }]" />
    </div>
    <van-button color="linear-gradient(to right, #f20101, #ff4e18)"
                class="submit-button"
                :disabled="isDisable">确认注册</van-button>
  </van-form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('login')

export default {
  data() {
    return {
      username: '',
      password: '',
      passwordRewrite: '',
      email: '',

      usernameHasRepeat: false,
      emailHasRepeat: false,
    }
  },

  computed: {
    ...mapGetters(['checkHasNoRepeat']),

    isDisable() {
      if (
        this.username.length &&
        this.password.length &&
        this.passwordRewrite.length &&
        this.email.length &&
        this.checkEmail() &&
        this.checkPasswordRewrite()
      ) {
        return false
      }

      return true
    },
  },

  methods: {
    ...mapActions(['register']),

    checkEmail() {
      if (!this.email.length) return true

      return /@/.test(this.email)
    },

    checkPasswordRewrite() {
      if (!this.passwordRewrite.length) return true

      return this.password === this.passwordRewrite
    },

    checkRepeatUsername() {
      return this.checkHasNoRepeat('username', this.username)
    },

    checkRepeatEmail() {
      return this.checkHasNoRepeat('email', this.email)
    },

    checkIsEmpty(value) {
      if (!value.length) return false

      return true
    },

    async submit({ username, password, email }) {
      await this.register({ username, password, email })

      this.$router.push({
        name: 'Home',
      })
    },
  },
}
</script>

<style scoped lang='less'>
.register-input-wrap {
  padding: 0px 25px;
  .submit-button {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    font-size: 16px;
  }

  .input {
    line-height: 30px;
    padding: 8px 10px;
    font-size: 18px;
    border: 2px solid #999;
    border-radius: 10px;
  }

  .wrap {
    position: relative;
    margin-top: 20px;
  }

  .text {
    position: absolute;
    left: 10px;
    transform: translateY(-50%);
    z-index: 1;
    padding: 0px 10px;
    background: #fff;
    font-size: 16px;
    color: #000;
  }
}
</style>