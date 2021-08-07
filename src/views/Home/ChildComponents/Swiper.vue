<template>
  <div class="swiper-wrapper">
    <van-swipe class="swiper on-vw"
               :autoplay="2000"
               @change="swiperChange"
               duration="300">
      <van-swipe-item v-for="item in imageList"
                      :key="item.id"
                      class="item"
                      @click="clickItem">
        <img v-lazy="item.url"
             alt=""
             class="img">
      </van-swipe-item>
      <template #indicator>
        <div class="swiper-indicator-wrapper">
          <div v-for="item in imageList.length"
               :key="item"
               class="indicator-item"
               :class="{'indicator-active': current === item - 1}" />
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    imageList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      current: 0,
    }
  },
  methods: {
    swiperChange(i) {
      this.current = i
    },
    clickItem() {
      this.ste()
    },
  },
}
</script>

<style scoped>
.swiper-wrapper {
  overflow: hidden;
  position: relative;
}

.swiper {
  height: 150px;
  display: flex;
}

.item {
  padding: 0px 15px;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.swiper-indicator-wrapper {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
}

.indicator-item {
  width: 5px;
  height: 5px;
  margin: 0px 2px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}

.indicator-active {
  background-color: var(--red);
}
</style>