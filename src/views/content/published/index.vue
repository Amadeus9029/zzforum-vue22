<template>
    <div class="content-published">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;margin-top: 20px">
            <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>我的已发布</el-breadcrumb-item>
        </el-breadcrumb>
        <template v-for="(item,index) in strategy" >
            <el-row v-loading="loading">
                <el-col style="padding-bottom: 5px">
                    <router-link tag="el-link" :to="{path:`/detail/${item.id}`,params:item.id}" style="float:left;font-size: 18px">{{item.title}}
                    </router-link>
                </el-col>
                <el-col>
                    <span style="float: left;font-size: 14px;color: #909399">{{item.content}}</span>
                </el-col>
                <el-col style="padding-top: 20px;display: flex; justify-content: space-between;">
                            <span style="display: flex;align-items: center">
                                 <el-avatar shape="circle" :size="32" :src="circleUrl" style="margin-right: 5px"></el-avatar>
                                 <span style="display:inline-block;vertical-align: center;font-size: 14px;margin-right: 5px;">{{item.zzuser.username}}</span>
                            </span>
                    <ul class="right-message" style="display: flex;align-items: center;list-style: none">
                        <li><i class="el-icon-view" style="font-size: 14px;color:#909399"></i><span
                                style="font-size: 14px;color:#909399">456</span></li>
                        <li><i class="el-icon-star-on" style="font-size: 14px;color:#909399"></i><span
                                style="font-size: 14px;color:#909399">456</span></li>
                        <li><i class="el-icon-s-comment" style="font-size: 14px;color:#909399"></i><span
                                style="font-size: 14px;color:#909399">123</span></li>
                    </ul>
                </el-col>
            </el-row>
            <el-divider></el-divider>
        </template>
        <sm-page style="margin-top:20px"></sm-page>
    </div>
</template>

<script>
    import smPage from '@/components/Page/smPage'
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: "ContentPublished",
        components:{smPage},
        provide(){
            return {
                page:this.page
            }
        },
        data(){
          return {
              loading:false,
              circleUrl:'/logo.png',
              page:{
                  currentPage:1,
                  total:6,
                  size:5,
                  sizes:[5,10,15],
                  hideSingle:true
              },
              strategy:{},
              value: "",
          }
        },
        computed:{
            ...mapGetters([
                "publishedStrategy",
                "user"
            ])
        },
        methods:{
            ...mapActions({
                getPublishedStrategyAction:'publishStrategy/getPublishStrategyAction',
            }),
            getPublishedStrategy(){
                this.getPublishedStrategyAction({id:this.user.id,currentPage:this.page.currentPage}).then((response)=>{
                    const data = response.data
                    this.strategy = data.records
                    console.log(this.strategy)
                })
            },
        },
        created(){
            this.getPublishedStrategy()
        }
    }
</script>

<style scoped>

</style>