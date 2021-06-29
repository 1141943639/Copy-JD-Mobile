<template>
  <div class="similar-item-wrapper">
    <div class="item-img">
      <slot name="img">
        <img v-lazy="img"
             alt="">
      </slot>
    </div>
    <div class="item-title">
      <slot name="title">
        <div class="item-title-text">
          <slot name="title-left-icon">
            <van-tag color="#ee0a24"
                     text-color="#fff"
                     class="item-title-icon"
                     v-if="titleIcon">{{titleIcon}}</van-tag>
          </slot>
          {{titleText}}
        </div>
      </slot>
    </div>
    <div class="item-price">

      <slot name="price">
        <div class="item-present-price">
          <slot name="price-currency">
            <span class="itme-price-currency">{{priceCurrency}}</span>
          </slot>
          <span>{{presentPrice}}</span>
        </div>
      </slot>
      <slot name="price-label">
        <van-tag plain
                 type="primary"
                 color="#ee0a24"
                 class="item-price-label"
                 v-if="priceLabel">{{priceLabel}}</van-tag>
      </slot>
      <slot name="price-right">
        <div class="item-price-look-similarities">{{priceRight}}</div>
      </slot>
    </div>
    <div class="item-other-price">
      <slot name="other-price"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
    },
    titleIcon: {
      type: String,
    },
    titleText: {
      type: String,
    },
    presentPrice: {
      type: Number,
    },
    priceLabel: {
      type: String,
    },
    priceCurrency: {
      type: String,
      default: '￥',
    },
    priceRight: {
      type: String,
      default: '看相似',
    },
  },
}
</script>

<style scoped lang='less'>
.similar-item-wrapper {
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  width: 173px;
  height: 264px;

  .item-img {
    width: 173px;
    height: 173px;

    & img {
      width: 100%;
      height: 100%;
    }
  }

  .item-title {
    height: 31px;
    font-size: 13px;
    line-height: 16px;
    padding: 0px 4px;
    margin: 5px 0px;

    .item-title-text {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .item-title-icon {
      padding: 0px 1px;
      font-size: 10px;
      font-weight: 700;
      white-space: nowrap;
      height: 13px;
      line-height: 16px;
      margin-right: 5px;
    }
  }

  .item-price {
    color: var(--red);
    position: relative;
    display: flex;
    align-items: center;
    font-size: 16px;
    width: 100%;
    height: 26px;
    // line-height: 26px;

    .itme-price-currency {
      font-size: 12px;
    }

    .item-present-price {
      font-weight: 700;
      padding: 0px 5px 0px 4px;
    }

    .item-price-label {
      width: 32px;
      height: 16px;
    }

    .item-price-look-similarities {
      position: absolute;
      right: 0px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      justify-self: flex-end;
      padding: 3px 5px;
      background: var(--bg);
      border-radius: 20px;
    }
  }
}
</style>