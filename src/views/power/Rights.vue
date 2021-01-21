<template>
  <div style="height: 100%">
    <!-- 面包屑导航区域 -->
    <breadcrumb :breadcrumb-data="breadcrumbData" />

    <!-- 卡片视图 -->
    <el-card style="height: 95%">
      <el-table
        :data="rightsList"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
        stripe
        height="500"
      >
        >
        <el-table-column type="index" label="#" width="80" align="center" />
        <el-table-column
          prop="authName"
          label="权限名称"
          sortable
        />
        <el-table-column
          prop="path"
          label="路径"
          sortable
        />
        <el-table-column
          prop="level"
          label="权限等级"
          sortable
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level ==='0'">一级权限</el-tag>
            <el-tag v-if="scope.row.level ==='1'" type="success">二级权限</el-tag>
            <el-tag v-if="scope.row.level ==='2'" type="warning">三级权限</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
        >
          <template>
            <el-row>
              <!-- 修改按钮 -->
              <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-edit" size="mini" />
              </el-tooltip>
              <!-- 删除按钮 -->
              <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" size="mini" />
              </el-tooltip>
              <!-- 分配角色 -->
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini" />
              </el-tooltip>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightsList } from '@/api/power'
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
          title: '权限管理'
        },
        {
          title: '权限列表'
        }
      ],
      // 权限列表
      rightsList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getRightsList()
  },
  mounted() {

  },
  methods: {
    // 获取所有的权限
    async getRightsList() {
      const params = {
        type: 'list'
      }
      const { data: res } = await getRightsList(params)
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightsList = res.data
    }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>
