<template>
  <div style="height: 100%;overflow: hidden;">
    <!-- 面包屑导航区域 -->
    <breadcrumb :breadcrumb-data="breadcrumbData" />
    <!-- 卡片视图区域 -->
    <el-card style="height: 95%">
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <div style="height: 10px;" />
      <!-- 表格 -->
      <tree-table
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <tamplate slot="isok" slot-scope="scope" name>>
          <i v-if="scope.row.cat_deleted" style="color: blue;" class="el-icon-success" />
          <i v-else style="color:red;" class="el-icon-error" />
        </tamplate>
        <tamplate slot="orider" slot-scope="scope">
          <el-tag v-if="scope.row === 0" size="mini">一级</el-tag>
          <el-tag v-else-if="scope.row === 1" type="success" size="mini">二级</el-tag>
          <el-tag v-else type="warning" size="mini">三级</el-tag>
        </tamplate>
        <tamplate slot="opt">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </tamplate>
      </tree-table>
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!-- 添加分类的对话框 -->
      <el-dialog title="添加分类" :visible.sync="addCateDislogVisible" width="50%">
        <el-form ref="rulesFormRef" :model="addCateForm" :rules="rulesForm" label-width="100px">
          <el-form-item label="分类名称：" prop="cat_name">
            <el-input v-model="addCateForm.cat_name" />
          </el-form-item>
          <el-form-item label="父级分类">
            .
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCateDislogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCateDislogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/cmp/Breadcrumb'
import {
  getCategories,
  getParentCateList
} from '@/api/goods'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      // 面包屑数据
      breadcrumbData: [{
        path: '/home',
        title: '首页'
      },
      {
        title: '商品管理'
      },
      {
        title: '商品分类'
      }
      ],
      // 商品分类的数据, 默认为空
      catelist: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 为table指令列的定义
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      },
      {
        label: '是否有效',
        type: 'template',
        template: 'isok'
      },
      {
        label: '排序',
        type: 'tamplate',
        template: 'orider'
      },
      {
        label: '操作',
        type: 'tamplate',
        template: 'opt'
      }
      ],
      total: null,
      addCateDislogVisible: false,
      // 添加分类的表单对象
      addCateForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      rulesForm: {
        cat_name: [{
          required: true,
          message: '请输入分类名称',
          trigger: 'blur'
        }]
      },
      parentCatelist: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const {
        data: res
      } = await getCategories(this.queryInfo)
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败!')
      }
      this.catelist = res.data.result
      this.total = res.data.total
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    showAddCateDialog() {
      this.getParentCateList()
      this.addCateDislogVisible = true
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      const params = {
        type: 2
      }
      const {
        data: res
      } = await getParentCateList(params)
      console.log('点击了', res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败')
      }
      this.parentCatelist = res.data
      console.log('-----------', res.data)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
