<template>
  <div class="redirect" ref="redirect">正在登录中。。。</div>
</template>

<script>
export default {
  name: "Redirect",
 async created() {
    let code = this.GetQueryString('code');
    let user = await this.$axios({
      url:'http://127.0.0.1:8000/gtab/oauth',
      method:'post',
      data:{
        code
      }
    })
    if(user.data.code == 200){
      this.$store.dispatch('user/login',user.data.data)
      this.$router.push('/login')
    }else{
      this.$refs.redirect.innerText = '登陆失败'
    }
  },
  methods: {
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>