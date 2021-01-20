<template>
  <div style="height: 100%">
    <!-- 面包屑导航区域 -->
    <breadcrumb :breadcrumb-data="breadcrumbData" />

    <!-- 卡片视图 -->
    <el-card style="height: 95%">
      <!-- 添加角色按钮区 -->
      <el-row :gutter="24">
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-plus">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table class="table" :data="rolesList" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" border stripe height="500">>
        <!-- 展开列 -->
        <el-table-column type="expand" width="80" align="center">
          <template slot-scope="scope">
            <el-row v-for="(item1,index1) in scope.row.children" :key="item1.id" :class="['bdtottom', index1===0?'bdtop':'','vcenter']" :gutter="24">
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right" />
              </el-col>
              <!-- 二级和三级权限 -->
              <el-col :span="19">
                <el-row v-for="(item2,index2) in item1.children" :key="item2.id" :class="[index2=== 0 ?'':'bdtop','vcenter']" :gutter="24">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right" />
                  </el-col>
                  <el-col :span="18">
                    <el-tag v-for="(item3) in item2.children" :key="item3.id" closable type="warning" @close="removeRightById(scope.row,item3.id)">
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#" width="80" align="center" />
        <el-table-column
          prop="roleName"
          label="角色名称"
          sortable
          width="250"
        />
        <el-table-column
          prop="roleDesc"
          label="角色描述"
          sortable
        />
        <el-table-column
          label="操作"
          width="350"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分配权限的对话框 -->
      <el-dialog
        title="分配权限"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <!-- 树形控件 -->
        <el-tree
          ref="treeRef"
          style="height: 300px;overflow:auto"
          :data="rightslint"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="defKeys"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getRolesList, delRolePower, getAllrights, roleAuthorization } from '@/api/power'
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
          title: '角色列表'
        }
      ],

      // 所有角色列表数据
      rolesList: [],
      dialogVisible: false,
      // 所有权限的数据
      rightslint: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defKeys: [], // 默认选中的节点数组
      // 当前即将分配权限的角色id
      roleId: ''
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.getRolesList()
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
      const { data: res } = await getRolesList()
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesList = res.data
    },
    // 根据ID删除对应的权限
    async removeRightById(role, rightId) {
      const confirmResult = await this.$confirm('是否删除此用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      const { data: res } = await delRolePower({
        roleId: role.id,
        rightId
      })
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      } else {
        this.$message.success('删除权限成功')
        // this.getRolesList()
        role.children = res.data
      }
    },
    // 分配权限
    async showSetRightDialog(role) {
      this.roleId = role.id
      const { data: res } = await getAllrights({ type: 'tree' })
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表数据失败')
      }
      // 把获取到的权限数据保存到data中
      this.rightslint = res.data

      // 递归获取三级节点的id
      this.defKeys = []
      this.getLeafKeys(role, this.defKeys)
      this.dialogVisible = true
    },
    // 通过递归形式获取角色下三级权限的id
    getLeafKeys(node, arr) {
      // 如果当前node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr)
      })
    },
    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      const params = {
        rids: idStr,
        roleId: this.roleId
      }
      const { data: res } = await roleAuthorization(params)
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功!')
      this.getRolesList()
      this.dialogVisible = false
    }
  }
}
</script>
<style lang='less' scoped>
.table{
  margin-top: 20px;
}
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdtottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>
