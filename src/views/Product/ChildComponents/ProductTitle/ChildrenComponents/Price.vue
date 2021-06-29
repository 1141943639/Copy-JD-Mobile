<template>
  <div class="price-wrap clear-fix"
       v-if="Object.keys(price).length">
    <div class="price-left">
      <div>￥</div>
      <div class="price-integer">{{integerPrice}}</div>
      <div class="price-decimal">{{decimalPrice}}</div>
    </div>
    <div class="price-right">
      <div class="price-collection"
           @click="clickCollection">
        <van-icon class-prefix="icon"
                  name="product-price-collection-icon"
                  class="price-collection-icon"
                  v-show="!isCollection" />
        <van-icon class-prefix="icon"
                  name="product-price-collection-icon-active"
                  class="price-collection-icon price-collection-icon-active"
                  v-show="isCollection" />
        <div class="price-collection-text">{{collectionText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState: productState } = createNamespacedHelpers('product')
const { mapActions: collectionActions, mapGetters: collectionGetters } =
  createNamespacedHelpers('collection')

export default {
  data() {
    return {}
  },

  computed: {
    ...productState(['price', 'productIid']),

    ...collectionGetters(['hasProductCollection']),

    priceNum() {
      return String(this.price.text)
    },
    integerPrice() {
      return this.priceNum.indexOf('.') < 0
        ? this.priceNum
        : this.priceNum.slice(0, this.priceNum.indexOf('.'))
    },
    decimalPrice() {
      return this.priceNum.indexOf('.') < 0
        ? '.00'
        : this.priceNum.slice(this.priceNum.indexOf('.'))
    },
    collectionText() {
      return this.isCollection ? '已收藏' : '收藏'
    },

    isCollection() {
      return this.hasProductCollection(this.productIid)
    },
  },

  methods: {
    ...collectionActions(['addProductCollection', 'removeProductCollection']),

    clickCollection() {
      if (!this.isCollection) {
        this.addProductCollection({
          productIid: this.productIid,
        })
      } else {
        this.removeProductCollection(this.productIid)
      }
    },
  },
}
</script>

<style scoped lang='less'>
.price-wrap {
  position: relative;
  height: 35px;
  padding: 0px 18px;
  background: #fff;

  .price-left {
    float: left;
    display: flex;
    align-items: baseline;
    height: 100%;
    font-size: 18px;
    font-family: JDZH-Regular;
    line-height: 35px;
    color: var(--red);

    .price-integer {
      font-size: 30px;
      font-weight: 700;
    }
  }

  .price-right {
    float: right;
    height: 100%;

    .price-collection {
      display: flex;
      flex-direction: column;
      width: 40px;
      height: 100%;
      text-align: center;

      .price-collection-icon {
        margin: 0px auto;
        font-size: 18px;
      }

      .price-collection-icon-active {
        color: var(--red);
      }

      .price-collection-text {
        font-size: 13px;
      }
    }
  }
}
</style>