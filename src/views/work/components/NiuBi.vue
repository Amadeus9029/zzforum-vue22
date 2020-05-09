<template>
    <div class="niu-bi">
        <el-row>
            <el-col>
                <div class="my-niubi-component"
                     style="padding:30px 55px 200px 55px;text-align: left">
                    <!--             @contextmenu.prevent="showModuleMenu($event)"-->
                    <!--标题-->
                    <el-input
                            class="edit-title"
                            autofocus
                            v-model="strategy.title"
                    ></el-input>
                    <el-divider></el-divider>
                    <!--          <div contenteditable="true" style="outline: none;text-align: left;padding-left: 15px"></div>-->
                    <el-timeline ref="timeline">
                        <el-timeline-item v-for="(activity, index) in strategy.content"
                                          @keydown.ctrl.alt.down.native="moveNodeDown($event,index)"
                                          @keydown.ctrl.alt.up.native="moveNodeUp($event,index)"
                                          placement="top"
                                          :key="index"
                                          :icon="activity.icon"
                                          :type="activity.type"
                                          :color="activity.color"
                                          :size="activity.size"
                                          :timestamp="activity.timestamp">
                            <!--                    <div style="text-align: left" @contextmenu.prevent="showModuleContentMenu($event)">-->
                            <!--                        <a class="content-link"-->
                            <!--                           :href="activity.link"-->
                            <!--                           target="_blank" contenteditable="true"-->
                            <!--                           style="outline: none;display: block;margin-bottom: 8px">{{activity.link}}</a>-->
                            <!--                        <div-->
                            <!--                                class="content-description"-->
                            <!--                                style="text-align: left;outline: none;margin-bottom: 8px"-->
                            <!--                                contenteditable="true"-->
                            <!--                                :ref="`divContent${index}`"-->
                            <!--                                v-html="activity.content"-->
                            <!--                        >-->
                            <!--                        </div>-->
                            <!--                    </div>-->
                            <!--                    <div style="text-align: left;position: relative;padding-left: 8px;margin-bottom: 8px;-->
                            <!--            display: block;-->
                            <!--            top: 0;-->
                            <!--            margin-left: -8px;-->
                            <!--            width: 100%;-->
                            <!--            min-height: 20px;-->
                            <!--            background: rgba(144, 147, 153, .08);-->
                            <!--            box-shadow: 0 0 2px rgba(144, 147, 153, .8) inset;-->
                            <!--            cursor: pointer;">-->
                            <!--                        <a href="" contenteditable="true" style="outline: none">123</a>-->
                            <!--                    </div>-->
                            <!--                    <div style="text-align: left;position: relative;padding-left: 8px;margin-bottom: 15px;-->
                            <!--            display: block;-->
                            <!--            top: 0;-->
                            <!--            margin-left: -8px;-->
                            <!--            width: 100%;-->
                            <!--            min-height: 20px;-->
                            <!--            background: rgba(144, 147, 153, .08);-->
                            <!--            box-shadow: 0 0 2px rgba(144, 147, 153, .8) inset;-->
                            <!--            cursor: pointer;">-->
                            <!--                        <span contenteditable="true" style="outline: none">123</span>-->
                            <!--                    </div>-->
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
        <el-row style="position:fixed;right: 150px;top:100px;display: flex;flex-direction: column;width: 100px">
            <el-col style="display: flex;justify-content: start;align-items: center;margin-bottom: 8px">
                <el-avatar v-if="user.avatar" :src="user.avatar.path"
                           style="width: 24px;height: 24px; margin-right: 8px;"></el-avatar>
                <span>{{user.username}}</span>
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
                background: white"></i>创建时间
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
                <span>更新时间</span>
            </el-col>
            <el-col>
                <template v-if="strategy.publish===0">
                    <el-button @click="publishStrategy" size="mini">发布</el-button>
                </template>
                <template v-else>
                    <el-button size="mini">撤销发布</el-button>
                    <el-button size="mini">更新发布</el-button>
                </template>
            </el-col>
        </el-row>
        <el-cascader-panel
                v-show="moduleMenuVisible"
                :options="moduleMenu"
                :style="moduleMenuStyle"
                @click="actModuleMenu"
        ></el-cascader-panel>
        <el-cascader-panel
                v-show="moduleContentMenuVisible"
                :options="moduleContentMenu"
                :style="moduleContentMenuStyle"
                @click="actModuleContentMenu"
        ></el-cascader-panel>
    </div>
</template>

