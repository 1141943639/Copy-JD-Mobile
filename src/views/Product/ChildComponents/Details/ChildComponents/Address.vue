<template>
  <div class="address-wrap">
    <div class="address-window"
         @click="show = true">
      <div class="address-window-title">送至</div>
      <div class="address-window-detail">
        <div class="address-window-detail-address">
          {{addressDetail}}
        </div>
        <div class="address-window-detail-describe">
          <div class="address-window-detail-describe-has-stock">{{address.hasStock}}</div>
          <div class="address-window-detail-describe-merchant-address">
            由商家从 {{address.merchantAddress}} 发货
          </div>
        </div>
      </div>
      <div class="address-window-right-icon">
        <img :src="require('assets/image/Product/public/right-icon.png')"
             alt="">
      </div>
    </div>
    <van-popup v-model="show"
               round
               position="bottom">
      <van-cascader :options="address.list"
                    :field-names="fieldNames"
                    title="配送至"
                    @finish="finish" />
    </van-popup>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('product')

export default {
  data() {
    return {
      show: false,
      fieldNames: {
        text: 'name',
        value: 'code',
        children: 'items',
      },
      addressDetail: '大师傅按时发撒的发放发顺丰速度',
    }
  },
  computed: {
    ...mapState(['address']),
  },
  methods: {
    finish({ selectedOptions }) {
      let str = ''
      for (const { name } of selectedOptions) {
        str += name
      }

      this.addressDetail = str

      this.show = false
    },
  },
}
</script>

<style scoped lang='less'>
.address-wrap {
  position: relative;
  height: 74px;
  padding: 18px 20px 18px 0px;
  font-size: 13px;

  .address-window {
    display: flex;

    .address-window-title {
      width: 38px;
      font-weight: 700;
    }

    .address-window-detail {
      .address-window-detail-address {
        width: 100%;
        color: #333;
      }

      .address-window-detail-describe {
        display: flex;
        align-items: baseline;
        font-size: 12px;
        line-height: 20px;

        .address-window-detail-describe-has-stock {
          color: var(--red);
          margin-right: 3px;
        }

        .address-window-detail-describe-merchant-address {
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }

    .address-window-right-icon {
      position: absolute;
      right: 0px;
      top: 12px;
      width: 20px;
      height: 20px;

      & img {
        width: 100%;
      }
    }
  }
}
</style>