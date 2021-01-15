<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="logo">
        <img src="../../assets/logo.png" alt="">
        <!-- <span>电商后台管理系统</span> -->
        <span>测试后台管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="250px">
        <el-menu
          default-active="110"
          :unique-opened="true"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          @open="handleOpen"
          @close="handleClose"
        >
          <!-- 解决返回数据Number转String问题 -->
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]" />
              &nbsp;
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="subItem.id + ''"
            >
              <template slot="title">
                <i class="el-icon-menu" />
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        Main
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import storageUtils from '@/utils/storageUtils.js'
import { getMenuList } from '@/api/home'
export default {
  components: {},
  data() {
    return {
      menuList: [], // 左侧菜单树
      iconsObj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      }
    }
  },
  computed: {},
  watch: {
  },
  created() {
    this.getMenuList()
  },
  methods: {
    // 菜单打开回调
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    // 菜单关闭回调
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // 退出
    loginOut() {
      storageUtils.removeUser()
      this.$message.success('退出成功')
      this.$router.push({ path: '/login' })
    },
    // 获取所有的菜单列表
    async getMenuList() {
      const { data: res } = await getMenuList()
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res.data)
      this.menuList = res.data
    }
  }
}
</script>
<style lang="less" scoped>
@headerBg: #373d41;
@asideBg: #333744;
@mainBg: #eaedf1;
.home-container {
  height: 100%;
}
.el-header {
  background-color: @headerBg;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  > div {
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
.el-aside {
  background-color: @asideBg;
}
.el-main {
  background-color: @mainBg;
}
.el-menu-item.is-active {
  background-color: rgb(41, 45, 54) !important;
}
</style>
