<template>
  <div style="height: 100%;overflow: hidden;">
    <!-- 面包屑导航区域 -->
    <breadcrumb :breadcrumb-data="breadcrumbData" />

    <!-- 卡片视图区域 -->
    <el-card style="height: 95%">
      <el-select
        v-model="selVal"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择文章标签"
        >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <br><br><br> <br><br><br> <br><br><br> <br><br><br> <br><br><br>
      {{ selVal }}
    </el-card>
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
          title: '数据统计'
        },
        {
          title: '数据报表'
        }
      ],
      options: [
        { value: '1', label: 'A类'},
        { value: '2', label: 'B类' },
        { value: '3', label: 'E类'},
        { value: '0', label: '全部'}
      ],
      selVal: []
    }
  },
  watch:{
    selVal(newVal, oldVal) {
      if(newVal.indexOf('0') > -1) {}
      console.log(newVal)
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
