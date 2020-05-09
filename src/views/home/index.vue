<template>
    <div class="home">
        <el-backtop></el-backtop>
        <el-row>
            <el-col>
                <nav-menu></nav-menu>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <router-view></router-view>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <index-carousel></index-carousel>
            </el-col>
        </el-row>
        <el-container>
            <el-row class="main-content" style="margin:auto;" :style="contentStyle">
                <template v-if="activeTopTag">
                    <el-col class="top-tag" style="text-align: left;margin-top: 15px">
                        <template v-for="(item,i) in tags">
                            <el-button
                                    :class="{'button-active':i === activeButtonIndex}"
                                    size="small"
                                    @click.native="activeButton(i)">{{item}}</el-button>
                        </template>
                        <span style="margin: 5px 3px;font-size: 14px;display: inline-block">更多></span>
                    </el-col>
                </template>
                <el-col class="left-document" :md="16" :xs="24">
                    <div style="padding-top: 15px;display: flex;place-content:center space-between">
                        <span style="align-self: flex-end">{{tags[activeButtonIndex]}}</span>
                        <el-input style="width: 200px" suffix-icon="el-icon-search" size="mini"
                                  placeholder="输入搜索关键字"></el-input>
                    </div>
                    <el-divider></el-divider>
                    <template v-for="(item,index) in publishStrategy.strategy" >
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
                                 <el-avatar shape="circle" :size="32" :src="item.zzUser.avatar.path" style="margin-right: 5px"></el-avatar>
                                 <span style="display:inline-block;vertical-align: center;font-size: 14px;margin-right: 5px;">{{item.zzUser.username}}</span>
<!--                                  <span style="display:inline-block;vertical-align: center;font-size: 14px;margin-right: 5px;">{{item.updateTime}}</span>-->
                            </span>
                                <ul class="right-message" style="display: flex;align-items: center;list-style: none">
                                    <li><i class="el-icon-view" style="font-size: 14px;color:#909399"></i><span
                                            style="font-size: 14px;color:#909399">{{Math.ceil(Math.random()*400)}}</span></li>
                                    <li><i class="el-icon-star-on" style="font-size: 14px;color:#909399"></i><span
                                            style="font-size: 14px;color:#909399">{{Math.ceil(Math.random()*100)}}</span></li>
                                    <li v-if="item.comments"><i class="el-icon-s-comment" style="font-size: 14px;color:#909399"></i><span
                                            style="font-size: 14px;color:#909399">{{Math.ceil(Math.random()*30)}}</span></li>
                                </ul>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                    </template>
                    <template v-if="showMdPage">
                        <md-page style="margin-top:20px"></md-page>
                    </template>
                    <template v-if="showSmPage">
                        <sm-page style="margin-top:20px"></sm-page>
                    </template>
                </el-col>
                <template v-if="!hideRightTag">
                    <el-col class="right-tag" :md="{span:7,offset:1}" :xs="24">
                        <div style="padding-top: 15px;display: flex;place-content: center space-between;">
                            <span style="align-self: flex-end;height: 28px;">标签</span>
                        </div>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col style="text-align: left">
                                <template v-for="(item,i) in tags">
                                    <el-button
                                            :class="{'button-active':i === activeButtonIndex}"
                                            size="small"
                                            round
                                            @click.native="activeButton(i)">{{item}}</el-button>
                                </template>
                                <span style="margin: 5px 3px;font-size: 14px;display: inline-block">更多></span>
                            </el-col>
                        </el-row>
                    </el-col>
                </template>
            </el-row>
        </el-container>
    </div>
