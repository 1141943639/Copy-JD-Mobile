<template>
  <div>
    <van-tabbar v-model="active"
                active-color="#ee0a24"
                route
                placeholder>
      <van-tabbar-item v-for="(item, i) in tabList"
                       :key="item.name"
                       :to="item.to"
                       :class="{'active': active === i}">
        <template #icon>
          <van-icon class-prefix="icon"
                    :name="'nav-bar-' + item.icon"
                    class="nav-bar-icon" />
        </template>
        {{item.name}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [
        {
          name: '首页',
          icon: 'home',
          to: '/',
        },
        {
          name: '分类',
          icon: 'sort',
          to: 'Sort',
        },
        {
          name: '购物车',
          icon: 'cart',
          to: 'Cart',
        },
        {
          name: '我的',
          icon: 'profile',
          to: 'Profile',
        },
      ],
    }
  },
  created() {
    for (const i in this.tabList) {
      const { to } = this.tabList[i]

      if (to === this.$route.name) {
        this.active = Number(i)
        break
      }
    }
  },
}
</script>

<style scoped>
.active {
  color: #ee0a24;
}

.nav-bar-icon {
  font-size: 16px;
}
</style>