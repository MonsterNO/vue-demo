<template>
  <div>
    <input type="file" accept="video/*" ref="vdoFileRef" @change="changeFile" />
    <div class="preview">
      <img :src="item.url" v-for="(item, index) in list" :key="index" alt="" @click="selectCapture(item)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoCapture',
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async changeFile(e) {
      let file = e.target.files[0];
      let vdo = document.createElement('video');
      vdo.src = URL.createObjectURL(file);
      // 间隔1秒生成10张封面图
      for (let i = 0; i < 10; i++) {
        let frame = await this.captureFrame(vdo, i * 1);
        this.list.push(frame);
      }
    },
    // 获取关键帧
    captureFrame(vdo, time = 0) {
      return new Promise((resolve, reject) => {
        vdo.currentTime = time;
        vdo.muted = true;
        vdo.autoplay = true;
        vdo.oncanplay = async () => {
          let frame = await this.drawVideo(vdo);
          resolve(frame);
        };
      });
    },
    // 绘制视频关键帧
    drawVideo(vdo) {
      return new Promise((resolve, reject) => {
        let cvs = document.createElement('canvas');
        let ctx = cvs.getContext('2d');
        cvs.width = vdo.videoWidth;
        cvs.height = vdo.videoHeight;
        ctx.drawImage(vdo, 0, 0, cvs.width, cvs.height);
        cvs.toBlob((blob) => {
          resolve({
            blob,
            url: URL.createObjectURL(blob),
          });
        });
      });
    },
    selectCapture(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  column-gap: 5px;
  margin-top: 10px;
  img {
    width: 100%;
    cursor: pointer;
  }
}
</style>
