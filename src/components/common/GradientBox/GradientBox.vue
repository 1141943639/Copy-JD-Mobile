<template>
  <div class="gradient-box-wrapper"
       @click="clickBox"
       ref="gradientBoxWrapper">
    <div class="box-img">
      <slot name="img">
        <div class="box-img-slot">
          <img :src="img"
               alt=""
               v-if="img">
        </div>

      </slot>
    </div>
    <div class="box-text">
      <slot name="text">
        <span v-if="text">{{text}}</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
    },
    text: {
      type: String,
    },
    clickBox: {
      type: Function,
      default() {
        return () => {}
      },
    },
    linearGradient: {
      type: String,
      default: '#ffae46, #ff624f',
    },
    linearGradientDir: {
      type: String,
      default: 'to right',
    },
  },
  mounted() {
    this.setLinearGradient()
  },
  methods: {
    setLinearGradient() {
      const w = this.$refs.gradientBoxWrapper
      w.style.background = `linear-gradient(${this.linearGradientDir}, ${this.linearGradient})`
    },
  },
}
</script>

<style scoped>
.gradient-box-wrapper {
  display: flex;
  flex-direction: column;
  width: 75px;
  border-radius: 15px;
  color: #fff;
}

.box-img {
  height: 100%;
  padding: 4px;
}

.box-img-slot {
  width: 100%;
  height: 100%;
  padding: 5px;
  border-radius: 12px;
  background-color: #fff;
  overflow: hidden;
}

.box-img-slot img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.box-text {
  display: flex;
  line-height: 20px;
  align-items: center;
  justify-content: center;
}
</style>