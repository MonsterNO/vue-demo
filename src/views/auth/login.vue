<template>
  <div class="login">
    <div class="github">
      <div class="title">github登录</div>
      <div class="user">
        <div class="nickname">名称：{{ nickname }}</div>
        <div class="avatar">头像：<img v-if="avatar" :src="avatar" alt="" /></div>
      </div>
      <el-button type="primary" size="small" @click="githubLogin"
        >开始登录</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapGetters(["nickname", "avatar"]),
  },
  methods: {
    githubLogin() {
      window.location.href = "https://github.com/login/oauth/authorize?client_id=b3a89821d2d1cc218193&redirect_uri=http://localhost:8082/redirect";
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 10px 0;
}
.user {
  margin: 10px 0;
  .avatar {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>