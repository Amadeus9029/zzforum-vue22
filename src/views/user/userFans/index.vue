<template>
  <div class="userFans" style="padding-top:20px;">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-for="item in breadcrumbList">
        <el-breadcrumb-item>{{userUrlMap[item]}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <el-divider></el-divider>
    <template v-for="i in 4">
      <el-row type="flex">
        <el-col :span="3" style="min-width:100px">
          <el-avatar :size="80" :src="'/logo.png'"></el-avatar>
        </el-col>
        <el-col :span="13">
          <el-row style="height:100%">
            <el-col align="left">
              <div>用户名</div>
            </el-col>
            <el-col align="left" style="margin-top:20px">
              <div>这个人啥都没写</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" align="left">
          <el-row type="flex" align="middle" style="height:100%">
            <el-col>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </template>
    <md-page style="margin-top:20px"></md-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mdPage from "@/components/Page/mdPage";
export default {
  name: "UserFans",
  components: { mdPage },
  provide(){
    return {
      page:this.page
    }
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        sex: "",
        desc: "",
        avatarUrl: "/logo.png",
        email: "xxx@qq.com",
        phone: "139xxxxx3529"
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
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
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'userUrlMap'
    ])
  },
  created(){
    this.breadcrumbList = this.$route.path.split('/').filter(item=>item)
  }
};
</script>

<style>
</style>
