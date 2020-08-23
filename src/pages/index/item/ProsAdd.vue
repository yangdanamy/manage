<template>
  <div id="prosadd">
    <p id="title">商品添加</p>
    <el-form :label-position="labelPosition" label-width="80px" :model="form">
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.region" placeholder="请选择商品种类">
          <el-option
            v-for="(item,index) in list"
            :key="index"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number v-model="form.price"  :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader"
          :action="IMG_UPDATE"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="img"
        >
          <img v-if="imgs" :src="IMG_DOWLOAD" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px dashed #d9d9d9;"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="additem">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { categories, itemadd ,IMG_UPDATE,IMG_DOWLOAD} from "@/api/api.js";
export default {
  data() {
    return {
      num: 1,
      labelPosition: "right",
      form: {
        name: "",
        region: "",
        price: "",
        desc: "",
      },
      img: null,
      list: [],
      imgs: null,
      // imgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      formInline: "",
      IMG_UPDATE:"",
      IMG_DOWLOAD:"",
    };
  },
  created() {
    this.IMG_UPDATE = IMG_UPDATE;
    this.IMG_DOWLOAD = IMG_DOWLOAD;
    categories().then((res) => {
      this.list = res.data.categories;
    });
  },
  methods: {
    // 添加商品按钮
    additem() {
      itemadd(
        this.form.name,
        this.form.region,
        JSON.stringify(this.form.price),
        this.imgs,
        this.form.desc
      ).then((res) => {
        if (res.data.code == 0) {
          //成功
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.form.name="",
            this.form.region="",
            this.form.price="",
            this.imgs="",
            this.form.desc="";
        } else {
          this.$message.error("添加失败～");
        }
      });
    },
    // 店铺头像上传
    handleAvatarSuccess(res, file) {
      if (res.code == 0) {
        this.IMG_DOWLOAD = this.IMG_DOWLOAD + res.imgUrl;
        this.imgs = res.imgUrl;
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#prosadd {
  background: #fff;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  #title {
    padding-left: 20px;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
  }
  .el-button {
    margin-left: 50px;
  }
  .el-form {
    height: 100%;
    padding-left: 20px;
    padding-bottom: 20px;
  }
  .el-form-item {
    width: 40%;
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
}
</style>