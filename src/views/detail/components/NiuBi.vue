<template>
    <div class="niu-bi">
        <el-row>
            <el-col>
                <div class="my-niubi-component"
                     style="padding:30px 55px 200px 55px;text-align: left">
                    <!--标题-->
                    <span
                            class="edit-title"
                            v-text="strategy.strategy.title"
                    ></span>
                    <el-divider></el-divider>
                    <el-timeline ref="timeline">
                        <el-timeline-item v-for="(activity, index) in strategy.strategy.content"
                                          @keydown.ctrl.alt.down.native="moveNodeDown($event,index)"
                                          @keydown.ctrl.alt.up.native="moveNodeUp($event,index)"
                                          placement="top"
                                          :key="index"
                                          :icon="activity.icon"
                                          :type="activity.type"
                                          :color="activity.color"
                                          :size="activity.size"
                                          :timestamp="activity.timestamp">
                            <el-divider content-position="left">资源链接</el-divider>
                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                            <el-divider content-position="left">资源链接</el-divider>
                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                            <el-divider></el-divider>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Vue from "vue"
    import $ from "jquery"
    import InlineEditor from '@ckeditor/ckeditor5-build-inline';
    import {mapGetters,mapActions} from "vuex"

    export default {
        name: "NiuBi",
        components: {},
        inject: {
            strategy: {
                default: () => {
                }
            }
        },
        data() {
            return {
                circleUrl:"/logo.png",
                editor: InlineEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                },
                moduleMenuVisible: false,
                moduleContentMenuVisible: false,
                editTitle: "",
                editContent: "<a href='www.baidu.com'>百度</a>",
                divContent: '<a href="www.baidu.com">百度</a>',
                activeModuleMenuIndex: 0,
                activeModuleContentMenuIndex: 0,
                moduleMenu: [
                    {
                        value: 'addModule',
                        label: '添加模块',
                        children: [{
                            value: "MainModule",
                            label: '主要模块'
                        }]
                    },
                    {
                        value: "updateModule",
                        label: '修改模块',
                        children: [{
                            value: "MainModule",
                            label: '主要模块'
                        }]
                    },
                    {
                        value: "removeModule",
                        label: '删除模块'
                    },
                    {
                        value: "changeNodeColor",
                        label: '节点颜色',
                        children: [{
                            value: "redNode",
                            label: '红色'
                        },
                            {
                                value: "blueNode",
                                label: '蓝色'
                            },
                            {
                                value: "yellowNode",
                                label: '黄色'
                            },
                        ]
                    }
                ],
                moduleMenuStyle: {
                    "position": "fixed",
                    "background": "white",
                    "z-index": 999
                },
                moduleContentMenu: [
                    {
                        value: "addContent",
                        label: "添加内容",
                        children: [
                            {value: "link", label: "资源链接"},
                            {value: "description", label: "资源描述"}
                        ]
                    },
                    {
                        value: "updateContent",
                        label: "更新内容",
                        children: [{value: "link", label: "资源链接"},
                            {value: "description", label: "资源描述"}]
                    },
                    {
                        value: "removeContent",
                        label: "删除内容",
                    },
                ],
                moduleContentMenuStyle: {
                    "position": "fixed",
                    "background": "white",
                    "z-index": 999
                },
                activities: [
                    {
                        link: "",
                        content: '',
                        timestamp: '7',
                        size: 'large',
                        type: 'primary',
                        icon: 'el-icon-bottom-right',
                        color: '',
                        nodeActive: false
                    },
                    {
                        link: "",
                        content: '',
                        timestamp: '7',
                        size: 'large',
                        type: 'primary',
                        icon: 'el-icon-bottom-right',
                        color: '',
                        nodeActive: false
                    }
                ]
            }
        },
        created() {
            console.log(this.strategy)
        },
        computed: {
          ...mapGetters([
              'user'
          ])
        },
        methods: {
            ...mapActions({
                getStrategyAction: 'strategy/getStrategyAction',
                updateStrategyAction: 'strategy/putStrategyAction',
                publishStrategyAction: 'publishStrategy/addPublishStrategyAction',
                addCommentAction: 'commentStrategy/addCommentStrategyAction',
                getCommentAction: 'commentStrategy/getCommentStrategyAction'
            }),
            getComment(){

            },
            addComment(){
                this.addCommentAction().then(response=>{

                }).catch(error=>{
                    console.log(error)
                })
            }
        }
    }
</script>
<style lang="scss">
    .my-niubi-component {
        & .edit-title {
            font-size: 18px !important;
            font-weight: bolder;
        }

        & .el-input__inner {
            font-size: 14px;
            border: none
        }

        & .el-divider.el-divider--horizontal {
            margin-top: 5px;
            margin-bottom: 15px;
        }
    }

    .content-link:empty::after {
        content: "此处填写资源超链接";
        color: #909399
    }

    .content-description:empty::after {
        content: "此处填写相关描述";
        color: #909399
    }

    .el-timeline {
        padding-left: 0 !important;
    }

    /*timeline-item__node*/
    .el-timeline-item__node {
        & i {
            position: relative;
            z-index: 198;
            cursor: pointer !important;
        }

        z-index: 198;
    }

    .el-timeline-item__node.node-active {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

        &::after {
            content: "";
            position: absolute;
            display: block;
            width: 21px;
            height: 21px;
            background: rgba(144, 147, 153, .08);
            border-radius: 10%;
            box-shadow: 0 0 2px rgba(144, 147, 153, .8) inset;
            cursor: pointer;
            z-index: 190;
        }
    }

    /*timeline-item__timestamp*/
    .el-timeline-item__timestamp {
        text-align: left;
    }

    .el-timeline-item__timestamp:empty::before {
        content: "此处填写完成期限";
        color: #909399
    }

    .el-timeline-item__timestamp.timestamp-active {
        /*&::after {
            content: "";
            position: absolute;
            display: block;
            top: 0;
            margin-left: -8px;
            width: 100%;
            min-height: 20px;
            background: rgba(144, 147, 153, .08);
            box-shadow: 0 0 2px rgba(144, 147, 153, .8) inset;
            cursor: pointer;
            z-index: 190;
        }*/
    }

    .module-menu.el-menu {
        width: 150px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

        & .el-menu-item {
            height: 30px !important;
            line-height: 30px !important;

            & span {
                padding-left: 5px;
            }
        }

        & .el-divider.el-divider--horizontal {
            margin-top: 5px !important;
            margin-bottom: 5px !important;
        }
    }

    .module-content-menu.el-menu {
        width: 150px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

        & .el-menu-item {
            height: 30px !important;
            line-height: 30px !important;

            & span {
                padding-left: 5px;
            }
        }

        & .el-divider.el-divider--horizontal {
            margin-top: 5px !important;
            margin-bottom: 5px !important;
        }
    }
</style>