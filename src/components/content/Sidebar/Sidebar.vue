<template>
  <div class="sidebar"
       @click="clickItme"
       ref="sidebar"
       @touchmove="moveBar"
       @touchstart="touchStart"
       @touchend="touchEnd">
    <div class="sidebar-position"
         ref="position">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
  },

  mounted() {
    this.pos.addEventListener('transitionend', () => {
      this.removeTransition()
    })
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

  computed: {
    pos() {
      return this.$refs.position
    },

    sidebar() {
      return this.$refs.sidebar
    },

    //
    moveDistance() {
      return this.aboutMove - this.beforeMove
    },

    topThreshold() {
      return 0
    },

    bottomThreshold() {
      return -(this.pos.offsetHeight - this.sidebar.offsetHeight)
    },
  },

  methods: {
    clickItme({ target }) {
      const child = [].slice.call(this.$refs.position.children)

      let activeItem = []

      // 清除所有标签的active类
      child.forEach((item) => {
        item.classList.remove('sidebar-item-active')
      })

      // 为选中标签添加active类
      target.classList.add('sidebar-item-active')

      for (const index in child) {
        const item = child[index]

        if (item === target) {
          // 更新选中标签的index
          this.$emit('input', Number(index))

          activeItem = item
          break
        }
      }

      this.addTransition()

      // 滚动到选中标签的offsetTop
      this.changePosY(
        // 判断滚动后是否超出了底部的阈值
        -activeItem.offsetTop < this.bottomThreshold
          ? this.bottomThreshold
          : -activeItem.offsetTop
      )
    },

    // 手指按下
    touchStart({
      touches: {
        0: { clientY },
      },
    }) {
      // 准备滑动时删除掉transition类
      this.removeTransition()
      console.log()
      const y = clientY - this.sidebar.offsetTop

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

      const y = clientY - this.sidebar.offsetTop

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
      const y = clientY - this.sidebar.offsetTop

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
      this.pos.classList.add('sidebar-move')
    },
    removeTransition() {
      this.pos.classList.remove('sidebar-move')
    },
  },
}
</script>

<style scoped lang='less'>
.sidebar {
  overflow: hidden;
  height: 100%;

  .sidebar-move {
    transition: transform 0.3s;
  }
}
</style>