<template>
  <div class="separation-wrapper">
    <div class="separation-top">
      <graphic1x2 v-for="item in topList"
                  :key="item.id"
                  :leftImg="item.leftUrl"
                  :rightImg="item.rightUrl"
                  :title="item.title"
                  :describe="item.describe" />
    </div>
    <div class="separation-bottom">
      <graphic1x1 v-for="item in bottomList"
                  :key="item.id"
                  :img="item.url"
                  :title="item.title"
                  :describe="item.describe" />
    </div>
  </div>
</template>

<script>
import Graphic1x1 from 'components/content/Graphic/Graphic1x1.vue'
import Graphic1x2 from 'components/content/Graphic/Graphic1x2.vue'

export default {
  components: {
    Graphic1x1,
    Graphic1x2,
  },
  props: {
    goodsList: {
      type: Object,
      require: true,
    },
  },
  computed: {
    topList() {
      return this.goodsList.top
    },
    bottomList() {
      return this.goodsList.bottom
    },
  },
}
</script>

<style scoped lang="less">
.separation-wrapper {
  margin: 0px 10px;
  margin-top: 5px;
  padding: 10px 0px;
  border-radius: 10px;
  background: #fff;

  .separation-top {
    display: flex;
    margin-bottom: 5px;
  }

  .separation-bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>