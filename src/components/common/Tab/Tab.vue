<template>
  <div class="tab-wrapper">
    <div class="tab-items"
         ref="tabItems"
         @click="click">
      <slot></slot>
    </div>
    <div class="line"
         ref="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '0',
    },
    lineBottom: {
      type: [String, Number],
      default: 5,
    },
    lineWrapper: {},
    lineColor: {
      type: String,
      default: '#000',
    },
    activeClass: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.initItems()
    this.initLine()
  },
  data() {
    return {
      line: null,
      items: null,
      valueC: this.value,
    }
  },
  watch: {
    value(newValue) {
      this.valueC = newValue
    },
    valueC(newValue) {
      this.$emit('input', newValue)
    },
  },
  methods: {
    click({ target }) {
      target =
        this.lineWrapper !== undefined
          ? this.getItemWrap(target)
          : this.getItemTextEle(target)

      this.line.style.transform = `translate(${target.offsetLeft}px,  ${-this
        .lineBottom}px)`

      this.emitClick(target)
      this.emitChange(target)
    },
    initLine() {
      if (!this.$refs.tabItems.children.length) return
      const line = this.$refs.line
      const item =
        this.lineWrapper !== undefined
          ? this.items[0]
          : this.getItemTextEle(this.$refs.tabItems)

      line.style.transform = `translate(${item.offsetLeft}px, ${-this
        .lineBottom}px)`
      line.style.width = item.offsetWidth + 'px'
      line.style.background = this.lineColor
      this.line = line

      setTimeout(() => {
        line.style.transition = 'transform 0.2s'
      })
    },
    initItems() {
      this.items = this.$refs.tabItems.children
      this.items[0].classList.add(this.activeClass)
      this.valueC = '0'
    },
    getItemTextEle(node) {
      if (!node.hasChildNodes()) return
      for (const prop of node.childNodes) {
        if (prop.nodeType === 3) return prop.parentNode
        const ele = this.getItemTextEle(prop)
        if (ele) return ele
      }
    },
    getItemWrap(node) {
      if (node.classList.contains('tab-item')) {
        return node
      } else {
        return this.getItemWrap(node.parentNode)
      }
    },
    getItemIndex(node) {
      node = this.getItemWrap(node)
      const items = this.items

      for (const prop in items) {
        const item = items[prop]
        if (item === node) return prop
      }
    },
    setItemActive(target) {
      target = this.getItemWrap(target)
      const items = this.items

      for (const prop in Object.keys(items)) {
        const item = items[prop]
        item.classList.remove(this.activeClass)
      }

      target.classList.add(this.activeClass)
    },
    emitClick(target) {
      const index = this.getItemIndex(this.getItemWrap(target))
      const title = this.getItemTextEle(target).innerText

      this.$emit('click', [index, title])
    },
    emitChange(target) {
      const index = this.getItemIndex(this.getItemWrap(target))
      const title = this.getItemTextEle(target).innerText

      this.$emit('change', [index, title])

      this.setItemActive(target)
      this.valueC = index
    },
  },
}
</script>

<style scoped lang='less'>
.tab-wrapper {
  position: relative;
  height: 100%;

  .tab-items {
    display: flex;
  }

  .line {
    position: absolute;
    bottom: 3px;
    height: 3px;
    border-radius: 10px;
  }
}
</style>