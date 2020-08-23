<template>
  <div id="login">
    <div class="text" @keyup.enter="login">
      <h5>迅达管理系统</h5>
      <p style="margin-bottom:30px">
        <el-input placeholder="请输入用户名" v-model="acc" prefix-icon="el-icon-s-custom" clearable></el-input>
      </p>
      <p>
        <el-input placeholder="请输入密码" v-model="pwd" show-password prefix-icon="el-icon-lock" style="color:#fff;"></el-input>
      </p>
      <div class="error" type="warning">{{errormsg}}</div>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { checkLogin } from "@/api/api.js";
export default {
  data() {
    return {
      acc: null,
      pwd: null,
      errormsg: null,
    };
  },
  methods: {
    login() {
      checkLogin(this.acc, this.pwd).then((res) => {
        if (res.data.code == 0) {
          //成功
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
          });
          localStorage.acc = this.acc; //存用户名
          localStorage.token = res.data.token; //存token
          localStorage.role = res.data.role; //存role
          localStorage.id = res.data.id; //存id
          this.$router.push("/index/home"); //改变has地址
        } else {
          //失败，出现信息
          this.errormsg = "账户名或者密码错误！！";
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to bottom, #e66465, #9198e5) ;
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    width: 30%;
    .error {
      color: brown;
      height: 20px;
      margin: 10px 5px;
      font-size: 14px;
    }
    h5 {
      text-align: center;
      color: #fff;
      font-size: 30px;
      margin-bottom: 50px;
    }
    p {
      display: flex;
      position: relative;
      /deep/.el-input__inner {
        background: transparent;
        color:#333;
      }
      .el-input {
        background:#fff;
        border-radius: 5px
      }
      i {
        position: absolute;
        top: 7px;
        left: 5px;
        color: #c0c4cc;
        font-size: 26px;
      }
    }
    .el-button {
      background: #e66465;
      margin: 0 auto;
      width: 100%;
    }
  }
}
</style>