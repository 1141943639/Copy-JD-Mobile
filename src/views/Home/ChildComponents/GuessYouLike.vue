<template>
  <div class="guess-you-like-wrapper">
    <van-list class="list"
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <similar-item v-for="item in goodsList"
                    :key="item.iid"
                    :img="item.img"
                    :titleText="item.title.text"
                    :titleIcon="item.title.icon"
                    :presentPrice="item.price.text"
                    :priceLabel="item.price.label"
                    @click.native="click(item)"
                    class="item" />
      <template #loading>
        <van-loading class="loading">加载中...</van-loading>
      </template>
      <template #finished>
        <div class="finished">到底了，别拖了</div>
      </template>
    </van-list>
  </div>
</template>

<script>
import SimilarItem from 'components/content/SimilarItem/SimilarItem.vue'

export default {
  components: {
    SimilarItem,
  },
  props: {
    goodsList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
    }
  },
  methods: {
    click({ iid }) {
      this.$router.push({
        name: 'Product',
        params: {
          iid,
        },
      })
    },
    onLoad() {
      this.$emit('GuessYouLikeListOnLoad')
    },
  },
}
</script>

<style scoped lang='less'>
.guess-you-like-wrapper {
  margin: 0px 10px;
  margin-top: 10px;

  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      margin-bottom: 10px;
    }

    .loading {
      width: 355px;
    }

    .finished {
      width: 355px;
      text-align: center;
    }
  }
}
</style>