</template>
<script>
    import NavMenu from "@/components/NavMenu/NavMenu";
    import IndexCarousel from "@/components/Carousel/IndexCarousel";
    import mdPage from "@/components/Page/mdPage";
    import smPage from "@/components/Page/smPage";
    import {mapMutations, mapGetters,mapActions} from "vuex";
    import Vue from "vue";

    export default {
        name: "home",
        components: {NavMenu, IndexCarousel, mdPage,smPage},
        provide(){
            return {
                page:this.page,
                strategy:this.publishStrategy
            }
        },
        data() {
            return {
                loading:true,
                publishStrategy:{strategy:{}},
                screenWidth: 0,
                screenHeight: 0,
                contentStyle: {width: '90%'},
                circleUrl: "/logo.png",
                tags:["推荐","标签二","全部"],
                activeButtonIndex:0,
                activeTopTag:false,
                hideRightTag:false,
                showMdPage:true,
                showSmPage:false,
                page:{
                    currentPage:1,
                    total:6,
                    size:5,
                    sizes:[5,10,15],
                    hideSingle:true
                }
            };
        },
        watch:{
          page:{
              deep: true,
              handler(oldValue,newValue){
                  const page = {currentPage:newValue.currentPage,pageSize:newValue.size}
                  this.getPublishStrategyAction({currentPage:this.page.currentPage,pageSize:this.page.size}).then(response=>{
                      const data = response.data
                      this.publishStrategy.strategy = data.records
                  }).catch(error=>{
                      console.log(error)
                  })
              }
          }
        },
        computed: {
            ...mapGetters({
                p_router: "permission_routers"
            }),
        },
        methods: {
            ...mapMutations({
                add: "increment"
            }),
            ...mapActions({
                'getPublishStrategyAction':'publishStrategy/getPublishStrategyAction'
            }),
            activeButton(index){
                this.activeButtonIndex = index
            }
        },
        mounted() {
            this.screenWidth = document.body.clientWidth;
            this.screenHeight = document.body.clientHeight;
            if (window.innerWidth <= 992) {
                this.showMdPage = false
                this.showSmPage = true
                this.activeTopTag = true
                this.hideRightTag = true
                this.contentStyle.width = "98%"
            } else {
                this.showMdPage = true
                this.showSmPage = false
                this.activeTopTag = false
                this.hideRightTag = false
                this.contentStyle.width = "90%"
            }
            window.onresize = () => {
                return (() => {
                    if (window.innerWidth <= 992) {
                        this.showMdPage = false
                        this.showSmPage = true
                        this.activeTopTag = true
                        this.hideRightTag = true
                        this.contentStyle.width = "98%"
                    } else {
                        this.showMdPage = true
                        this.showSmPage = false
                        this.activeTopTag = false
                        this.hideRightTag = false
                        this.contentStyle.width = "90%"
                    }
                    this.screenWidth = document.body.clientWidth;
                    this.screenHeight = document.body.clientHeight;
                })();
            };
        },
        created() {
            setTimeout(()=>{
                this.loading = false
            },500)
            this.getPublishStrategyAction({currentPage:this.page.currentPage,pageSize:this.page.size}).then(response=>{
                const data = response.data
                this.publishStrategy.strategy = data.records
            }).catch(error=>{
                console.log(error)
            })
        },
    };
</script>
<style scoped lang="scss">
    .right-message {
        & li {
            padding-right: 8px;
        }
    }
    .top-tag{
        & button{
            margin: 5px 3px;
            border:solid 1px #909399;
            cursor: pointer;
        }
        & button:hover{
            color:white;
            background: #909399;
        }
        & .el-button:focus{
            color:white !important;
            background: #909399 !important;
        }
    }
    .right-tag{
        & button{
            margin: 5px 3px;
            border:solid 1px #909399;
            cursor: pointer;
        }
        & button:hover{
            color:white;
            background: #909399;
        }
        & .el-button:focus{
            color:white !important;
            background: #909399 !important;
        }
    }
    .button-active{
        color:white;
        background: #909399;
    }
</style>
<style>
    #loading-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: #ccc;
        z-index: 999;
    }

    .el-divider.el-divider--horizontal {
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>
