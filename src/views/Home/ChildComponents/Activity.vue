<template>
  <div class="activity-wrapper">
    <show-activity :left-img="left.url"
                   :left-bottom="left.text"
                   :click-left="ste"
                   :center-left-img="centerLeft.url"
                   :center-right-img="centerRight.url"
                   :center-top="centerTop.text"
                   :center-bottom="centerBottom.text"
                   :click-center="ste"
                   :right-img="right.url"
                   :right-bottom="right.text"
                   :click-right="ste" />
  </div>
</template>

<script>
import ShowActivity from 'components/common/ShowActivity/ShowActivity.vue'

export default {
  components: {
    ShowActivity,
  },
  props: {
    list: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      left: this.list.left,
      centerLeft: this.list.center.left,
      centerRight: this.list.center.right,
      centerTop: this.list.center.top,
      centerBottom: this.list.center.bottom,
      right: this.list.right,
    }
  },
}
</script>

<style scoped>
</style>