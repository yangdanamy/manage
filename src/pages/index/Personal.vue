<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>管理员信息</span>
    </div>
    <div class="text item">
      管理员ID:
      <span>{{id}}</span>
    </div>
    <div class="text item">
      账号:
      <span>{{account}}</span>
    </div>
    <div class="text item">
      用户组:
      <span>{{userGroup}}</span>
    </div>
    <div class="text item">
      创建时间:
      <span>{{ctime}}</span>
    </div>
    <div class="text item" style="display:flex;align-items:center;margin-top:12px">
      <span>管理员头像:</span>
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="headimg"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </el-card>
</template>
<script>
import { accountinfo } from "@/api/api.js";
import { getuserlist } from "@/utils/utils";
export default {
  data() {
    return {
      id: null,
      account: null,
      userGroup: null,
      ctime: null,
      imageUrl: "",
      headimg: {},
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code == 0) {
        this.$bus.$emit("send");
        this.$message({
          message: "头像更换成功",
          type: "success",
        });
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    // this.handleAvatarSuccess()
    this.headimg = { id: localStorage.id };
    accountinfo(localStorage.id).then((res) => {
      this.id = res.data.accountInfo.id;
      this.account = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
      this.ctime = getuserlist(res.data.accountInfo.ctime);
      this.imageUrl = res.data.accountInfo.imgUrl;
    });
  },
};
</script>
<style>
.el-card {
  width: 100%;
}
.text {
  font-size: 14px;
  
}
.text span{
  margin-left: 5px;
}
.item {
  /* margin-bottom: 18px; */
  line-height: 40px;
  border-bottom: 1px solid #f2f2f2;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>