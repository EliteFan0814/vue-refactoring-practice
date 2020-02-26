<template>
  <div id="app">
    <!-- 挂载 顶部 topbar 左侧 nav 中间 layout 主体 -->
    <router-view v-if="isRouterAlive"></router-view>
    
  </div>
</template>

<script>
export default {
  // created() {
  //   if (localStorage.token) {
  //     this.$store.commit('LOGIN_IN', { token: localStorage.token })
  //   } else {
  //     this.$router.push('/login')
  //   }
  // }
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
</style>
