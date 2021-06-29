<template>
  <div class="top-bar-wrapper">
    <van-nav-bar fixed
                 class="top-nav"
                 @click-left="clickLeftIcon">
      <template #left>
        <van-icon class-prefix="icon"
                  name="left-back-arrow"
                  class="nav-left-icon" />
      </template>
      <template #title>
        <tab v-model="active"
             line-color="linear-gradient(to right, #ee0a24, #facec7)"
             active-class="top-tab-itme-active">
          <tab-item title="商品"
                    class="top-tab-item"></tab-item>
          <tab-item title="评价"
                    class="top-tab-item"></tab-item>
          <tab-item title="详情"
                    class="top-tab-item"></tab-item>
          <tab-item title="推荐"
                    class="top-tab-item"></tab-item>
        </tab>
      </template>
      <template #right>
        <van-icon class-prefix="icon"
                  name="right-more-icon"
                  class="nav-right-icon"
                  @click="click" />
      </template>
    </van-nav-bar>
    <div class="top-nav-placeholder"></div>
  </div>
</template>

<script>
import Tab from 'components/common/Tab/Tab.vue'
import TabItem from 'components/common/Tab/TabItem.vue'

export default {
  components: {
    Tab,
    TabItem,
  },
  data() {
    return {
      active: '',
    }
  },
  methods: {
    clickLeftIcon() {
      this.$router.go(-1)
    },
    click() {
      const num = 3

      this.$router.push({
        path: '/product/3',
      })
    },
  },
}
</script>

<style scoped lang='less'>
.top-bar-wrapper {
  height: 44px;
  .top-nav {
    .nav-left-icon {
      font-size: 18px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.5);
    }

    .top-tab-item {
      width: 59px;
      line-height: 44px;
      font-size: 13px;
    }

    .top-tab-itme-active {
      font-weight: 700;
    }

    .nav-right-icon {
      font-size: 25px;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  .top-nav-placeholder {
    width: 100%;
    height: 44px;
  }
}
</style>