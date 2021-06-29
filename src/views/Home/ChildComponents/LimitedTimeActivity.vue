<template>
  <div class="limited-activity-wrapper">
    <van-cell-group :border="false">
      <van-cell class="title">
        <template #title>
          <div class="title-left"
               @click="clickTitleLeft">
            <span class="title-text-1">京东秒杀</span>
            <span class="title-text-2">10</span>
            <van-count-down :time="time">
              <template #default="{hours, minutes, seconds }">
                <div class="count-down">
                  <div class="time-number">{{hours|completionTime}}</div>
                  <span class="time-colon">:</span>
                  <div class="time-number">{{minutes|completionTime}}</div>
                  <span class="time-colon">:</span>
                  <div class="time-number">{{seconds|completionTime}}</div>
                </div>
              </template>
            </van-count-down>
          </div>
        </template>
        <template #right-icon>
          <div class="right-icon"
               @click="clickTitleRight">
            <div class="right-icon-text">更多秒杀</div>
            <van-icon class-prefix="icon"
                      name="limited-time-activity-title-right-icon"
                      class="right-icon-arrow" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <div class="goods-list">
      <div class="goods-item"
           @click="clickGoodsItem"
           v-for="item in goodsList"
           :key="item.id">
        <div class="goods-img">
          <img :src="item.url"
               alt="">
        </div>
        <div class="goods-completion">
          <div class="goods-new-completion">{{item.newCompletion|RMB}}</div>
          <div class="goods-old-completion">{{item.oldCompletion|RMB}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      time: 60 * 60 * 24 * 1000,
    }
  },
  filters: {
    completionTime(value) {
      return String(value).length > 1 ? value : '0' + value
    },
    RMB(value) {
      return '￥' + value
    },
  },
  methods: {
    clickTitleLeft() {
      this.ste()
    },
    clickTitleRight() {
      this.ste()
    },
    clickGoodsItem() {
      this.ste()
    },
  },
}
</script>

<style scoped>
.limited-activity-wrapper {
  margin: 0px 10px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
}

.title {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABYwAAACQBAMAAABZrTKvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURUdwTO0QEO0QEO0WFuoNDe0SEuwREewREYfJP0kAAAAIdFJOUwB9ZA+zIzZPcd7tbgAAA/BJREFUeNrt3TGP41QUBtDZtRbaTVig3SxIaS0sQz1oEO0uwaaFIk4LAeK/j+1kMg6FBynzZnPDOfVUnz5dX9vPmZubSW/uHtzeQEjjGt+Jg5ju1Bg1hgtbKuzGqDF8LH+NavyjOIjp51GNfxAHMb0Y1fi1OIjp1ajG78VBUF8fW/y9MIi/VdgpCCu7f+R2mwuDsF4eavxWFAT2YWjx54IgtF/e3N3+LQYAAAAAAACeyKvtYr58Lwci+242+FMSxPXJ7OBXWRBVtriv8TyXBkF9Mzv6ShpEH8Yd45iYXo5aPHsrD0L6bVzjL+RByJ1idsJWQUSfntb4d4kQ0IvTGr+WCAF9OK2xD3uJ6I/TGn8pEQJanNZ4LhHUGD6G2b9IBDUGSwWoMf9XHrhxBbz+4Ap4Gc0VcDSIK+CgJtfAsXmugI+YuIatYvTk2Bf+RPXTQ40/kwbhx7FhTFx+/Ipr4KcIuQZ+GBYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACC3PZEBwWZYVekz0FhedPJcEkRVFtVoVciB4izvGMbF3iqqq667HoiBwjYuqbtbrqtBjAu8UZdX0PV5ZKgg8jcu6bppm7SaP6DtF023HakzgpaLqh7FpTOhpnPWrcdOYxsS+xRuWim4au8cj8lIxTGNLBRe9NRSTB3+y4YFbXa0MYy532A7yqT+o6nX/+kONudwW7980F1Nbxf5PnNXkQuX7x2mTszY/HA2S1nlJO1uVbhiXdbNp28mnwt3uXJaFYXxeiXsiTJRuWW/a5bZtd+uJO7jske2ZR2+jD6ubENPEWzXtu17bTLzdyLse+xrvrBaXjqWkjLdut0ONl+1axAkvetWwulV6nKTG5WEY9+N4Yqu4MYrPuwPpLnrLtp285HFGvJvtocbLXWVxSzYt9he9/pIn5AQ1ru+HcTeObRXparw53IHsVmr89Mp6e6zxcr0SSOKLnktemho3oxo3apxsWhzvQMyKJBe7UY13KzdyqaeFWZGmxvt05/sau+ClnhZdyPJ48ny/3bx7oMZqHHkaz+8TVuPk00LISfI9jImFhNNP47lZ8Sy3eBJ5hqVCjZPdQs/dRNuN49fY64/0MS88cEs1JrL+ufzCy+jUNR69/hDy03M06HnGxT7mhZBTbW37g5rzxw5qcta0GB0NMo1TBFxvHo7Nq3GyaXE8qGlWpMi32yr+w0dMnL28Ne1269h8wruPTdsul9OflHL2OK6a3fARkyyS5Ntd75p2+MBfi5Nux4dPSh0iTLVW9D9e3PjPHqljrtY+8E84JwT8PJe9ovSzQUkHRRewWZy+x7kWpx3ImY0N4BIueCIAALgE/wB5Hy4N/5rMxgAAAABJRU5ErkJggg==')
    no-repeat;
  background-size: contain;
  padding: 10px 5px;
}

.title-left {
  display: flex;
  align-items: center;
}

.title-text-1 {
  margin-right: 10px;
}

.title-text-2 {
  color: #fc3f2d;
}

.count-down {
  display: flex;
  height: 100%;
  margin-left: 20px;
}

.time-number {
  background: #fc3f2d;
  color: #fff;
  border-radius: 5px;
  padding: 0px 2px;
  font-size: 12px;
}

.time-colon {
  color: #fc3f2d;
  margin: 0px 2px;
  font-weight: 700;
}

.right-icon {
  font-size: 12px;
  color: #fc3f2d;
  display: flex;
  align-items: center;
  height: 24px;
}

.right-icon-arrow {
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}

.goods-list {
  display: flex;
  justify-content: space-between;
}

.goods-img {
  width: 70px;
  height: 80px;
}

.goods-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.goods-completion {
  margin-top: 5px;
  display: flex;
  height: 35px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
}

.goods-new-completion {
  color: #f2270c;
}

.goods-old-completion {
  color: #999;
  text-decoration-line: line-through;
}
</style>