<script>
    import Vue from "vue"
    import $ from "jquery"
    import InlineEditor from '@ckeditor/ckeditor5-build-inline';
    import {mapGetters, mapActions} from "vuex"
    import db from "@/utils/localstorage"

    export default {
        name: "NiuBi",
        components: {},
        data() {
            return {
                circleUrl: "/logo.png",
                strategy: {},
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
            this.getStrategyAction({id: this.$route.params.id}).then(response => {
                const data = response.data
                this.strategy = data
            }).catch(error => {
                console.log(error)
            })
            document.addEventListener("click", this.closeModuleMenuByDoc)
            document.addEventListener("click", this.closeModuleContentMenuByDoc)
            this.$nextTick(() => {
                document
                    .querySelectorAll('.el-timeline-item__timestamp')
                    .forEach(item => {
                        // item.setAttribute("contenteditable", true)
                        item.style.outline = "none"
                        item.addEventListener("click", () => {
                            item.classList.add("timestamp-active")
                        })
                        item.addEventListener("contextmenu", (event) => {
                            event.preventDefault()
                            this.showModuleContentMenu(event)
                        })
                    })
                document
                    .querySelectorAll('.el-timeline-item__node')
                    .forEach((item, index) => {
                        item.setAttribute("data-index", index)
                        item.addEventListener("click", (event) => {
                            this.activeModuleMenuIndex = index
                            this.showModuleMenu(event)
                        })
                        item.addEventListener("mouseover", () => {
                            console.log(item.getAttribute("data-index"))
                            item.classList.add("node-active")
                        })
                        item.addEventListener("mouseout", () => {
                            item.classList.remove("node-active")
                        })
                    })
            })
        },
        mounted() {
            //关闭页面时调用
            window.onunload = (e) => {
                this.saveStrategy()
            }
            //刷新页面时调用
            window.onbeforeunload = (e) => {
                this.saveStrategy()
            };
        },
        watch: {
            activities: {
                deep: true,
                handler(oldValue, newValue) {
                    this.$nextTick(() => {
                        document
                            .querySelectorAll('.el-timeline-item__timestamp')
                            .forEach((item, index) => {
                                item.setAttribute("contenteditable", true)
                                item.setAttribute("data-index", index)
                                item.style.outline = "none"
                                item.addEventListener("contextmenu", (event) => {
                                    event.preventDefault()
                                    this.showModuleContentMenu(event)
                                })
                            })
                        document
                            .querySelectorAll('.el-timeline-item__node')
                            .forEach((item, index) => {
                                item.setAttribute("data-index", index)
                                // item.addEventListener("click", (event) => {
                                //     this.activeModuleMenuIndex = index
                                //     this.showModuleMenu(event)
                                // })
                                item.addEventListener("mouseover", () => {
                                    console.log(item.getAttribute("data-index"))
                                    item.classList.add("node-active")
                                })
                                item.addEventListener("mouseout", () => {
                                    item.classList.remove("node-active")
                                })
                            })
                    })
                }
            }
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
                publishStrategyAction: 'publishStrategy/addPublishStrategyAction'
            }),
            async saveStrategy() {
                console.log("save")
                db.save("strategy",this.strategy)
                console.log(this.strategy)
                await this.updateStrategyAction(this.strategy)
            },
            addTimeLineItem() {
                let timeline = {content: '', timestamp: '', link: '', size: 'large', icon: 'el-icon-more'}
                this.strategy.content.splice(this.activeModuleMenuIndex + 1, 0, timeline)
            },
            nodeIn(e) {
                console.log(item)
                item.classList.add("node-active")
            },
            nodeOut(e) {
                console.log(item)
                item.classList.remove("node-active")
            },
            moveNodeUp(event, index) {
                if (index > 0) {
                    let range = window.getSelection();
                    range.collapse(this.$refs[`divContent${index - 1}`][0], 0)
                    let temp = this.strategy.content[index - 1];
                    Vue.set(this.strategy.content, index - 1, this.strategy.content[index])
                    Vue.set(this.strategy.content, index, temp)
                }
            },
            moveNodeDown(event, index) {
                if (index < this.activities.length - 1) {
                    let range = window.getSelection()
                    range.collapse(this.$refs[`divContent${index + 1}`][0], 0)
                    let temp = this.activities[index + 1]
                    Vue.set(this.activities, index + 1, this.activities[index])
                    Vue.set(this.activities, index, temp)
                }
            },
            showModuleMenu(event) {
                this.moduleMenuStyle.left = event.clientX + "px"
                this.moduleMenuStyle.top = event.clientY + "px"
                this.moduleContentMenuVisible = false
                this.moduleMenuVisible = true
            },
            showModuleContentMenu(event) {
                this.moduleContentMenuStyle.left = event.clientX + "px"
                this.moduleContentMenuStyle.top = event.clientY + "px"
                this.moduleMenuVisible = false
                this.moduleContentMenuVisible = true
            },
            actModuleMenu(callback) {
                switch (callback[callback.length - 1]) {
                    case "MainModule":
                        this.moduleMenuVisible = false
                        break;
                    case "removeModule":
                        this.moduleMenuVisible = false
                        break;
                    default:
                        break;
                }
            },
            actModuleContentMenu(callback) {
                switch (callback[callback.length - 1]) {
                    case "MainModule":
                        this.moduleMenuVisible = false
                        break;
                    case "removeModule":
                        this.moduleMenuVisible = false
                        break;
                    default:
                        break;
                }
            },
            closeModuleMenuByDoc(event) {
                if (!event.path[0].classList.contains("el-timeline-item__icon")
                    && !event.target.classList.contains("el-cascader-node__label")) {
                    this.moduleMenuVisible = false
                }
            },
            closeModuleContentMenuByDoc(event) {
                if (!event.path[0].classList.contains("el-timeline-item")
                    && !event.target.classList.contains("el-cascader-node__label")) {
                    this.moduleContentMenuVisible = false
                }
            },
            publishStrategy() {
                const strategy = {
                    userId: this.user.id,
                    strategyId: this.strategy.id,
                    title: this.strategy.title,
                    content: this.strategy.content,
                }
                this.publishStrategyAction(strategy).then(response => {
                    console.log(response)
                    this.$message({
                        type: "success",
                        message: "发布成功"
                    })

                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>
<style lang="scss">
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