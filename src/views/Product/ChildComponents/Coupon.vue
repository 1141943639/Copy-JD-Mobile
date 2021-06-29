<template>
  <div class="coupon-wrap"
       v-if="coupon">
    <van-coupon-cell class="coupon-cell"
                     :coupons="coupons"
                     :chosen-coupon="chosenCoupon"
                     :borde="false"
                     @click="showCouponList = true" />

    <van-popup v-model="showCouponList"
               round
               position="bottom"
               closeable
               class="coupon-popup">
      <van-coupon-list :coupons="coupons"
                       :disabled-coupons="disabledCoupons"
                       :chosen-coupon="chosenCoupon"
                       :show-exchange-bar="false"
                       :show-count="false"
                       @change="changeCoupon"
                       class="coupon-popup-list" />
    </van-popup>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('product')

export default {
  data() {
    return {
      showCouponList: false,
      chosenCoupon: -1,
    }
  },
  computed: {
    ...mapState(['coupon']),
    coupons() {
      return this.coupon.coupons
    },
    disabledCoupons() {
      return this.coupon.disabledCoupons
    },
  },
  methods: {
    changeCoupon(index) {
      this.chosenCoupon = index

      this.showCouponList = false
    },
  },
}
</script>

<style scoped lang='less'>
.coupon-wrap {
  margin-top: 12px;
  padding: 0px 18px;
  background: #fff;
  border-radius: 10px;

  .coupon-cell {
    display: flex;
    align-items: center;
    padding: 0px;
    font-weight: 700;
    font-size: 13px;
    height: 50px;

    &::after {
      content: '';
      display: none;
    }
  }

  .coupon-popup {
    height: 486px;
    .coupon-popup-list {
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>