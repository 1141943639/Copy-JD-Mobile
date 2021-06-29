<template>
  <div class="service-area-wrap">
    <div class="service-area-window"
         @click="show = true">
      <div class="service-area-window-item"
           v-for="item in serviceArea"
           :key="item.title">
        <div class="service-area-item-text">
          <van-icon class-prefix="icon"
                    class="item-left-icon"
                    name="product-details-service-area-icon"
                    v-if="!item.disabled" />
          <van-icon class-prefix="icon"
                    class="item-left-icon disabled"
                    name="product-details-service-area-icon-disabled"
                    v-if="item.disabled" />
          {{item.title}}
        </div>
      </div>
      <div class="service-area-window-right-icon">
        <img :src="require('assets/image/Product/public/right-icon.png')"
             alt="">
      </div>
    </div>

    <van-popup v-model="show"
               position="bottom"
               round
               closeable
               class="service-area-popup">
      <div class="service-area-popup-info">
        <div class="service-area-popup-info-title">服务</div>
        <div class="service-area-popup-info-item"
             v-for="(item, i) in serviceArea"
             :key="item.title"
             :class="{'item-first': i === 0}">

          <div class="service-area-popup-info-item-title">
            <van-icon class-prefix="icon"
                      class="item-left-icon"
                      name="product-details-service-area-icon"
                      v-if="!item.disabled" />
            <van-icon class-prefix="icon"
                      class="item-left-icon disabled"
                      name="product-details-service-area-icon-disabled"
                      v-if="item.disabled" />
            <div class="service-area-popup-info-item-title-text">{{item.title}}</div>
          </div>
          <div class="service-area-popup-info-item-describe">{{item.describe}}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('product')

export default {
  data() {
    return {
      show: false,
    }
  },
  computed: {
    ...mapState(['serviceArea']),
  },
}
</script>

<style scoped lang='less'>
.service-area-wrap {
  padding: 9px 0px;

  .service-area-window {
    position: relative;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    width: 339px;
    padding-right: 20px;
    max-height: 66px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #8c8c8c;

    .service-area-window-item {
      display: inline-block;
      margin-right: 10px;
      font-size: 12px;
      padding: 3px 0px;

      .service-area-item-text {
        color: #8c8c8c;
      }
    }

    .service-area-window-right-icon {
      position: absolute;
      right: 0px;
      top: 0px;
      width: 20px;
      height: 20px;

      & img {
        width: 100%;
      }
    }
  }

  .service-area-popup {
    height: 50%;

    .service-area-popup-info-title {
      position: sticky;
      top: 0px;
      width: 100%;
      height: 48px;
      background-color: #fff;
    }

    .service-area-popup-info {
      padding: 0px 18px;

      .service-area-popup-info-title {
        line-height: 48px;
        text-align: center;
        font-weight: 700;
      }

      .service-area-popup-info-item {
        padding: 9px 0px;

        .service-area-popup-info-item-title {
          display: flex;
          align-items: baseline;
          font-size: 13px;
          color: #262626;
          height: 21px;

          .service-area-popup-info-item-title-text {
            margin-left: 4px;
          }
        }

        .service-area-popup-info-item-describe {
          margin-top: 12px;
          font-size: 12px;
          color: #8c8c8c;
          line-height: 18px;
        }
      }

      .item-first {
        padding-top: 0px;
        padding-bottom: 9px;
      }
    }
  }

  .item-left-icon {
    margin-right: 2px;
    margin-top: 1px;
    color: var(--red);
    font-size: 12px;
  }

  .disabled {
    font-size: 12.5px;
    color: #8c8c8c;
    font-weight: 700;
  }
}
</style>