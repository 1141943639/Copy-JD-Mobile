<template>
  <div>
    <van-form :show-error="false"
              @submit="onLogin"
              validate-trigger="onSubmit"
              validate-first>
      <div>
        <van-field v-model="username"
                   clearable
                   type="text"
                   placeholder="用户名"
                   class="user-name input"
                   :rules="[{
                     validator: checkUsername,
                     message: '用户名不正确'
                   }]" />

      </div>
      <div class="password-wrap">
        <van-field v-model="password"
                   placeholder="请输入密码"
                   clearable
                   :type="isPassword"
                   class="password input"
                   :rules="[{
                     validator: checkPasswordCorrect,
                     message: '密码不正确'
                   }]">
          <template #right-icon>
            <div @click="changeEye"
                 class="password-right-icon">
              <van-icon class-prefix="icon"
                        name="close-eye"
                        v-show="!isOpenEye" />
              <van-icon class-prefix="icon"
                        name="open-eye"
                        v-show="isOpenEye" />
            </div>
          </template>
        </van-field>
        <div class="password-forget">忘记密码</div>
      </div>
      <div class="login-button-wrap">
        <van-button type="primary"
                    color="linear-gradient(to right, #f20101, #ff4e18)"
                    class="login-button button"
                    :disabled="isDisable">登 录</van-button>
        <van-button type="primary"
                    plain
                    color="#f20101"
                    class="register-button button"
                    @click="clickGoRegister">注 册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapActions, mapGetters } =
  createNamespacedHelpers('login')

export default {
  data() {
    return {
      username: '',
      password: '',
      isOpenEye: false,
    }
  },
  computed: {
    ...mapGetters(['checkHasRepeat', 'checkPassword']),

    isPassword() {
      return this.isOpenEye ? '' : 'password'
    },
    isDisable() {
      return !Boolean(this.username.length && this.password.length)
    },
  },
  methods: {
    ...mapMutations(['updateProperty']),
    ...mapActions(['login']),

    changeEye() {
      this.isOpenEye = !this.isOpenEye
    },

    checkUsername(username) {
      return this.checkHasRepeat('username', username)
    },
    checkPasswordCorrect(password) {
      return this.checkPassword(this.username, password)
    },

    clickGoRegister() {
      this.$router.push({
        name: 'Register',
      })
    },
    async onLogin() {
      await this.login(this.username)
      this.$router.push('/')
    },
  },
}
</script>

<style scoped lang='less'>
.input {
  line-height: 30px;
  font-size: 16px;
  padding: 10px 0px;
  margin-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.password-wrap {
  position: relative;

  .password {
    padding-right: 100px;

    .password-right-icon {
      margin-right: 20px;
    }
  }

  .password-forget {
    display: inline-block;
    position: absolute;
    width: 100px;
    height: 23px;

    line-height: 24px;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    text-align: center;

    border-left: 1px solid rgba(0, 0, 0, 0.2);
  }
}

.login-button-wrap {
  margin-top: 30px;

  .button {
    width: 100%;
    height: 50px;
    font-size: 16px;
    border-radius: 25px;
  }

  .register-button {
    margin-top: 10px;
  }
}
</style>