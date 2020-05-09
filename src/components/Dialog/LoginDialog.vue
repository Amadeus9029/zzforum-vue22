<template>
  <div class="login-dialog">
    <el-button type="text" @click="centerDialogVisible = true">登录</el-button>
    <el-dialog title="登录" :visible.sync="centerDialogVisible" width="35%" center>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
        <el-checkbox v-model="ruleForm.rememberMe">
          记住我
        </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button  :loading="loading" type="primary" @click.native.prevent="submitForm('ruleForm')">
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <el-button @click="centerDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {encrypt} from "@/utils/rsaEncrypt"
import {mapActions} from "vuex"
import Cookies from "js-cookie"
import Config from "@/settings"
export default {
  name: "LoginDialog",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      centerDialogVisible: false,
      loading:false,
      ruleForm: {
        username: "",
        password: "",
        rememberMe: false
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions({
      'handleLogin':'user/loginAction'
    }),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          const user = {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            rememberMe: this.ruleForm.rememberMe
          }
          if (user.password !== this.cookiePass) {
            user.password = encrypt(user.password)
          }
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: Config.passCookieExpires })
            Cookies.set('password', user.password, { expires: Config.passCookieExpires })
            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.handleLogin({
            username: user.username,
            password: user.password
          }).then(response => {
            this.centerDialogVisible = false;
            this.loading = false;
            this.$router.go(0)
          }).catch(e=>{
            this.loading = false;
            console.log(e)
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.ruleForm.password : password
      this.ruleForm = {
        username: username === undefined ? this.ruleForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      }
    },
  },
  created(){
    this.getCookie()
  }
};
</script>
<style scoped>
</style>
