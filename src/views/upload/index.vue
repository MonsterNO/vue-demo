<template>
  <div class="upload">
    <div class="container">
      <div class="title">预览区</div>
      <div
        class="preview"
        @dragenter="dragenter"
        @dragover="dragover"
        @drop="drop"
      >
        <div class="item" v-for="(item, index) in tempList" :key="index">
          <el-image class="img" :src="item" :preview-src-list="tempList" />
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="progress"
            v-if="progress"
          ></el-progress>
        </div>
      </div>
      <el-button type="primary" size="small" @click="fileUploadNode"
        >选择文件</el-button
      >
      <el-button type="primary" size="small" @click="submit"
        >上传文件</el-button
      >
    </div>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";
import axios from "axios";
export default {
  name: "upload",
  data() {
    return {
      tempList: [],
      progress: 0,
      files: null,
    };
  },
  methods: {
    //创建input获得file文件
    fileUploadNode() {
      // 创建input标签
      const input = document.createElement("input");
      //设置input样式
      input.style =
        "display: block; width: 0; height: 0; padding: 0; border: 0;";
      //设置input为file类型
      input.setAttribute("type", "file");
      //设置input name
      input.setAttribute("name", "file");
      //是否多选
      input.setAttribute("multiple", true);
      document.body.appendChild(input);
      input.addEventListener("change", async (e) => {
        this.files = e.target.files;
        let chunks = this.createChunks(this.files[0], 5 * 1024);
        let hash = await this.hash(chunks);
        console.log(hash);
        // this.transImg(this.files);
        setTimeout(() => {
          document.body.removeChild(input);
        });
      });
      input.click();
    },

    /**
     * 计算hash
     * @param {分片数组} chunks
     */
    hash(chunks) {
      return new Promise((resolve, reject) => {
        let spark = new SparkMD5();
        function _read(i) {
          if (i >= chunks.length) {
            resolve(spark.end());
            return;
          }
          let blob = chunks[i];
          let reader = new FileReader();
          reader.onload = (e) => {
            let byts = e.target.result;
            spark.append(byts);
            _read(i + 1);
          };
          reader.readAsArrayBuffer(blob);
        }
        _read(0);
      });
    },

    /**
     *
     * @param {下标} i
     * @param {分片数组} chunks
     * @param {MD5方法} spark
     */
    fileRead(i, chunks, spark) {
      if (i >= chunks.length) {
        console.log(spark.end());
        return;
      }
      let blob = chunks[i];
      let reader = new FileReader();
      reader.onload = (e) => {
        let byts = e.target.result;
        spark.append(byts);
        this.fileRead(i + 1, chunks, spark);
      };
      reader.readAsArrayBuffer(blob);
    },

    /**
     *文件分片
     * @param {文件} file
     * @param {切片大小} chunkSize
     */
    createChunks(file, chunkSize) {
      let result = [];
      for (let i = 0; i < file.size; i += chunkSize) {
        result.push(file.slice(i, i + chunkSize));
      }
      return result;
    },

    transImg(files) {
      let list = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            list.push(reader.result);
          },
          false
        );
        reader.readAsDataURL(files[i]);
      }
      this.tempList = list;
    },

    dragenter(e) {
      e.preventDefault();
    },

    dragover(e) {
      e.preventDefault();
    },

    drop(e) {
      e.preventDefault();
      let files = e.dataTransfer.files;
      if (!e.dataTransfer.types.includes("Files")) {
        this.$message({
          message: "仅支持拖拽文件",
          type: "warning",
        });
        return;
      }
      if (files.length !== 1) {
        this.$message({
          message: "仅支持上传单个文件",
          type: "warning",
        });
        return;
      }
      this.files = e.dataTransfer.files;
      this.transImg(this.files);
    },

    submit() {
      const formData = new FormData();
      formData.append("file", this.files[0]);
      axios({
        url: "http://127.0.0.1:3000/upload",
        method: "post",
        data: formData,
        onUploadProgress: (e) => {
          this.progress = (e.loaded / e.total) * 100;
        },
      }).then((res) => {
        console.log(res.data);
        this.files = null;
        this.$message({
          message: "上传成功",
          type: "success",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 50vw;
  margin: 50px auto;
  text-align: center;
  .title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .preview {
    border: 2px dashed #ccc;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 20px;
    column-gap: 20px;
    margin-bottom: 20px;
    min-height: 300px;
  }
}
</style>