<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width + 'px'"
    :before-close="handleClose"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <!-- 权限属性控件 -->
    <div class="container">
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
      />
      <el-tree
        ref="treeRef"
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :filter-node-method="filterNode"
        :default-checked-keys="defKeys"
      />
    </div>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAllrights, roleAuthorization } from '@/api/power'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '300'
    },
    // 默认选中的节点数组
    defKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    // roleId 当前角色ID
    roleId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 模糊搜索
      filterText: '',
      // 默认属性
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 权限列表
      treeData: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.treeRef.filter(val)
    }
  },
  created() {
    this.getAllrights()
  },
  methods: {
    // 取消
    handleClose() {
      this.$emit('closeModal')
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true
      return data.authName.indexOf(value) !== -1
    },
    // 提交表单
    async submitForm() {
      // 半选中,和选中
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
      console.log('-------------', res)
      this.$message.success('分配权限成功!')
      this.$emit('closeModal', 200)
    },
    // 获取权限列表
    async getAllrights() {
      const { data: res } = await getAllrights({ type: 'tree' })
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表数据失败')
      }
      this.treeData = res.data
    }
  }
}
</script>
<style lang='less' scoped>
.container{
  height: 350px;
  border: 1px solid #eee;
  .filter-tree{
    height: 310px;
    overflow: auto;
  }
}
</style>
