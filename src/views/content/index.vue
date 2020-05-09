<template>
  <div class="content">
    <el-row>
      <el-col>
        <nav-menu></nav-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <tool-menu></tool-menu>
      </el-col>
    </el-row>
    <el-row style="min-height:calc(100vh - 112px);" type="flex">
      <el-col :span="5" style="min-height:calc(100vh - 112px);min-width:220px;max-width:220px">
        <work-menu></work-menu>
      </el-col>
      <el-col :span="19">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import NavMenu from "@/components/NavMenu/NavMenu";
  import ToolMenu from "@/components/NavMenu/ToolMenu";
  import WorkMenu from "@/components/NavMenu/WorkMenu";
  import Tab from "@/components/Tab/Tab";
  import {mapState,mapGetters,mapActions} from "vuex";
  export default {
    name: "Content",
    components: {
      Tab,
      NavMenu,
      ToolMenu,
      WorkMenu,
    },
    provide(){
      return {
          delDialog: this.deleteDialog,
          reDialog: this.renameDialog,
      }
    },
    data() {
      return {
        currentPath: this.currentResourcePath,
        breadcrumbList: this.currentResourcePath!=null?this.currentResourcePath.split('/'):[],
        deleteDialog: {visible:false,file:{},index:0},
        renameDialog: {visible:false,file:{},index:0}
      }
    },
    created(){

    },
    computed:{
      ...mapState({

      }),

    },
    methods:{


    }
  };
</script>
<style scoped lang="scss">
  .el-header {
    padding: 0;
  }
  .userSource {
    padding:10px
  }
  .userSource:first-child{

  }

  .el-menu-item{
    height: 30px !important;
    line-height: 30px !important;
    & span{
      padding-left: 5px;
    }
  }

  .el-divider.el-divider--horizontal{
    margin-top: 5px !important;
    margin-bottom: 5px !important;
  }

  .el-popover.el-popper{
    width: 100px !important;
  }
</style>
