<template>
  <div class="top-swipe-wrap"
       v-if="topSwipe.length">
    <van-swipe class="top-swipe"
               @change="change"
               :loop="false">
      <van-swipe-item v-for="item in topSwipe"
                      :key="item.id"
                      class="top-swipe-item">
        <img :src="item.url"
             alt="">
      </van-swipe-item>
      <template #indicator>
        <div class="top-swipe-indicator">
          <div class="top-swipe-indicator-left">{{index}}</div>
          <div class="top-swipe-indicator-right">/{{imagesLength}}</div>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('product')

export default {
  data() {
    return {
      index: 1,
    }
  },
  computed: {
    ...mapState(['topSwipe']),
    imagesLength() {
      if (!this.topSwipe.length) return

      return this.topSwipe.length
    },
  },
  methods: {
    change(index) {
      this.index = index + 1
    },
  },
}
</script>

<style scoped lang='less'>
.top-swipe-wrap {
  height: 375px;

  .top-swipe {
    width: 100%;
    height: 100%;
    position: relative;

    .top-swipe-item {
      text-align: center;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .top-swipe-indicator {
      position: absolute;
      display: flex;
      justify-content: center;
      bottom: 15px;
      right: 0px;
      width: 41px;
      height: 20px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 15px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      line-height: 21px;
      color: rgba(255, 255, 255, 0.9);
    }

    .top-swipe-indicator-right {
      font-size: 13px;
      align-items: baseline;
      line-height: 24px;
    }
  }
}
</style>