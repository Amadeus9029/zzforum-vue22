<template>
  <div class="sm-page">
    <el-pagination
            small
            layout="prev, pager, next"
            :hide-on-single-page="page.hideSingle"
            :current-page="page.currentPage"
            :page-size="page.size"
            :total="page.total"></el-pagination>
  </div>
</template>

<script>
export default {
  name: "smPage",
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