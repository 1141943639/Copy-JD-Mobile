<template>
  <div class="profile-record-wrap">
    <div class="profile-record-info"
         v-for="(item, i) in recordList"
         :key="i">
      <div class="profile-record-info-num">{{item.num}}</div>
      <div class="profile-record-info-text">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters: historyGetters } = createNamespacedHelpers('history')
const { mapGetters: collectionGetters } = createNamespacedHelpers('collection')

export default {
  computed: {
    ...historyGetters(['historyLength']),
    ...collectionGetters(['shopCollectionLength', 'productCollectionLength']),

    recordList() {
      return [
        {
          text: '商品收藏',
          num: this.shopCollectionLength,
        },
        {
          text: '店铺收藏',
          num: this.productCollectionLength,
        },
        {
          text: '浏览记录',
          num: this.historyLength,
        },
      ]
    },
  },
}
</script>

<style scoped lang='less'>
.profile-record-wrap {
  margin: 10px 10px;
  padding: 15px 20px;

  display: flex;
  justify-content: space-between;

  border-radius: 20px;

  background: #ef2439;

  .profile-record-info {
    height: 100%;

    text-align: center;
    font-weight: 700;
    color: #fff;

    .profile-record-info-num {
      font-size: 20px;
    }

    .profile-record-info-text {
      margin-top: 5px;

      font-size: 14px;
    }
  }
}
</style>