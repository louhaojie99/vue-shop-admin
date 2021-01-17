<template>
  <!-- 分页器组件 -->
  <el-pagination
    :current-page="queryParams.pagenum"
    :page-sizes="pageSizes"
    :page-size="queryParams.pagesize"
    :layout="layout"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  props: {
    // 默认多少页，每页多少条（默认1页展示15条）
    queryParams: {
      type: Object,
      default: () => {
        return {
          pagenum: 1,
          pagesize: 15
        }
      }
    },
    // 可切换选择数据
    pageSizes: {
      type: Array,
      default: () => {
        return [15, 25, 50]
      }
    },
    // 分页总计条数
    total: {
      type: Number,
      default: 0
    },
    // 分页器显示使用的个体组件
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang='less' scoped>
</style>
