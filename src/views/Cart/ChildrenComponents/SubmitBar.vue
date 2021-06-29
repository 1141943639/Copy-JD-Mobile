<template>
  <div class="submit-bar-wrap">
    <van-submit-bar button-text="去结算"
                    label="合计："
                    :price="productTotal"
                    class="submit-bar">
      <template>
        <div class="submit-bar-check-all"
             @click="clickCheckAll">
          <div class="submit-bar-check-all-button">

            <van-icon class-prefix="icon"
                      name="cart-list-selected-icon"
                      class="submit-bar-check-all-button-selected"
                      v-show="isCheckAll" />

            <div class="submit-bar-check-all-button-no-selected"
                 v-show="!isCheckAll">
            </div>
          </div>
          <div class="submit-bar-check-all-text">全选</div>
        </div>
      </template>
    </van-submit-bar>

    <div class="placeholder"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions } = createNamespacedHelpers('cartList')

export default {
  computed: {
    ...mapGetters(['productTotal', 'isCheckAll']),
  },
  methods: {
    ...mapActions(['checkAll']),
    clickCheckAll() {
      this.checkAll()
    },
  },
}
</script>

<style scoped lang='less'>
.submit-bar-wrap {
  .submit-bar {
    position: fixed;
    bottom: 50px;

    .submit-bar-check-all {
      display: flex;
      align-items: center;

      .submit-bar-check-all-button {
        margin-right: 5px;

        .submit-bar-check-all-button-selected {
          margin-left: -2px;
          font-size: 20px;
          color: var(--red);
          text-align: center;
        }

        .submit-bar-check-all-button-no-selected {
          width: 18px;
          height: 17px;
          border: 2px solid rgba(0, 0, 0, 0.5);
          border-radius: 50%;
        }
      }
    }
  }

  .placeholder {
    height: 50px;
  }
}
</style>