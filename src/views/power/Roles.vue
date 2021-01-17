<template>
  <div style="height: 100%">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card style="height: 95%">
      <!-- 添加角色按钮区 -->
      <el-row :gutter="24">
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-plus">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
    </el-card>
  </div>
</template>

<script>
import { getRolesList } from '@/api/power'

export default {
  components: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    getRolesList().then(res => {
      console.log(res)
    })
  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>
