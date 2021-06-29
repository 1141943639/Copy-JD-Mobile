<template>
  <div class="cart-list-sku-wrap"
       v-if="initOver">
    <van-sku v-model="skuShowCopy"
             :sku="skuData.sku"
             :goods="skuData.goodsInfo"
             :goods-id="skuDetail.productIid"
             :initial-sku="skuDetail.selectedSkuComb"
             :start-sale-num="skuData.startSaleNum"
             :quota="skuData.quota"
             :lazy-load="true"
             ref="sku">
      <template #sku-stepper>
        <div></div>
      </template>
      <template #sku-actions>
        <div class="cart-list-sku-confirm-wrap">
          <div class="cart-list-sku-confirm"
               @click="skuConfirm">确认</div>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } =
  createNamespacedHelpers('cartList')

export default {
  data() {
    return {
      selecedSpecifications: '',
      isConfirm: false,
      skuShowCopy: false,
      initOver: false,
    }
  },
  computed: {
    ...mapState(['skuShow', 'skuDetail', 'cartList']),
    ...mapGetters(['getProduct']),

    skuData() {
      if (!Object.keys(this.skuDetail)) return {}

      return this.skuDetail.skuData
    },
  },
  watch: {
    // 双向绑定 skuShow
    skuShow(value) {
      // 每次退出选择弹窗时 检测用户是否点击了确定按钮
      if (!value && !this.isConfirm) {
        // 如果没有点击确定按钮 则重置选项
        this.$refs.sku.resetSelectedSku()
      }

      this.skuShowCopy = value
      this.isConfirm = false
    },
    skuShowCopy(value) {
      this.setProperty(['skuShow', value])
    },

    // 拿到数据后初始化
    // 只执行一次
    cartList: {
      handler: 'init',
    },
  },
  methods: {
    ...mapActions(['changeProductProperty', 'changeSkuDetail']),
    ...mapMutations(['setProperty']),

    // 点击确定按钮
    skuConfirm() {
      const { selectedSkuComb } = this.$refs.sku.getSkuData()
      const { shopIid, productIid } = this.skuDetail

      // 判断用户是否选择所有选项
      if (!selectedSkuComb) {
        this.setProperty(['skuShow', false])
        return
      }

      this.isConfirm = true

      this.changeProductProperty([
        'selectedSkuComb',
        selectedSkuComb,
        shopIid,
        productIid,
      ])

      this.setProperty(['skuShow', false])
    },

    // 初始化sku数据
    init(cartList) {
      // 因为skuData为空对象的话会报错
      // 所以拿到cartList数据之后 用第一个商品的数据作为初始值
      if (this.initOver) return
      if (!this.cartList.length) return

      const shopIid = cartList[0].shopsIid
      const proIid = cartList[0].list[0].productIid

      this.changeSkuDetail([shopIid, proIid])

      this.initOver = true
    },
  },
}
</script>

<style scoped lang='less'>
.cart-list-sku-wrap {
  .cart-list-sku-confirm-wrap {
    width: 100%;
    height: 50px;
    padding: 6px 18px;

    .cart-list-sku-confirm {
      line-height: 38px;
      font-weight: 700;
      color: #fff;
      background: linear-gradient(to right, #f2160c, #f2470c);
      text-align: center;
      border-radius: 25px;
    }
  }
}
</style>