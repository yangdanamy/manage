<template>
  <el-container>
  <el-aside width="200px"><Aside/></el-aside>
  <el-container>
    <el-header><Head/></el-header>
    <el-main> <router-view></router-view> </el-main>
  </el-container>
</el-container>
</template>

<script>
import Aside from "../components/Aside";
import Head from "../components/Head";
export default {
  components: {
    Aside,
    Head,
  },
};
</script>

<style lang="less" scoped>
.el-container{
  height:100%;
  color:#333;
}
  .el-aside {
    background: #9198e5;
  }
  .el-main {
    background: #f0f2f5;
  }
</style>