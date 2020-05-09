<template>
    <div class="tool-menu">
        <el-row style="height:50px;line-height:50px;background-color:#ccc;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
            <el-col>
                <el-dropdown trigger="click">
                    <el-button type="primary">新建</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-document"
                                          @click.native="addResource($event,'document')">新建文件
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-folder"
                                          @click.native="addResource($event,'folder')">新建文件夹
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "ToolMenu",
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                "currentResource",      //当前资源
                "sourceArray",
                "currentResourcePath"
            ])
        },
        methods: {
            ...mapActions({
                addResourceAction: 'resource/addResourceAction',
                deleteResourceAction: 'resource/deleteResourceAction',
                updateResourceAction: 'resource/updateResourceAction',
            }),
            addResource(event, type) {
                /**
                 * @param type folder|document
                 * @param parent_id
                 * @param path
                 * @param icon el-icon-folder|el-icon-document
                 */
                const icon = type === 'folder' ? 'el-icon-folder' : 'el-icon-document'
                let name = type === 'folder' ? '新建文件夹' : '新建文档'
                name = this.autoName(name)
                const parentId = this.sourceArray.length === 1 ? 0 : this.sourceArray[this.sourceArray.length - 1].id
                const resource = {
                    "type": type,
                    "icon": icon,
                    "path": this.currentResourcePath,
                    "parentId": parentId,
                    "name": name
                }
                this.addResourceAction(resource).then((response) => {})
            },
            // deleteResource(){
            //   this.addResourceAction().then((response)=>{
            //     this.userSource = response.data
            //   })
            // },
            // updateResource(){
            //   this.addResourceAction().then((response)=>{
            //     this.userSource = response.data
            //   })
            // },
            autoName(name, count = 0, nameList = []) {
                const reg = /^.*\([0-9]{1,3}\)$/
                if (nameList.length === 0) {
                    this.currentResource.forEach(item => {
                        nameList.push(item.name)
                    })
                }
                if (!nameList.find(val => val === name)) {
                    return name
                } else {
                    count++
                    if (reg.test(name)) {
                        name = name.split('(')[0]
                    }
                    name = name + '(' + count + ')'
                    return this.autoName(name, count, nameList)
                }
            }
        }
    };
</script>
<style scoped>
</style>
