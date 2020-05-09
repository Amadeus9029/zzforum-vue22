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
                value: true,
                currentPage4: 1
            };
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    };
</script>
<style scoped>
</style>