<template>
  <div class="user-menu" style="height:100%">
    <el-menu
      default-active="/user/message"
      class="el-menu-vertical-demo"
      style="height:inherit"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :background-color="backgroundColor"
      :unique-opened="isUniqueOpened"
      :active-text-color="activeTextColor"
      :text-color="textColor"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">个人中心</span>
        </template>
        <el-menu-item-group>
          <!--<span slot="title">个人</span>-->
          <el-menu-item index="/user/message">
            <i class="el-icon-menu"></i>基本信息
          </el-menu-item>
<!--          <el-menu-item index="/user/video">-->
<!--            <i class="el-icon-menu"></i>视频投稿-->
<!--          </el-menu-item>-->
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/user/follows">
            <i class="el-icon-menu"></i>我的关注
          </el-menu-item>
          <el-menu-item index="/user/fans">
            <i class="el-icon-menu"></i>我的粉丝
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
<!--      <el-menu-item index="/content">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">好友中心</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/content">
        <i class="el-icon-menu"></i>
        <span slot="title">工作中心</span>
      </el-menu-item>
      <el-menu-item index="/user/collection">
        <i class="el-icon-document"></i>
        <span slot="title">我的收藏</span>
      </el-menu-item>
<!--      <el-menu-item index="4">-->
<!--        <i class="el-icon-setting"></i>-->
<!--        <span slot="title">历史记录</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
  data() {
    return {
      isCollapse: false,
      isUniqueOpened: true,
      backgroundColor:"#fff",
      textColor:"#303133",
      activeTextColor:"#fff"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.user-menu .el-menu-item.is-active {
  background: #6db6ff !important;
}
user-menu .el-submenu__title.is-active {
  background: #6db6ff !important;
}
</style>
