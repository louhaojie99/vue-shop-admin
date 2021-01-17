<template>
  <div style="height: 100%;overflow: hidden;">
    <!-- 面包屑导航区域 -->
    <breadcrumb :breadcrumb-data="breadcrumbData" />

    <!-- 卡片视图区域 -->
    <el-card style="height: 95%" />
  </div>
</template>

<script>
import Breadcrumb from '@/components/cmp/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      // 面包屑数据
      breadcrumbData: [
        {
          path: '/home',
          title: '首页'
        },
        {
          title: '订单管理'
        },
        {
          title: '订单列表'
        }
      ]
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang='less' scoped>

</style>
