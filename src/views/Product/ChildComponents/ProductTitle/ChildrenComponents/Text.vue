<template>
  <div class="title-wrap">
    <h3 class="title-text">{{title.text}}</h3>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('product')

export default {
  computed: {
    ...mapState(['title']),
  },
}
</script>

<style scoped lang='less'>
.title-wrap {
  padding: 12px 18px;

  .title-text {
    font-size: 16px;
  }
}
</style>
