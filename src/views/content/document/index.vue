<template>
    <div class="content-document">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;margin-top: 20px">
            <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,i) in breadcrumbList"
                                @click.native="jumpPathByNav($event,i)"
                                :style='{"cursor":"pointer"}'
                                :key="i">{{item}}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row style="margin-top: 20px;" v-loading="loading">
            <el-col class="userSource"
                    :span="4" v-for="(item,i) in currentResource"
                    :key="i"
                    style="min-width: 172px">
                <el-card shadow="hover"
                         @mouseover.native="toolsIn($event)"
                         @mouseout.native="toolsOut($event)"
                         @click.native="fileMenu($event,i)"
                         style="min-width: 150px;max-height:150px;width:100%">
                    <el-popover
                            placement="bottom"
                            width="150"
                            trigger="manual"
                            v-model="item.visible">
                        <el-menu style="border:none">
                            <el-menu-item height="30px" @click.native="showDeleteDialog(item,i)"><i
                                    class="el-icon-delete-solid"></i><span>删除</span></el-menu-item>
                            <el-menu-item @click.native="renameFile($event,item,i)"><i class="el-icon-edit"
                                                                                       style="color: #909399"></i><span>重命名</span>
                            </el-menu-item>
                            <el-divider></el-divider>
                            <el-menu-item><i class="el-icon-s-flag"></i><span>标记</span></el-menu-item>
                            <template v-if="item.icon==='el-icon-document'">
                                <el-menu-item @click.native="publishStrategy(item,i)"><i class="el-icon-s-flag"></i><span>发布</span></el-menu-item>
                            </template>
                        </el-menu>
                        <i class="el-icon-s-tools"
                           slot="reference"
                           :data-index="'el-icon-s-tools'"
                           style="float:right;color:rgb(204,204,204)"></i>
                    </el-popover>
                    <div @click="jumpPathByDoc($event,item)">
                        <template v-if="item.icon==='el-icon-document'">
                            <i :class="item.icon"
                               :data-index="item.icon"
                               :data-id="item.zzStrategy.id"
                               style="font-size:50px"></i>
                        </template>
                        <template v-else>
                            <i :class="item.icon"
                               :data-index="item.icon"
                               :data-id="item.id"
                               style="font-size:50px"></i>
                        </template>
                    </div>
                    <span style="display:inline-block;margin-top:15px">{{item.name}}</span>
                </el-card>
            </el-col>
        </el-row>
        <delete-file-dialog></delete-file-dialog>
        <rename-file-dialog></rename-file-dialog>
    </div>
</template>

