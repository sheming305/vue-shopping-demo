<template>
  <div id="app">
    <keep-alive>
      <!-- 每个路由添加title -->
      <router-view v-wechat-title='$route.meta.title'></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
  *
    padding: 0
    margin: 0
  ul
    list-style: none
  html
    font-size:66.5%
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
  .clearfix
    display: block
    content: ''
    clear: both
  
</style>
