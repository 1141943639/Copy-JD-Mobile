<template>
  <div class="graphic1x1-wrapper">
    <div class="graphic-text">
      <slot name="text">
        <div class="graphic-text-slot">
          <div class="graphic-text-title">{{title}}</div>
          <div class="graphic-text-describe">{{describe}}</div>
        </div>
      </slot>
    </div>
    <div class="graphic-img">
      <slot name="img">
        <img :src="img"
             alt="">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
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
.graphic1x1-wrapper {
  padding: 6.5px 0px 5px 10px;
  width: 120px;

  .graphic-text {
    .graphic-text-slot {
      font-size: 12px;
      line-height: 18px;

      .graphic-text-title {
        font-weight: 700;
        font-size: 16px;
      }

      .graphic-text-describe {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  .graphic-img {
    width: 60px;
    height: 60px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>