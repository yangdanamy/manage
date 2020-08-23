<template>
  <div id="updatepwd">
    <p id="title">修改密码</p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原来密码" prop="oldpass">
        <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpass">
        <el-input type="password" v-model="ruleForm.newpass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { checkoldpwd } from "@/api/api.js";
import { editpwd } from "@/api/api.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: "",
        newpass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 确认修改密码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过
          checkoldpwd(this.ruleForm.oldpass, localStorage.id).then((res) => {
            //旧密码是否正确
            if (res.data.code == 0) {
              // //成功
              editpwd(this.ruleForm.newpass, localStorage.id).then((res) => {
                if (res.data.code == 0) {
                  //成功
                  this.$message({
                    message: "修改密码成功，请重新登录!",
                    type: "success",
                  });
                  this.$router.push("/");
                } else {
                  this.$message.error("修改密码失败，请稍后再试！");
                }
              });
            } else {
              //失败
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("请重新输入!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
#updatepwd {
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
  .el-form {
    width: 100%;
    .el-form-item {
      width: 30%;
    }
  }
}
</style>