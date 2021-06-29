<template>
  <div class="container-wrapper">
    <!-- <gradient-box v-for="item in goodsList"
                  :key="item.id"
                  :img="item.url"
                  class="goods-item">
      <template #text>
        <div class="item-text">
          <div class="item-top-text">{{item.topText}}</div>
          <div class="item-bottom-text">{{item.bottomText}}</div>
        </div>
      </template>
    </gradient-box> -->
    <div v-for="item in goodsList"
         :key="item.id"
         class="goods-item">
      <img :src="item.bg"
           alt=""
           class="item-bg">
      <img :src="item.url"
           alt=""
           class="item-img">
      <div class="item-text">
        <div class="item-top-text">{{item.topText}}</div>
        <div class="item-bottom-text">{{item.bottomText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import GradientBox from 'components/common/GradientBox/GradientBox.vue'

export default {
  components: {
    GradientBox,
  },
  props: {
    goodsList: {
      type: Array,
      require: true,
    },
  },
}
</script>

<style scoped lang="less">
.container-wrapper {
  padding: 0px 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.goods-item {
  position: relative;

  .item-bg {
    width: 86px;
  }

  .item-img {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 66px;
    height: 66px;
    border-radius: 10px;
    object-fit: cover;
  }

  .item-text {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
  }
}
</style>