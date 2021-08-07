<template>
  <div class="wrapper"
       ref="wrapper">
    <top-nav-bar />
    <swiper :imageList="swiperImage" />
    <activity :list="activityList"
              v-if="Object.keys(activityList).length" />
    <grid :textList="gridTextList" />
    <limited-time-activity :goodsList="LimitedTimeActivityGoodsList" />
    <container :goodsList="containerGoodsList" />
    <separation :goodsList="separationGoodsList" />
    <guess-you-like ref="guessYouLike"
                    :goodsList="guessYouLikeGoodsList"
                    @GuessYouLikeListOnLoad="GuessYouLikeListOnLoad" />
    <bottom-nav-bar />
  </div>
</template>

<script>
// 子组件
import TopNavBar from './ChildComponents/TopNavBar.vue'
import Swiper from './ChildComponents/Swiper.vue'
import Activity from './ChildComponents/Activity.vue'
import Grid from './ChildComponents/Grid.vue'
import LimitedTimeActivity from './ChildComponents/LimitedTimeActivity.vue'
import Container from './ChildComponents/Container.vue'
import Separation from './ChildComponents/Separation.vue'
import GuessYouLike from './ChildComponents/GuessYouLike.vue'
import BottomNavBar from './ChildComponents/BottomNavBar.vue'

// 网络请求
import {
  requestSwiperImage,
  requestActivityImage,
  requestGridtext,
  requestLimitedTimeActivityGoodsList,
  requestContainerGoodsList,
  requestSeparationGoodsList,
  requestGuessYouLikeGoodsList,
} from 'network/home/index.js'

export default {
  name: 'Home',

  components: {
    TopNavBar,
    Swiper,
    Activity,
    Grid,
    LimitedTimeActivity,
    Container,
    Separation,
    GuessYouLike,
    BottomNavBar,
  },
  data() {
    return {
      swiperImage: [],
      activityList: {},
      gridTextList: [],
      LimitedTimeActivityGoodsList: [],
      containerGoodsList: [],
      separationGoodsList: {},
      guessYouLikeGoodsList: [],
      guessYouLikeGoodsListPage: 0,
      browseProgress: 0,
    }
  },
  created() {
    this.requestSwiperImage()
    this.requestActivityImage()
    this.requestGridtext()
    this.requestLimitedTimeActivityGoodsList()
    this.requestContainerGoodsList()
    this.requestSeparationGoodsList()
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$nextTick(() => {
        window.scrollTo(0, vm.browseProgress)
      })
    })
  },

  beforeRouteLeave(to, from, next) {
    this.browseProgress = window.scrollY
    next()
  },

  methods: {
    requestSwiperImage() {
      requestSwiperImage().then((res) => (this.swiperImage = res))
    },
    requestActivityImage() {
      requestActivityImage().then((res) => (this.activityList = res))
    },
    requestGridtext() {
      requestGridtext().then((res) => (this.gridTextList = res))
    },
    requestLimitedTimeActivityGoodsList() {
      requestLimitedTimeActivityGoodsList().then(
        (res) => (this.LimitedTimeActivityGoodsList = res)
      )
    },
    requestContainerGoodsList() {
      requestContainerGoodsList().then((res) => (this.containerGoodsList = res))
    },
    requestSeparationGoodsList() {
      requestSeparationGoodsList().then(
        (res) => (this.separationGoodsList = res)
      )
    },
    requestGuessYouLikeGoodsList() {
      const page = this.guessYouLikeGoodsListPage

      return requestGuessYouLikeGoodsList().then(({ data }) => {
        if (!data[page]) return false
        this.guessYouLikeGoodsList.push(...data[page].list)
        this.guessYouLikeGoodsListPage++
        return true
      })
    },
    GuessYouLikeListOnLoad() {
      this.requestGuessYouLikeGoodsList().then((res) => {
        if (!res) return (this.$refs.guessYouLike.finished = true)
        this.$refs.guessYouLike.loading = false
      })
    },
  },
}
</script>

<style scoped lang="less">
.wrapper {
  position: relative;
  overflow: hidden;
  background-color: var(--bg);

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, -70%);
    width: 1000px;
    height: 500px;
    background-color: var(--red);
    border-radius: 50%;
    z-index: 0;
  }
}
</style>