<script>
    import DeleteFileDialog from "../components/dialog/DeleteFileDialog";
    import RenameFileDialog from "../components/dialog/RenameFileDialog";
    import {mapState, mapGetters, mapActions} from "vuex";

    export default {
        name: "ContentDocument",
        components: {
            DeleteFileDialog,
            RenameFileDialog
        },
        provide() {
            return {
                delDialog: this.deleteDialog,
                reDialog: this.renameDialog,
            }
        },
        data() {
            return {
                loading: false,
                currentPath: this.currentResourcePath,
                breadcrumbList: this.currentResourcePath != null ? this.currentResourcePath.split('/') : [],
                deleteDialog: {visible: false, file: {}, index: 0},
                renameDialog: {visible: false, file: {}, index: 0}
            }
        },
        computed: {
            ...mapGetters([
                "resource",
                "currentResource",
                "currentResourcePath",
                "sourceArray",
                "user"
            ])
        },
        methods: {
            ...mapActions({
                getResourceAction: 'resource/getResourceAction',
                refreshResourceAction: 'resource/refreshResourceAction',
                addPublishStrategyAction: 'publishStrategy/addPublishStrategyAction'
            }),
            getResource() {
                this.getResourceAction().then((response) => {
                    this.breadcrumbList = this.currentResourcePath.split('/')
                    this.$store.commit("resource/SET_EACH_CURRENT_RESOURCE_MEMBER", {member: "visible", value: false})
                })
            },
            async jumpPathByNav(event, i) {
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                }, 350)
                if (i === 0) {
                    await this.getResource()
                    this.$store.commit("resource/SET_CURRENT_RESOURCE", this.sourceArray[i])
                    this.$store.commit("resource/SET_SOURCE_ARRAY", this.sourceArray.slice(0, i + 1))
                    this.$store.commit("resource/SET_CURRENT_RESOURCE_PATH", "我的文档")
                    this.breadcrumbList = ["我的文档"]
                } else if (i + 1 < this.sourceArray.length) {
                    await this.refreshResourceAction({id:this.sourceArray[i].id}).then(response=>{
                        this.$store.commit("resource/SET_SOURCE_ARRAY", this.sourceArray.slice(0, i))
                        this.$store.commit("resource/ADD_SOURCE_ARRAY", response.data)
                    }).catch(error=>{
                        console.log(error)
                    })
                    this.$store.commit("resource/SET_CURRENT_RESOURCE", this.sourceArray[i].children)
                    this.$store.commit("resource/SET_CURRENT_RESOURCE_PATH", this.sourceArray[i].path + '/' + this.sourceArray[i].name)
                    this.breadcrumbList = this.currentResourcePath.split('/')
                }
            },
            jumpPathByDoc(event, source) {
                let dom = event.target
                let index = dom.getAttribute('data-index')
                if (index === "el-icon-document") {
                    let id = dom.getAttribute('data-id')
                    let routeUrl = this.$router.resolve({
                        path: "/work/"+id,
                        params: {id: id}
                    });
                    window.open(routeUrl.href, '_blank');
                } else {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                    }, 350)
                    if (index === "el-icon-folder") {
                        this.$store.commit("resource/SET_CURRENT_RESOURCE", source.children)
                        if(!source.children) source.children = []
                        this.$store.commit("resource/ADD_SOURCE_ARRAY", source)
                        this.$store.commit("resource/SET_CURRENT_RESOURCE_PATH", source.path + '/' + source.name)
                        this.breadcrumbList.push(source.name)
                    }
                }
            },
            toolsIn(event) {
                let dom = event.target
                let index = dom.getAttribute('data-index')
                if (index === 'el-icon-s-tools') {
                    dom.style.color = "#000"
                }
            },
            toolsOut(event) {
                let dom = event.target
                let index = dom.getAttribute('data-index')
                if (index === 'el-icon-s-tools') {
                    dom.style.color = "#ccc"
                }
            },
            fileMenu(event, i) {
                let dom = event.target
                let index = dom.getAttribute('data-index')
                if (index === 'el-icon-s-tools') {
                    this.$store.commit("resource/SET_EACH_CURRENT_RESOURCE_MEMBER"
                        , {member: "visible", value: false})
                    this.$store.commit("resource/SET_SOME_CURRENT_RESOURCE_MEMBER"
                        , {index: i, member: "visible", value: !this.currentResource[i].visible})
                }
            },
            closeFileMenu(event) {
                let dom = event.target
                let index = dom.getAttribute('data-index')
                if (index !== 'el-icon-s-tools') {
                    this.$store.commit("resource/SET_EACH_CURRENT_RESOURCE_MEMBER"
                        , {member: "visible", value: false})
                }
            },
            showDeleteDialog(file, index) {
                this.deleteDialog.visible = true
                this.deleteDialog.file = file
                this.deleteDialog.index = index
                this.delDialog = this.deleteDialog
            },
            renameFile(event, file, index) {
                this.renameDialog.visible = true
                this.renameDialog.file = file
                this.renameDialog.index = index
                this.reDialog = this.renameDialog;
            },
        },
        created() {
            this.getResource()
            document.addEventListener("click", this.closeFileMenu)
        }
    }
</script>

<style scoped lang="scss">
    .el-header {
        padding: 0;
    }

    .userSource {
        padding: 10px
    }

    .tool-active {
        color: #000000
    }

    .el-menu-item {
        height: 30px !important;
        line-height: 30px !important;

        & span {
            padding-left: 5px;
        }
    }

    .el-divider.el-divider--horizontal {
        margin-top: 5px !important;
        margin-bottom: 5px !important;
    }

    .el-popover.el-popper {
        width: 100px !important;
    }
</style>
