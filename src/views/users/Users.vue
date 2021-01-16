<template>
  <div style="height: 100%">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card style="height: 95%">
      <!-- 搜索与提娜佳区域 -->
      <el-row :gutter="24">
        <el-col :span="7">
          <!-- @clear="onQueryUserList" -->
          <el-input v-model="queryParams.query" placeholder="请输入内容" clearable @change="onQueryUserList">
            <el-button slot="append" icon="el-icon-search" @click="onQueryUserList" />
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserInfoHandle">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-row :gutter="24">
        <el-col :span="24">
          <el-table
            :data="userList"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}"
            border
            stripe
            height="500"
          >
            >
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column
              prop="username"
              label="姓名"
              sortable
            />
            <el-table-column
              prop="email"
              label="邮箱"
              sortable
            />
            <el-table-column
              prop="mobile"
              label="电话"
              sortable
            />
            <el-table-column
              prop="role_name"
              label="角色"
              sortable
            />
            <el-table-column
              label="状态"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="userStateChange(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-row>
                  <!-- 修改按钮 -->
                  <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserInfoHandle(scope.row.id)" />
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
        </el-col>
      </el-row>
      <!-- 分页器 -->
      <el-pagination
        :current-page="queryParams.pagenum"
        :page-sizes="[15, 25, 50]"
        :page-size="queryParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <!--
            表单使用说明：添加表单
            width 宽度
            title 标题
            dialog-visible 显示状态
            closeDialog    关闭回调
          -->
      <user-modal
        v-if="visible"
        width="600"
        :title="modalParams.title"
        :user-id="userId"
        :dialog-visible="visible"
        @closeDialog="closeCallBack"
      />
    </el-card>
  </div>
</template>

<script>
import { getUserList, putUserState } from '@/api/users'
import UserModal from './modules/UserModal'

export default {
  components: {
    UserModal
  },
  data() {
    return {
      // 获取用户列表的参数对象
      queryParams: {
        query: '',
        pagenum: 1, // 默认多少页
        pagesize: 15 // 每页多少条
      },
      userList: [],
      total: 0,
      visible: false,
      // 表单modal绑定数据
      modalParams: {
        title: ''
      },
      // 表单modal修改保存的id
      userId: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await getUserList({ ...this.queryParams })
      if (res.meta.status !== 200) {
        return this.$message.console.error('获取用户列表失败! ')
      }
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 搜索列表功能
    onQueryUserList() {
      this.getUserList()
    },
    // 分页器 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryParams.pagesize = newSize
      this.getUserList()
    },
    // 分页器 监听当前页面改变的事件
    handleCurrentChange(newPage) {
      this.queryParams.pagenum = newPage
      this.getUserList()
    },
    // 用户状态
    async userStateChange(userinfo) {
      // console.log(userinfo)
      const params = {
        uid: userinfo.id,
        type: userinfo.mg_state
      }
      const { data: res } = await putUserState(params)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    // 添加用户
    addUserInfoHandle() {
      this.modalParams.title = '添加用户'
      this.visible = true
    },
    // 修改用户信息
    editUserInfoHandle(id) {
      this.userId = id
      this.modalParams.title = '修改用户'
      this.visible = true
    },
    // 添加成功的回调
    closeCallBack(val) {
      this.visible = false
      if (val === 200) {
        this.getUserList()
      }
    }
  }
}
</script>
<style lang='less' scoped>
.el-table{
  margin-top: 15px;
  font-size: 14px;
  overflow: auto;
}
.el-pagination{
  margin-top: 15px;
}
</style>