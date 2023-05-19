<template>
  <div class="lottie">
    <div ref="lottieRef"></div>
    <el-button @click="start">开始</el-button>
    <el-button @click="pause">暂停</el-button>
    <el-button @click="stop">停止</el-button>
    <el-button @click="setDirection">改变播放方向</el-button>
    <el-button @click="setSpeed">加速0.1</el-button>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import lottieData from './lottie.json'
export default {
  name: 'Lottie',
  data() {
    return {
      animation: null,
      direction: 1,
      speed:1
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.animation = lottie.loadAnimation({
        container: this.$refs.lottieRef,
        renderer: 'canvas',// 渲染方式：svg、canvas
        loop: true,  // 循环播放，默认：false
        // path: '/lottie.json'  // json 路径
        animationData: lottieData
      })
    },
    start() {
      this.animation.play()
    },
    stop() {
      this.animation.stop()
    },
    pause() {
      this.animation.pause()
    },
    setDirection() {
      let d = this.direction === 1 ? -1 : 1
      this.animation.setDirection(d)
      this.direction = d
    },
    setSpeed(){
      let s = this.speed + 0.1
      this.animation.setSpeed(s)
      this.speed = s
    }
  }
}
</script>

<style lang="scss" scoped>
.lottie {
  width: 100%;
  height: 100vh;
  text-align: center;

  &>div {
    width: 50%;
    height: 50%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}
</style>