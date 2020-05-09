<template>
  <el-dialog
    title="重命名文件"
    :visible.sync="reDialog.visible"
    width="30%">
    <el-input ref="renameInput" v-model="reDialog.file.name"></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="reDialog.visible = false">取 消</el-button>
    <el-button type="primary" @click="renameFile(reDialog.file)">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from "vuex"
export default {
  name: "RenameFileDialog",
  inject:{
    reDialog:{
      default:()=>{}
    }
  },
  data(){
    return {

    }
  },
  watch:{
    reDialog: {
      deep:true,
      handler(newValue,oldValue){
        this.$nextTick(()=>{
          if(this.reDialog.visible === true){
            this.$refs["renameInput"].focus()
          }
        })
      }
    }
  },
  computed:{
    ...mapGetters([
      'currentResource'
    ])
  },
  methods:{
    ...mapMutations({
      updateCurrentResource:"resource/SET_SOME_CURRENT_RESOURCE_MEMBER"
    }),
    ...mapActions({
      updateResourceAction:"resource/updateResourceAction"
    }),
    renameFile(file){
      console.log("file123")
      console.log(file)
      let name = file.name
      file.name = this.autoName(file.name)
      if(file.name !== name){
        const h = this.$createElement;
        this.$notify.info({
          title: '自动更名',
          message: h('i', { style: 'color: red'}, `重名: ${name}，自动更名: ${file.name}`)
        });
      }
      this.updateResourceAction(file).then((resolve,reject)=>{
        this.updateCurrentResource({index:this.reDialog.index,member:"name",value:file.name})
        this.reDialog.visible=false
      })
    },
    autoName(name,count=0,nameList=[]){
      const reg = /^.*\([0-9]{1,3}\)$/
      if(nameList.length===0){
        this.currentResource.forEach((item,index)=>{
          if(this.reDialog.index!==index) nameList.push(item.name)
        })
      }
      if(!nameList.find(val=>val===name)){
        return name
      }else{
        count++
        if(reg.test(name)){
          name = name.split('(')[0]
        }
        name = name + '(' + count + ')'
        return this.autoName(name,count,nameList)
      }
    }
  },
}
</script>

<style scoped>

</style>
