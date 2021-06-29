<template>
  <div class="detail-wrap">
    <sku-window />
    <product-address />
    <service-area />
  </div>
</template>

<script>
import SkuWindow from './ChildComponents/SkuWindow.vue'
import ProductAddress from './ChildComponents/Address.vue'
import ServiceArea from './ChildComponents/ServiceArea.vue'

export default {
  components: {
    SkuWindow,
    ProductAddress,
    ServiceArea,
  },
}
</script>

<style scoped lang='less'>
.detail-wrap {
  margin-top: 12px;
  padding: 0px 18px;
  background: #fff;
  border-radius: 10px;
}
</style>