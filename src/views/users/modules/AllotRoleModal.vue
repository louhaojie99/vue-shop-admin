<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width + 'px'"
    :before-close="handleClose"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="closeResetForm"
  >
    <div class="content">
      <el-row :gutter="24">
        <el-col :span="6" class="lable">姓名：</el-col>
        <el-col :span="12">
          <el-input clearable :value="userInfo.username" disabled />
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6" class="lable">角色：</el-col>
        <el-col :span="12">
          <el-input clearable :value="userInfo.role_name" disabled />
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6" class="lable">分配新角色：</el-col>
        <el-col :span="12">
          <el-select v-model="selectedRoleId" filterable placeholder="请选择角色" style="width: 100%">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleList, allotUserRole } from '@/api/users'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // 角色列表
      rolesList: [],
      // 已选中的ID值
      selectedRoleId: ''
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 取消
    handleClose() {
      this.$emit('closeDialog')
    },
    // 提交表单
    async submitForm() {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择要分配的角色')
      }
      const params = {
        userInfo: this.userInfo,
        rid: this.selectedRoleId
      }
      console.log(params)
      const { data: res } = await allotUserRole(params)
      if (res.meta.status !== 200) {
        return this.$message.error('更新角色失败')
      }
      this.$message.success('更新角色成功')
      this.$emit('closeDialog', 200)
    },
    // 获取角色列表
    async getRoleList() {
      const { data: res } = await getRoleList()
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesList = res.data
    },
    // 监听分配角色对话框的关闭
    closeResetForm() {
      this.selectedRoleId = ''
      this.userInfo = ''
    }
  }
}
</script>
<style lang='less' scoped>
.el-row{
  margin: 10px 0;
}
.lable{
  text-align: right;
  height: 40px;
  line-height: 40px;
}
</style>
