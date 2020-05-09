<template>
    <div class="user-video" style="padding-top:20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <template v-for="item in breadcrumbList">
                <el-breadcrumb-item>{{userUrlMap[item]}}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "UserVideo",
        data(){
            return {
                breadcrumbList:[]
            }
        }
    }
</script>

<style scoped>

</style>