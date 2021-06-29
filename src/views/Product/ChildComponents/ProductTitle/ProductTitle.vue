<template>
  <div class="product-title-wrap">
    <price />
    <product-text />
  </div>
</template>

<script>
import Price from './ChildrenComponents/Price.vue'
import ProductText from './ChildrenComponents/Text.vue'

export default {
  components: {
    Price,
    ProductText,
  },
}
</script>

<style scoped lang='less'>
.product-title-wrap {
  padding-top: 12px;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>