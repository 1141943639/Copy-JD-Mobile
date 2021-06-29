<template>
  <div class="show-acitivity-wrapper">
    <div class="left"
         @click="clickLeft">
      <div class="left-img">
        <slot name="left-img">
          <img :src="leftImg"
               alt=""
               v-if="leftImg">
        </slot>
      </div>
      <div class="left-text">
        <slot name="left-bottom">
          <span v-if="leftBottom">{{leftBottom}}</span>
        </slot>
      </div>
    </div>
    <div class="center"
         @click="clickCenter">
      <div class="center-top">
        <slot name="center-top">
          <span v-if="centerTop">{{centerTop}}</span>
        </slot>
      </div>
      <div class="center-bottom">
        <div class="center-bottom-bg">
          <slot name="center-bottom">
            <span v-if="centerBottom">{{centerBottom}}</span>
          </slot>
        </div>
      </div>
      <div class="center-left">
        <slot name="center-left">
          <img :src="centerLeftImg"
               alt=""
               v-if="centerLeftImg">
        </slot>
      </div>
      <div class="center-right">
        <slot name="center-right">
          <img :src="centerRightImg"
               alt=""
               v-if="centerRightImg">
        </slot>
      </div>

    </div>
    <div class="right"
         @click="clickRight">
      <div class="right-img">
        <slot name="right-img">
          <img :src="rightImg"
               alt=""
               v-if="rightImg">
        </slot>
      </div>
      <div class="right-text">
        <slot name="right-bottom">
          <span v-if="rightBottom">{{rightBottom}}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftImg: {
      type: String,
    },
    leftBottom: {
      type: String,
    },
    centerTop: {
      type: String,
    },
    centerLeftImg: {
      type: String,
    },
    centerRightImg: {
      type: String,
    },
    centerBottom: {
      type: String,
    },
    rightImg: {
      type: String,
    },
    rightBottom: {
      type: String,
    },
    clickLeft: {
      type: Function,
      default() {
        return () => {}
      },
    },
    clickCenter: {
      type: Function,
      default() {
        return () => {}
      },
    },
    clickRight: {
      type: Function,
      default() {
        return () => {}
      },
    },
  },
}
</script>

<style scoped>
.show-acitivity-wrapper {
  display: flex;
  justify-content: space-between;
  width: 360px;
  height: 100px;
  margin: 0px auto;
  margin-top: 10px;
  padding-top: 5px;
  display: flex;
  background-image: linear-gradient(to right, #ffd5b8, #ff8a9d);
  border-radius: 10px;
  color: #fff;
  text-align: center;
  font-size: 12px;
}
.left {
  display: flex;
  flex-direction: column;
  width: 75px;
  border-radius: 10px;
  background-image: linear-gradient(to right, #ffae46, #ff624f);
  margin-left: 5px;
}

.left-img {
  width: 100%;
  height: 75px;
  overflow: hidden;
}

.left-text {
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: center;
}

.center {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 180px;
  margin-bottom: 5px;
  padding: 5px 0px;
  border-radius: 10px;
  background-color: #fff;
}

.center-top {
  position: absolute;
  top: 0px;
  transform: translateY(-50%);
  border-radius: 25px;
  padding: 0px 10px;
  height: 20px;
  background-image: linear-gradient(to right, #ffa78c, #f23859);
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-left,
.center-right {
  width: 70px;
  height: 100%;
}

.center-bottom {
  position: absolute;
  height: 20px;
  bottom: -1px;
}

.center-bottom-bg {
  position: relative;
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0px 10px;
  background-image: linear-gradient(to right, #fc4e50, #b53ee2);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  z-index: 1;
}

.center-bottom::before {
  content: '';
  display: block;
  position: absolute;
  bottom: -3px;
  left: 0px;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #fc4e50, #b53ee2);
  border-radius: 10px;
}

.right {
  display: flex;
  flex-direction: column;
  width: 75px;
  border-radius: 10px;
  background-image: linear-gradient(to right, #fc3fc4, #c432ef);
  overflow: hidden;
  margin-right: 5px;
}

.right-img {
  width: 100%;
  height: 75px;
  overflow: hidden;
}

.right-text {
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: center;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}
</style>