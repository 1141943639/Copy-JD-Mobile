<template>
  <div>
    <div class="top-nav-bar-wrapper">
      <div class="top-nav-bar-in">
        <div class="left"
             @click="clickSort">
          <van-icon class-prefix="icon"
                    name="top-nav-bar-sort"
                    class="icon-sort" />
        </div>
        <div class="center">
          <van-icon class-prefix="icon"
                    name="search-left-icon"
                    class="jd-icon" />
          <span class="divider">|</span>
          <van-icon class-prefix="icon"
                    name="top-nav-bar-search"
                    class="search-icon" />
          <input class="search-module"
                 @click="clickSearch"
                 readonly
                 :placeholder="placeholder" />
        </div>
        <div class="right"
             @click="clickGoProfile">
          <van-icon v-if="isLogin"
                    class-prefix="icon"
                    name="top-nav-bar-user"
                    class="right-login-icon" />
          <span v-else>登录</span>
        </div>
      </div>
    </div>
    <div class="top-nav-placeholder"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('login')

export default {
  data() {
    return {
      placeholder: '',
    }
  },
  computed: {
    ...mapState(['isLogin']),
  },
  methods: {
    clickSort() {
      this.ste()
    },
    clickSearch() {
      this.ste()
    },
    clickGoProfile() {
      this.$router.push({
        name: 'Profile',
      })
    },
  },
}
</script>

<style scoped>
.top-nav-bar-wrapper {
  position: fixed;
  top: 0px;
  z-index: 999;
}

.top-nav-placeholder {
  width: 100%;
  height: 50px;
}

.top-nav-bar-in {
  height: 50px;
  display: flex;
  align-items: center;
  background-color: var(--red);
  z-index: 1;
}

.left {
  width: 70px;
  height: 50px;
  float: left;
  display: flex;
  justify-content: center;
  color: #fff;
}

.icon-sort {
  display: flex;
  font-size: 23px;
  align-items: center;
}

.center {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0px 15px;
  background-color: #fff;
  border-radius: 25px;
}

.jd-icon {
  width: 30px;
  font-size: 16px;

  color: var(--red);
}

.divider {
  color: #999;
  opacity: 0.6;
  margin: 0px 5px;
}

.search-icon {
  margin-left: 3px;
  font-size: 16px;
}

.search-module {
  width: 100%;
  padding: 0px;
  height: 30px;
  text-overflow: ellipsis;
}

.right {
  width: 70px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
}

.right-login-icon {
  font-size: 20px;
}
</style>