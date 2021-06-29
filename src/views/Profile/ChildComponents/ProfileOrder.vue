<template>
  <div class="profile-order-wrap">
    <div class="profile-order-info">
      <div class="profile-order-info-item">
        <van-icon class="profile-order-info-item-icon"
                  class-prefix="icon"
                  name="profile-payment-icon" />
        <div class="profile-order-info-item-text">待付款</div>
      </div>
      <div class="profile-order-info-item">
        <van-icon class="profile-order-info-item-icon"
                  class-prefix="icon"
                  name="profile-to-be-received" />
        <div class="profile-order-info-item-text">待收货</div>
      </div>
      <div class="profile-order-info-item">
        <van-icon class="profile-order-info-item-icon"
                  class-prefix="icon"
                  name="profile-after-sales-icon" />
        <div class="profile-order-info-item-text ">售后/退换</div>
      </div>
      <div class="profile-order-info-item">
        <van-icon class="profile-order-info-item-icon profile-order-info-item-all-order-icon"
                  class-prefix="icon"
                  name="profile-all-order-icon" />
        <div class="profile-order-info-item-text profile-order-info-item-all-order-text">全部订单</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.profile-order-wrap {
  margin: 10px 10px;
  padding: 15px 20px;

  background: #fff;

  .profile-order-info {
    display: flex;
    justify-content: space-between;

    .profile-order-info-item {
      text-align: center;

      .profile-order-info-item-icon {
        color: rgba(0, 0, 0, 0.7);
        font-size: 28px;
      }

      .profile-order-info-item-text {
        margin-top: 3px;
        font-size: 12px;
      }

      .profile-order-info-item-all-order-icon {
        font-weight: 700;
        color: var(--red);
      }

      .profile-order-info-item-all-order-text {
        margin-top: 10px;
      }
    }
  }
}
</style>