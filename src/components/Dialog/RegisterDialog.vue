<template>
  <div class="register-dialog">
    <el-button type="text" @click="centerDialogVisible = true">注册</el-button>
    <el-dialog title="注册" :visible.sync="centerDialogVisible" width="35%" center>
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
          <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">
            <span v-if="!loading">注 册</span>
            <span v-else>注 册 中...</span>
          </el-button>
          <el-button @click="centerDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {encrypt} from "@/utils/rsaEncrypt"
export default {
  name: "RegisterDialog",
  data() {
    let validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      centerDialogVisible: false,
      loading: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch("user/registerAction", {
              username: this.ruleForm.username,
              password: encrypt(this.ruleForm.password)
            })
            .then(response => {
              this.$message({
                type: "success",
                message: "注册成功!",
                duration: 1000
              });
              // this.$router.go(0);
              this.loading = false
              this.centerDialogVisible = false;
              this.$router.go(0)
            }).catch(error=>{
              this.loading = false
              console.log(error)
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
</style>
