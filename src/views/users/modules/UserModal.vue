<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width + 'px'"
    :before-close="handleClose"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="resetForm"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="ruleForm.username"
          :disabled="title == '修改用户'"
        />
      </el-form-item>
      <el-form-item v-if="title === '添加用户'" label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="ruleForm.mobile" maxlength="11" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button v-if="title === '添加用户'" type="primary" @click="addSubmitForm('ruleForm')">确 定</el-button>
      <el-button v-if="title === '修改用户'" type="primary" @click="editSubmitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addUser, getUserInfo, editUserInfo } from '@/api/users'
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
    userId: {
      type: Number,
      default: 0
    }
  },
  data() {
    // 自定义校验规则
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else {
        if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) {
        // if (!/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(value)) {
          callback(new Error('请输入合法的邮箱'))
        } else {
          callback()
        }
      }
    }
    var validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请检测您的手机号是否正确'))
        } else {
          callback()
        }
      }
    }
    return {
      // 表单数据
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单校验
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度在 3 到 10 个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码的长度在 6 到 16 个字符之间', trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.title === '修改用户') {
      this.getUserInfo()
    }
  },
  methods: {
    // 取消
    handleClose() {
      this.$emit('closeDialog') // 取消 和 x按钮的事件
    },
    // 关闭重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    // 添加表单
    addSubmitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const { data: res } = await addUser({ ...this.ruleForm })
          if (res.meta.status === 201) {
            this.$message.success('用户添加成功')
            this.$emit('closeDialog', 200)
          }
        } else {
          this.$message.error('用户添加失败')
          return false
        }
      })
    },
    // 获取用户信息
    async getUserInfo() {
      const params = {
        id: this.userId
      }
      const { data: res } = await getUserInfo(params)
      if (res.meta.status === 200) {
        this.ruleForm = res.data
      }
    },
    // 修改表单
    editSubmitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const { email, mobile } = this.ruleForm
          const params = { id: this.userId, email, mobile }
          const { data: res } = await editUserInfo(params)
          if (res.meta.status === 200) {
            this.$message.success('用户修改成功')
            this.$emit('closeDialog', 200)
          }
        } else {
          this.$message.error('用户修改失败')
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
