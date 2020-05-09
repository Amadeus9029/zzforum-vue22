<template>
    <div class="detail">
        <el-backtop></el-backtop>
        <el-row>
            <el-col>
                <nav-menu></nav-menu>
            </el-col>
        </el-row>
        <el-row
                style="min-height:calc(100vh - 61px);background:#f2f2f5"
                type="flex"
                justify="center"
                align="center">
            <el-col
                    style="min-height:calc(100vh - 100px);
                max-width:711px;
                margin:20px 200px;
                background:white;
                box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                <!--                <div class="my-niubi-component"-->
                <!--                     style="padding:30px 55px 200px 55px;text-align: left">-->
                <!--                </div>-->
                <niu-bi></niu-bi>
            </el-col>
        </el-row>
        <el-row style="position:fixed;right: 150px;top:100px;display: flex;flex-direction: column;width: 100px">
            <el-col style="display: flex;justify-content: start;align-items: center;margin-bottom: 8px"
                    v-if="publishStrategy.strategy">
                <el-avatar
                        v-if="publishStrategy.strategy&&publishStrategy.strategy.zzUser"
                        :src="publishStrategy.strategy.zzUser.avatar.path"
                        style="width: 24px;height: 24px; margin-right: 8px;"></el-avatar>
                <span
                        v-if="publishStrategy.strategy.zzUser&&publishStrategy.strategy.zzUser.username"
                >{{publishStrategy.strategy.zzUser.username}}</span>
            </el-col>
            <el-col style="display:flex;justify-content: start;align-items: center;margin-bottom: 8px">
                <i class="el-icon-view"
                   style="width:24px;height:24px;
                color:#909399;
                line-height: 24px;
                border: solid 1px #acacac;
                border-radius: 50%;
                box-shadow: 0 0 1px #909399 inset;
                margin-right: 8px;
                background: white"></i>观看数
            </el-col>
            <el-col style="display: flex;justify-content: start;align-items: center">
                <i class="el-icon-time"
                   style="width:24px;height:24px;
                color:#909399;
                line-height: 24px;
                 margin-right: 8px;
                border: solid 1px #acacac;
                border-radius: 50%;
                box-shadow: 0 0 1px #909399 inset;
                background: white"></i>
                <span>时间</span>
            </el-col>
        </el-row>
        <el-row style="position:fixed;right: 0;top:50%;">
            <el-col style="display: flex;flex-direction: column">
                <el-tooltip class="item" effect="dark" content="评论" placement="left">
                    <el-button @click="drawer=true"><i class="el-icon-s-comment"></i><span>{{comments.length}}</span>
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="收藏数" placement="left">
                    <el-button><i class="el-icon-star-on"></i><span>123</span></el-button>
                </el-tooltip>
            </el-col>
            <!--评论-->
            <el-drawer
                    title="评论"
                    direction="ltr"
                    :close-on-press-escape="true"
                    :visible.sync="drawer"
                    size="30%"
                    :modal="false"
                    :with-header="true"
                    style="outline: none;z-index: 999;">
                <el-divider></el-divider>
                <el-row style="margin: 0 15px ">
                    <el-col>
                        <!--                        <div contenteditable="true"-->
                        <!--                             v-html="commentContent"-->
                        <!--                             @input="changeComment($event)"-->
                        <!--                             @focus="isCommentChange=false"-->
                        <!--                             @blur="blurComment($event)"-->
                        <!--                             style="outline: none;-->
                        <!--                             overflow-y: scroll;-->
                        <!--                            text-align: left;-->
                        <!--                            height: 100px;-->
                        <!--                            border: solid 1px #909399;-->
                        <!--                            margin-bottom: 8px"></div>-->
                        <el-input
                                type="textarea"
                                placeholder="请输入评论内容"
                                v-model="commentContent"
                                maxlength="30"
                                show-word-limit
                                style="margin-bottom: 8px"
                        >
                        </el-input>
                        <el-button @click="addComment" size="mini" style="float: right">发布评论</el-button>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <!--用户评论-->
                <el-row style="display: flex;flex-direction: column;flex-grow: 1;align-items: center;">
                    <el-col style="flex-grow: 1">
                        <template v-for="(item,index) in pageComments">
                            <el-row type="flex" style="margin-bottom: 10px">
                                <el-col style="padding-bottom: 5px;
                                display: flex;flex-direction: column;
                                align-items: center;min-width: 80px;max-width: 80px;"
                                >
                                    <el-avatar v-if="item.zzUserAvatar"
                                               :src="item.zzUserAvatar.path"
                                               style="margin-bottom: 15px"></el-avatar>
                                    <el-button size="mini" style="width:64px">关注</el-button>
                                </el-col>
                                <el-col style="text-align: left;vertical-align: top;font-size: 14px">
                                    <span v-if="item.zzUser">{{item.zzUser.username}}</span>
                                    <p>{{item.content}}</p>
                                    <el-row type="flex" justify-content="space-between">
                                        <el-col>{{item.updateTime}}</el-col>
