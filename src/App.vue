<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import {L2Dwidget} from "live2d-widget";
  export default {
    name: "App",
    data(){
      return {
        L2DConfig:{
          model: {
            jsonPath: '', // xxx.model.json 的路径
          },
          display: {
            "position": "right", //看板娘的表现位置left
            "width": 200,  //小萝莉的宽度
            "height": 450, //小萝莉的高度
            "hOffset": 0,
            "vOffset": -20
          },
          mobile: {
            show: true, // 是否在移动设备上显示
            scale: 1, // 移动设备上的缩放
            motion: true, // 移动设备是否开启重力感应
          },
          react: {
            opacityDefault: 1, // 默认透明度
            opacityOnHover: 1, // 鼠标移上透明度
          },
        },
      }
    },
    methods:{},
    created(){
      setTimeout(() => {
        L2Dwidget.on('*', (name) => {
        }).init({
          tagMode: true,
          debug: false,
          model: {jsonPath: '/live2dw/live2d-widget-model-z16/assets/z16.model.json'},
          display: {position: 'right', width: 150, height: 300},
          mobile: {show: true},
          log: false,
          react: {
            opacityDefault: 0.51, // 默认透明度
            opacityOnHover: 0.51, // 鼠标移上透明度
          },
          dialog: {
            enable: true,
            hitokoto:true,
            script: {
              //每20s，显示一言（调用一言Api返回的句子）
              'every idle 20s': '$hitokoto$',
              //触摸到class='star'对象
              'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
              //触摸到身体
              'tap body': '害羞⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
              //触摸到头部
              'tap face': '~~'
            }
          },
        })
      }, 1000)
    }
  };
</script>
<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body {
    margin: 0 !important;
    padding: 0 !important;
  }
</style>
