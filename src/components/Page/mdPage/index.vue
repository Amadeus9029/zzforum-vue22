<template>
    <div class="md-page">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :hide-on-single-page="page.hideSingle"
                :current-page="page.currentPage"
                :page-sizes="page.sizes"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
        ></el-pagination>
    </div>
</template>

<script>
    export default {
        name: "mdPage",
        inject: {
            page: {
                default: () => {
                }
            }
        },
        data() {
            return {

            };
        },
        methods: {
            handleSizeChange(val) {
                this.page.size = val
            },
            handleCurrentChange(val) {
                this.page.currentPage = val
            }
        }
    };
</script>
<style scoped>
</style>