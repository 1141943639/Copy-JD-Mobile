<template>
  <div class="product-wrap">
    <top-nav-bar />
    <top-swipe />
    <product-title />
    <coupon />
    <product-details />
    <bottom-nav-bar />
  </div>
</template>

<script>
import TopNavBar from './ChildComponents/TopNavBar.vue'
import TopSwipe from './ChildComponents/TopSwipe.vue'
import ProductTitle from './ChildComponents/ProductTitle/ProductTitle.vue'
import Coupon from './ChildComponents/Coupon.vue'
import ProductDetails from './ChildComponents/Details/Details.vue'
import BottomNavBar from './ChildComponents/BottomNavBar.vue'

import { requestGoodsList } from 'network/product/index.js'

import { createNamespacedHelpers } from 'vuex'

const { mapMutations: productMutations } = createNamespacedHelpers('product')
const { mapActions: historyActions } = createNamespacedHelpers('history')

export default {
  name: 'Product',

  components: {
    TopNavBar,
    TopSwipe,
    ProductTitle,
    Coupon,
    ProductDetails,
    BottomNavBar,
  },

  created() {
    this.productIid = this.$route.params.iid
    this.requestGoodsList()
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name && from.name !== 'Product') {
        // 添加历史记录
        vm.addHistory({
          shopsIid: vm.shopIid,
          productIid: vm.productIid,
        })
      }
    })
  },

  data() {
    return {
      productIid: NaN,
      shopIid: NaN,
    }
  },

  methods: {
    ...productMutations(['addState']),
    ...historyActions(['addHistory']),

    requestGoodsList() {
      requestGoodsList().then(
        ({
          topSwipe,
          price,
          title,
          coupon,
          skuData,
          address,
          serviceArea,
          shop,
        }) => {
          // 将请求的数据同步到vuex上面管理
          this.addState({
            topSwipe,
            price,
            title,
            coupon,
            skuData,
            address,
            serviceArea,
            shop,
            productIid: this.productIid,
          })

          this.shopIid = shop.shopsIid

          document.title = title.text
        }
      )
    },
  },
}
</script>

<style scoped lang='less'>
.product-wrap {
  background: #f2f2f2;
  color: #262626;
}
</style>