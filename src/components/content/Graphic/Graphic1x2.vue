<template>
  <div class="graphic1x2-wrapper">
    <div class="graphic-text">
      <div class="graphic-left-text">
        <slot name="left-text">
          <div class="text-title">{{title}}</div>
          <div class="text-describe">{{describe}}</div>
        </slot>
      </div>
    </div>
    <div class="graphic-img">
      <div class="graphic-left-img">
        <slot name="left-img">
          <img :src="leftImg"
               alt="">
        </slot>
      </div>
      <div class="graphic-right-img">
        <slot name="right-img">
          <img :src="rightImg"
               alt="">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftImg: {
      type: String,
    },
    rightImg: {
      type: String,
    },
    title: {
      type: String,
    },
    describe: {
      type: String,
    },
  },
}
</script>

<style scoped lang="less">
.graphic1x2-wrapper {
  padding: 6.5 0px 5px;

  .graphic-text {
    font-size: 12px;
    line-height: 18px;
    padding-left: 9px;

    .text-title {
      font-weight: 700;
      font-size: 16px;
    }

    .text-describe {
      color: rgba(0, 0, 0, 0.5);
    }
  }

  .graphic-img {
    display: flex;
    padding: 0px 14px;

    .graphic-left-img,
    .graphic-right-img {
      & img {
        width: 60px;
        height: 60px;
        margin: 5.5px 7px 0px;
        object-fit: cover;
      }
    }
  }
}
</style>
