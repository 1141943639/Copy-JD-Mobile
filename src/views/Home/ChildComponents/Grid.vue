<template>
  <div v-if="textList.length"
       class="grid-wrapper">
    <van-swipe class="grid-swiper"
               @change="swiperChange"
               :loop="false">
      <van-swipe-item v-for="(list, page) in textList"
                      :key="page">
        <van-grid column-num="5"
                  :border="false">
          <van-grid-item class="grid-item"
                         @click="clickItem"
                         v-for="(item, i) in list"
                         :key="item.text"
                         :text="item.text">
            <template #icon>
              <van-icon :name="require(`assets/image/Home/Grid/page${page + 1}/${i + 1}.png`)"
                        class="grid-item-img" />
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>

      <template #indicator>
        <div class="grid-indicator-wrapper">
          <div v-for="item in textList.length"
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
    textList: {
      type: Array,
      reqiure: true,
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

<style scoped lang="less">
.grid-wrapper {
  margin-top: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}

.grid-swiper {
  position: relative;
}

.grid-item {
  width: 70px;
  height: 75px;
}

.grid-item-img img {
  width: 35px;
  height: 35px;
}

.grid-indicator-wrapper {
  position: absolute;
  bottom: 0px;
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
  background-color: rgba(0, 0, 0, 0.3);
}

.indicator-active {
  background-color: var(--red);
}
</style>