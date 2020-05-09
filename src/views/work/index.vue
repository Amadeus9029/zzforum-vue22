<template>
    <div class="work">
        <el-row>
            <el-col>
                <nav-menu></nav-menu>
            </el-col>
        </el-row>
        <el-row
                style="min-height:calc(100vh - 61px);background:#f2f2f5"
                type="flex"
                justify="center"
                align="center"
        >
            <el-col
                    style="min-height:calc(100vh - 100px);
                    max-width:711px;margin:20px 200px;
                    background:white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
            >
                <!-- 最牛逼的组件 -->
               <niu-bi></niu-bi>
            </el-col>
        </el-row>
        <!--    <el-button @click="drawer = true"-->
        <!--               type="primary"-->
        <!--               style="position: fixed;-->
        <!--               display: inline-block;-->
        <!--               width: 50px;-->
        <!--               height: 100px;-->
        <!--               z-index: 999;top:200px;-->
        <!--               right:0;">-->
        <!--      点我-->
        <!--    </el-button>-->
        <el-drawer
                title="我是标题"
                direction="ltr"
                :close-on-press-escape="true"
                :visible.sync="drawer"
                size="20%"
                :modal="false"
                :with-header="false">
            <samp><kbd style="padding-right: 10px">上移</kbd><kbd><kbd>ctrl</kbd> + <kbd>alt</kbd> +
                <kbd></kbd>↑</kbd></samp>
            <el-divider></el-divider>
            <samp><kbd style="padding-right: 10px">下移</kbd><kbd><kbd>ctrl</kbd> + <kbd>alt</kbd> +
                <kbd></kbd>↓</kbd></samp>
        </el-drawer>
        <el-input v-model="AIText"></el-input>
        <el-input type="textarea" v-model="AIText" style="width: 400px"></el-input>
        <el-button @click.native="playAudio">提交</el-button>
        <!--      <el-menu style="text-align: left;z-index:1000" class="module-menu" ref="moduleMenu" v-show="moduleMenuVisible">-->
        <!--          <el-menu-item @click.native="addTimeLineItem"><span>添加模块节点</span></el-menu-item>-->
        <!--          <el-menu-item ><span>删除模块节点</span></el-menu-item>-->
        <!--          <el-divider></el-divider>-->
        <!--          <el-menu-item><span>标记</span></el-menu-item>-->
        <!--          <el-menu-item @click.native="showMoreOperation"><span>更多操作</span></el-menu-item>-->
        <!--      </el-menu>-->
<!--        <el-menu style="text-align: left;z-index:1000" class="module-content-menu" ref="moduleContentMenu"-->
<!--                 v-show="moduleContentMenuVisible">-->
<!--            <el-menu-item @click.native="addTimeLineContentItem"><span>添加内容节点</span></el-menu-item>-->
<!--            <el-menu-item><span>删除内容节点</span></el-menu-item>-->
<!--            <el-divider></el-divider>-->
<!--            <el-menu-item><span>标记</span></el-menu-item>-->
<!--            <el-menu-item @click.native="showMoreOperation"><span>更多操作</span></el-menu-item>-->
<!--        </el-menu>-->
    </div>
</template>

<script>
    import NavMenu from "@/components/NavMenu/NavMenu";
    import NiuBi from "./components/NiuBi"

    import {mapGetters, mapActions} from "vuex"
    import Vue from "vue"
    import $ from "jquery"

    export default {
        name: "Work",
        components: {
            NavMenu,
            NiuBi
        },
        data() {
            return {
                AIText: "",
                audioSrc: "",
                drawer: false,
            }
        },
        created() {
            // setTimeout(() => {
            //     L2Dwidget.on('*', (name) => {
            //     }).init({
            //         tagMode: true,
            //         debug: false,
            //         model: {jsonPath: '/live2dw/live2d-widget-model-z16/assets/z16.model.json'},
            //         display: {position: 'right', width: 150, height: 300},
            //         mobile: {show: true},
            //         log: false,
            //         react: {
            //             opacityDefault: 0.51, // 默认透明度
            //             opacityOnHover: 0.51, // 鼠标移上透明度
            //         },
            //         dialog: {
            //             enable: true,
            //             hitokoto:true,
            //             script: {
            //                 //每20s，显示一言（调用一言Api返回的句子）
            //                 'every idle 20s': '$hitokoto$',
            //                 //触摸到class='star'对象
            //                 'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
            //                 //触摸到身体
            //                 'tap body': '害羞⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
            //                 //触摸到头部
            //                 'tap face': '~~'
            //             }
            //         },
            //     })
            // }, 1000)
        },
        methods: {
            ...mapActions({
                speechAction: "speech/speechAction"
            }),
            showL2D(modelName){
                config.model.jsonPath = "/live2dw/live2d-widget-model-"+obj+"/assets/"+obj+".model.json";
                L2Dwidget.init(config);
            },
            showMoreOperation() {
                this.drawer = !this.drawer
            },
            playAudio() {
                this.speechAction({
                    speechText: this.AIText,
                    spd: "5",
                    pit: "5",
                    per: "4",
                    lang: "zh",
                    ctp: 1
                })
                .then(response => {
                    const snd = new Audio("data:audio/wav;base64," + response.data);
                    snd.play();
                })
                .catch(err => {
                    console.log(err)
                })
            },
            allowDrop(draggingNode, dropNode, type) {
                console.log("allowDrop")
                console.log(draggingNode)
                console.log(dropNode)
                console.log(type)
                return true
            },
            allowDrag(draggingNode) {
                console.log("allowDrag")
                console.log(draggingNode)
                return true
            },
        }
    };
</script>
<style lang="scss">
    .el-drawer {
        & .el-divider.el-divider--horizontal {
            margin-top: 5px !important;
            margin-bottom: 5px !important;
        }
    }
</style>
