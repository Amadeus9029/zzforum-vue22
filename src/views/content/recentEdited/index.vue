<template>
  <div class="content-recent-edited">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;margin-top: 20px">
      <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>最近编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-top: 20px;">
      <el-col class="userSource"
              :span="4" v-for="(item,i) in recentEditedResource"
              :key="i"
              style="min-width: 172px">
        <el-card shadow="hover"
                 @mouseover.native="toolsIn($event)"
                 @mouseout.native="toolsOut($event)"
                 @click.native="fileMenu($event,i)"
                 style="min-width: 150px;max-height:150px;width:100%">
          <el-popover
            placement="bottom"
            width="150"
            trigger="manual"
            v-model="item.visible">
            <el-menu style="border:none">
              <el-menu-item height="30px" @click.native="showDeleteDialog(item,i)"><i class="el-icon-delete-solid"></i><span>删除</span></el-menu-item>
              <el-menu-item @click.native="renameFile($event,item,i)"><i class="el-icon-edit" style="color: #909399"></i><span>重命名</span></el-menu-item>
              <el-divider></el-divider>
              <el-menu-item><i class="el-icon-s-flag"></i><span>标记</span></el-menu-item>
            </el-menu>
            <i class="el-icon-s-tools"
               slot="reference"
               :data-index="'el-icon-s-tools'"
               style="float:right;color:rgb(204,204,204)"></i>
          </el-popover>

          <div @dblclick="jumpPathByDoc($event,item)">
            <i v-if="item.zzStrategy"
               :class="item.icon"
               :data-index="item.icon"
               :data-id="item.zzStrategy.id"
               style="font-size:50px"></i>
          </div>
          <span style="display:inline-block;margin-top:15px">{{item.name}}</span>
        </el-card>
      </el-col>
    </el-row>
    <delete-file-dialog></delete-file-dialog>
    <rename-file-dialog></rename-file-dialog>
  </div>
</template>

<script>
    import DeleteFileDialog from "../components/dialog/DeleteFileDialog";
    import RenameFileDialog from "../components/dialog/RenameFileDialog";
  import {mapGetters,mapActions} from "vuex"
    export default {
      name: "ContentRecentEdited",
      components:{
        DeleteFileDialog,
        RenameFileDialog
      },
      provide(){
        return {
          delDialog: this.deleteDialog,
          reDialog: this.renameDialog,
        }
      },
      data(){
          return{
            deleteDialog: {visible:false,file:{},index:0},
            renameDialog: {visible:false,file:{},index:0}
          }
      },
      computed:{
        ...mapGetters([
          "recentEditedResource",
        ])
      },
      methods:{
        ...mapActions({
          getRecentEditedResourceAction:'resource/getRecentEditedResourceAction',
        }),
        getRecentEditedResource(){
          this.getRecentEditedResourceAction().then((response)=>{})
        },
        jumpPathByDoc(event, source) {
          let dom = event.target
          let index = dom.getAttribute('data-index')
          if (index === "el-icon-document") {
            let id = dom.getAttribute('data-id')
            let routeUrl = this.$router.resolve({
              path: "/work/"+id,
              params: {id: id}
            });
            window.open(routeUrl.href, '_blank');
          }
        },
        toolsIn(event){
          let dom = event.target
          let index = dom.getAttribute('data-index')
          if(index === 'el-icon-s-tools'){
            dom.style.color = "#000"
          }
        },
        toolsOut(event){
          let dom = event.target
          let index = dom.getAttribute('data-index')
          if(index === 'el-icon-s-tools'){
            dom.style.color = "#ccc"
          }
        },
        fileMenu(event,i){        //打开文件菜单
          let dom = event.target
          let index = dom.getAttribute('data-index')
          if(index === 'el-icon-s-tools'){
            this.$store.commit("resource/SET_EACH_RECENT_EDITED_RESOURCE_MEMBER"
              ,{member:"visible",value:false})
            this.$store.commit("resource/SET_SOME_RECENT_EDITED_RESOURCE_MEMBER"
              ,{index:i,member:"visible",value:!this.recentEditedResource[i].visible})
          }
        },
        closeFileMenu(event){
          let dom = event.target
          let index = dom.getAttribute('data-index')
          if(index !== 'el-icon-s-tools') {
            this.$store.commit("resource/SET_EACH_RECENT_EDITED_RESOURCE_MEMBER"
              , {member: "visible", value: false})
          }
        },
        showDeleteDialog(file,index){
          this.deleteDialog.visible = true
          this.deleteDialog.file = file
          this.deleteDialog.index = index
          this.delDialog = this.deleteDialog
        },
        renameFile(event,file,index){
          this.renameDialog.visible = true
          this.renameDialog.file = file
          this.renameDialog.index = index
          this.reDialog = this.renameDialog;
        }
      },
      created(){
        this.getRecentEditedResource()
        document.addEventListener("click",this.closeFileMenu)
      }
    }
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
