<template>
  <div id="Head">
    <el-breadcrumb separator-class="el-icon-arrow-right" router>
      <el-breadcrumb-item v-for="item in list" :key="item">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="demo-basic--circle">
      <el-dropdown trigger="click" @command="exid">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link to="/index/personal">
        <img :src="circleUrl" width="50px" style="height:50px;border-radius:50%;margin-left:10px" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { checktoken, accountinfo } from "@/api/api.js";
export default {
  watch: {
    //观察数据变化，也可以观察hash变化
    //有to和from参数
    $route(to) {
      // to.meta.bread=this.list
      this.list = to.meta.bread;
    },
  },
  data() {
    return {
      circleUrl: "",
      sizeList: ["large"],
      username: null,
      list: [],
    };
  },
  created() {
    this.list = this.$route.meta.bread; //初始化当前
    this.getheadimg();
    this.$bus.$on("send", () => {
      this.getheadimg();
    });
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        //token有效
        this.username = localStorage.acc;
      } else {
        //无效过期,重新登录
        this.$message({
          message: "请重新登录!",
          type: "warning",
        });
        this.$router.push("/");
      }
    });
  },
  methods: {
    getheadimg() {
      accountinfo(localStorage.id).then((res) => {
        this.circleUrl = res.data.accountInfo.imgUrl;
      });
    },
    exid(command) {
      if (command == "1") {
        this.$confirm("是否确认退出?", "退出登陆", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push("/");
            localStorage.removeItem("token");
            this.$message({
              message: "退出成功!",
              type: "success",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#Head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  .el-breadcrumb {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .demo-basic--circle {
    display: flex;
    align-items: center;
    padding-right: 20px;
    span {
      margin-left: 10px;
    }
  }
}
</style>