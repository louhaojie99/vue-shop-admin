<template>
  <div class='home'>主页
    <el-button type="info" @click="loginOut">退出</el-button>
  </div>
</template>

<script>
import storageUtils from '@/utils/storageUtils.js'
export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {
    // 退出
    loginOut () {
      storageUtils.removeUser()
      this.$message.success('退出成功')
      this.$router.push({ path: '/login' })
    }
  },
  created () {

  },
  mounted () {

  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>
