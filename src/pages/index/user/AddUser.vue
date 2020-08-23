<template>
  <div id="adduser">
    <p id="title">添加账号</p>
    <el-form status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号">
        <el-input type="text" v-model="user" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" v-model="pass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model.number="group" placeholder="请选择用户组">
        <!-- 注意，这个地方要循环动态数据 -->
          <el-option :label="item.label" v-for="(item,index) in list" :key="index" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add } from "@/api/api.js";
export default {
  data() {
    return {
      user: null,
      pass: null,
      group: null,
      errormsg: null,
      list:[
        {label:"普通管理员",value:"普通管理员"},
        {label:"超级管理员",value:"超级管理员"}
      ]
    };
  },
  methods: {
    submitForm() {
      let {user,pass,group}=this//结构赋值
      add(user,pass,group).then((res) => {
        if (res.data.code == 0) {
          //成功
          this.$message({
            message: "添加账号成功！",
            type: "success",
          });
          this.user = null
          this.pass = null
         this.group = null
        } else {
          this.$message.error("添加账号失败！");
        }
      });
    },
    resetForm() {
      this.user = null
      this.pass = null
      this.group =null
    },
  },
};
</script>

<style lang="less" scoped>
#adduser {
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-bottom: 20px;
  #title {
    padding-left: 20px;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
  }
  .el-form-item {
    width: 30%;
  }
}
.error {
  color: brown;
  height: 20px;
  margin-left: 100px;
  font-size: 12px;
  margin-bottom: 10px;
}
</style>