<!--                                        <el-col style="text-align: right;padding-right: 10px"><i-->
<!--                                                class="el-icon-more"></i></el-col>-->
                                    </el-row>
                                </el-col>
                            </el-row>
                        </template>
                    </el-col>
                    <el-col style="flex-grow: 0.2">
                        <sm-page></sm-page>
                    </el-col>
                </el-row>
            </el-drawer>
        </el-row>
    </div>
</template>

<script>
    import smPage from "@/components/Page/smPage";
    import NavMenu from "@/components/NavMenu/NavMenu"
    import NiuBi from "./components/NiuBi";
    import {mapGetters, mapActions} from "vuex"

    export default {
        name: "detail",
        components: {
            NavMenu,
            smPage,
            NiuBi
        },
        provide() {
            return {
                page: this.page,
                strategy: this.publishStrategy,
            }
        },
        data() {
            return {
                commentContent: "",
                comments: [],
                drawer: false,
                circleUrl: "/logo.png",
                publishStrategy: {strategy: {}},
                page: {
                    currentPage: 1,
                    total: 6,
                    size: 5,
                    hideSingle: true
                },
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ]),
            pageComments() {
                return this.comments
                    .slice((this.page.currentPage - 1) * this.page.size, this.page.size * this.page.currentPage)
            }
        },
        methods: {
            ...mapActions({
                getDetailPublishStrategyAction: "publishStrategy/getDetailPublishStrategyAction",
                addCommentStrategyAction: "commentStrategy/addCommentStrategyAction"
            }),
            getPublishStrategy() {
                this.getDetailPublishStrategyAction({id: this.$route.params.id}).then(response => {
                    const data = response.data
                    this.publishStrategy.strategy = data
                    this.comments = this.publishStrategy.strategy.comments
                    this.page.total = this.comments.length
                    this.strategy = this.publishStrategy
                }).catch(error => {
                    console.log(error)
                })
            },
            addComment() {
                const comment = {
                    userId: this.user.id,
                    publishStrategyId: this.publishStrategy.strategy.id,
                    content: this.commentContent
                }
                this.addCommentStrategyAction(comment).then(response => {
                    const data = response.data
                    this.commentContent = ""
                    data.zzUser = this.user
                    data.zzUserAvatar = this.user.avatar
                    this.comments.unshift(data)
                    this.page.total += 1
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted() {

        },
        created() {
            this.getPublishStrategy()
        }
    }
</script>

<style scoped lang="scss">
    .my-niubi-component {
        & .edit-title {
            & .el-input__inner {
                font-size: 18px !important;
                font-weight: bolder;
            }
        }

        & .el-input__inner {
            font-size: 14px;
            border: none
        }

        & .el-divider.el-divider--horizontal {
            margin-top: 5px !important;
            margin-bottom: 10px !important;
        }
    }

</style>
<style>
    :focus {
        outline: 0;
    }

    #el-drawer__title {
        margin-bottom: 0 !important;
    }

    .el-drawer__header {
        margin-bottom: 0;
    }

    .el-drawer__body {
        display: flex;
        flex-direction: column;
    }
</style>
