<template>
  <div class="sidebar-content"
       ref="sidebarContent"
       @touchmove="moveBar"
       @touchstart="touchStart"
       @touchend="touchEnd">
    <div class="sidebar-content-position"
         ref="position">
      <div class="sidebar-content-info"
           v-for="info in list"
           :key="info.id">
        <div class="sidebar-content-title">{{info.title}}</div>
        <div class="sidebar-content-item">
          <div class="sidebar-content-item-info"
               v-for="item in info.list"
               :key="item.id">
            <div class="sidebar-content-item-img">
              <img :src="item.img"
                   alt="">
            </div>
            <div class="sidebar-content-item-text">{{item.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      translateY: 0,
      aboutMove: 0,
      beforeMove: 0,

      // 缓冲阈值 就是可以回弹的那部分
      threshold: 100,
    }
  },

  watch: {
    list() {
      this.changePosY(0)
    },
  },

  computed: {
    pos() {
      return this.$refs.position
    },

    sidebarContent() {
      return this.$refs.sidebarContent
    },

    //
    moveDistance() {
      return this.aboutMove - this.beforeMove
    },

    topThreshold() {
      return 0
    },

    bottomThreshold() {
      return -(this.pos.offsetHeight - this.sidebarContent.offsetHeight)
    },
  },

  methods: {
    // 手指按下
    touchStart({
      touches: {
        0: { clientY },
      },
    }) {
      // 准备滑动时删除掉transition类
      this.removeTransition()

      const y = clientY - this.sidebarContent.offsetTop

      // 更新开始坐标
      this.beforeMove = y
    },

    // touchMove事件时让元素跟随手指的移动（核心 重要）
    moveBar({
      touches: {
        0: { clientY },
      },
    }) {
      // beforeMove是手指按下去或者上一次移动的坐标
      // abountMove是手指当前的坐标
      // 每移动一次就计算出手指移动前（beforeMove）和移动后（abountMove）的差值（moveDistance）
      // 然后translatY加差值就完事了

      const y = clientY - this.sidebarContent.offsetTop

      this.aboutMove = y

      // 检测是否缓冲阈值
      if (this.checkHasBufferThresholdExceeded()) return

      this.changePosY(this.translateY + this.moveDistance)

      // 元素移动完后 原本的aboutMove就变成了beforeMove
      this.beforeMove = y
    },

    touchEnd({
      changedTouches: {
        0: { clientY },
      },
    }) {
      const y = clientY - this.sidebarContent.offsetTop

      // 手指离开时判断滚动是否超出阈值
      if (
        this.translateY > this.topThreshold ||
        this.translateY < this.bottomThreshold
      ) {
        // 超出阈值则添加transition类
        this.addTransition()

        // 然后将坐标设为阈值 因为添加了transition的类 就会有回弹的过渡
        this.changePosY(this.translateY > 0 ? 0 : this.bottomThreshold)
      }
    },

    changePosY(num) {
      this.pos.style = `transform: translateY(${num}px)`

      const reg = /(\d.\d+|\d|-\d)+/

      // 更新position的Y坐标
      this.translateY = Number(reg.exec(this.pos.style.transform)[0])
    },

    // 检测是否超出了缓冲阈值 就是回弹的那部分
    checkHasBufferThresholdExceeded() {
      if (
        this.translateY + this.moveDistance >=
          this.topThreshold + this.threshold ||
        this.translateY <= this.bottomThreshold - this.threshold
      )
        return true

      return false
    },

    // 添加和删除transition类 是归位的过渡类
    addTransition() {
      this.pos.classList.add('sidebar-content-position-move')
    },
    removeTransition() {
      this.pos.classList.remove('sidebar-content-position-move')
    },
  },
}
</script>

<style scoped lang='less'>
.sidebar-content {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .sidebar-content-info {
    padding: 19px 7px 0px;

    .sidebar-content-title {
      font-size: 14px;
      font-weight: 700;
    }

    .sidebar-content-item {
      display: flex;
      flex-wrap: wrap;

      margin-top: 9px;
      padding: 7px 10px 0px;

      .sidebar-content-item-info {
        text-align: center;
        width: 85px;

        .sidebar-content-item-img {
          & img {
            width: 70px;
            height: 70px;
          }
        }

        .sidebar-content-item-text {
          height: 35px;
          margin-top: 2px;

          font-size: 12px;
        }
      }
    }
  }

  .sidebar-content-position-move {
    transition: transform 0.3s;
  }
}
</style>