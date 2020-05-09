<template>
  <div class="userMessage" style="padding-top:20px;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-for="item in breadcrumbList">
        <el-breadcrumb-item>{{userUrlMap[item]}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" size="mini" style="padding-top:20px;" inline>
      <el-form-item label="头像">
        <div class="block">
          <el-avatar :size="50" :src="imageUrl"></el-avatar>
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/system/zz_user_avatar/avatar"
            :http-request="uploadAvatar"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="24">
          <span>{{form.createTime}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  name: "UserMessage",
  data() {
    return {
      imageUrl: '',
      form: {
        username: "",
        type: [],
        createTime:"",
        sex: "",
        desc: "",
        avatarUrl: "/logo.png",
      },
      breadcrumbList:[],
      page:{
        currentPage:1,
        total:6,
        size:5,
        sizes:[5,10,15],
        hideSingle:true
      }
    };
  },
  computed: {
    ...mapGetters([
      'user',
      'userUrlMap'
    ])
  },
  methods: {
    ...mapActions({
      addOrUpdateAvatarAction:"avatar/addOrUpdateAvatarAction",
    }),
    onSubmit() {
      console.log("submit!");
    },
    // uploadChange(param){
    //   console.log("change")
    //   let file = param.raw
    //   const formData = new FormData()
    //   formData.append('file', file)
    //   console.log(file)
    //   console.log(formData.get('file'))
    //   this.addOrUpdateAvatarAction(formData).then(response=>{
    //     console.log(response)
    //     this.imageUrl = response.data.path;
    //   })
    // },
    uploadAvatar(param){
      console.log("upload")
      const formData = new FormData()
      formData.append('file', param.file)
      console.log(param.file)
      this.addOrUpdateAvatarAction(formData).then(response=>{
        // let fr = new FileReader();
        // let imgUrl = fr.readAsDataURL(new Blob(param.file, { type: "image/jpeg" }));
        console.log(response)
        let imgUrl = window.URL.createObjectURL(param.file)
        console.log(imgUrl)
        this.imageUrl = imgUrl
      })
    },
    handleAvatarSuccess(res, file) {
      console.log("success")
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log("before")
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  created(){
    this.form.username = this.user.username
    this.form.sex = this.user.sex
    this.form.createTime = this.user.createTime
    this.breadcrumbList = this.$route.path.split('/').filter(item=>item)
    // let file = new File()
    this.imageUrl = this.user.avatar.path
    // console.log(this.user)
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-form-item{
    width: 300px;
  }
</style>
