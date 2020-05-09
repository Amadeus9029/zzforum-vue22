<template>
    <div class="content-publishing">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;margin-top: 20px">
            <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>待审发布</el-breadcrumb-item>
        </el-breadcrumb>

    </div>
</template>

<script>
    import smPage from '@/components/Page/smPage'
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: "ContentPublishing",
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