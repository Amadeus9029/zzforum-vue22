<template>
  <el-dialog
    title="删除文件"
    :visible.sync="delDialog.visible"
    width="30%">
    <span>确认删除吗？</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="delDialog.visible = false">取 消</el-button>
    <el-button type="primary" @click="deleteFile">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {mapMutations,mapGetters,mapActions} from "vuex"
export default {
  name: "DeleteFileDialog",
  inject: {
    delDialog:{
      default:()=>{}
    }
  },
  data(){
      return {

      }
  },
  computed:{
    ...mapGetters([
      'currentResource'
    ])
  },
  methods:{
    ...mapMutations({
      'delCurrentResource':'resource/DEL_CURRENT_RESOURCE'
    }),
    ...mapActions({
      deleteResourceAction:"resource/deleteResourceAction"
    }),
    getChildrenIds(item,ids){
      if(item.children&&item.children.length!==0){
        item.children.forEach(item=>{
          ids.push(item.id)
          this.getChildrenIds(item,ids)
        })
      }
    },
    deleteFile(){
      let ids = []
      //将当前要删除的id放入第一个
      ids.push(this.delDialog.file.id)
      //存入所有要删除的id
      this.getChildrenIds(this.delDialog.file,ids)
      this.deleteResourceAction(ids).then((resolve,reject)=>{
        this.delCurrentResource(this.delDialog.file.id)
        this.$message({
          type:"success",
          message: "删除成功"
        })
      })
      this.delDialog.visible = false
    }
  },
  created(){

  }
}
</script>

<style scoped>

</style>
