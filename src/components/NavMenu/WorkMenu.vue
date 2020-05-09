<template>
    <div class="work-menu" style="height:100%">
      <el-menu
        default-active="/content"
        class="el-menu-vertical-demo"
        style="height:inherit"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        :collapse="isCollapse"
        :background-color="backgroundColor"
        :unique-opened="isUniqueOpened"
        :active-text-color="activeTextColor"
        :text-color="textColor"
        router
      >
          <el-menu-item-group>
            <el-menu-item index="/content">
              <i class="el-icon-folder-opened"></i>我的文档
            </el-menu-item>
            <el-menu-item index="/content/recentEdited">
              <i class="el-icon-edit-outline"></i>最近编辑
            </el-menu-item>
              <el-menu-item index="/content/published">
                  <i class="el-icon-edit-outline"></i>我的已发布
              </el-menu-item>
          </el-menu-item-group>
<!--        <el-menu-item index="/">-->
<!--          <i class="el-icon-menu"></i>-->
<!--          <span slot="title">回收站</span>-->
<!--        </el-menu-item>-->
      </el-menu>
    </div>
</template>
<script>
    export default {
       name: "WorkMenu",
      data(){
        return {
          isCollapse: false,
          isUniqueOpened: true,
          backgroundColor:"#fff",
          textColor:"#303133",
          activeTextColor:"#fff"
        }
      },
      methods:{
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        handleSelect(key,keyPath){
          console.log(key,keyPath)
        }
      }
    }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .work-menu .el-menu-item.is-active {
    background: #6db6ff !important;
  }
  .work-menu .el-submenu__title.is-active {
    background: #6db6ff !important;
  }
</style>
