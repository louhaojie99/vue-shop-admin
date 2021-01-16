<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="logo">
        <img src="../../assets/logo.png" alt="">
        <!-- <span>电商后台管理系统</span> -->
        <span>功能测试管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" />
        </div>
        <el-menu
          :default-active="activePath"
          class="el-menu"
          :unique-opened="true"
          background-color="#333744"
          text-color="#fff"
          :collapse="isCollapse"
          active-text-color="#409eff"
          :collapse-transition="false"
          :router="true"
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

            <!-- 二级菜单 -->
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="'/'+subItem.path"
              @click="saveNavState('/'+subItem.path)"
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
        <router-view />
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
      // 左侧菜单树
      menuList: [],
      iconsObj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 菜单栏是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  computed: {},
  watch: {
  },
  created() {
    this.getMenuList()
    this.activePath = JSON.parse(window.localStorage.getItem('activePath'))
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
    // 菜单折叠收缩
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.localStorage.setItem('activePath', JSON.stringify(activePath))
      this.activePath = activePath
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
      // console.log(res.data)
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
.el-menu{
  border-right: 0;
}
.toggle-button{
  background-color: #272729;
  color: #945b88;
  font-size: 26px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
}
.active{
  width: 200px;
}
.noActive{
  width: 100px;
}
</style>
