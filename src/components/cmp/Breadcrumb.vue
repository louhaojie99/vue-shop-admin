<template>
  <!-- 面包屑导航区域 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :key="index" :to="item.path">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    // 面包屑数据
    breadcrumbData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang='less' scoped>
</style>
