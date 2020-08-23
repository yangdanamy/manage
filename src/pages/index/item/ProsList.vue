<template>
  <div id="proslits">
    <p id="title">商品列表</p>
    <el-table :data="tableData" style="width: 100%" height="400" v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID" prop="id">
              <span>{{props.row.id }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <div class="block">
                <el-avatar shape="square" :size="50" :src="IMG_DOWLOAD+props.row.imgUrl"></el-avatar>
              </div>
            </el-form-item>
            <el-form-item label="评价">
              <span>{{ props.row.rating }}条</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}元</span>
            </el-form-item>
            <el-form-item label="店铺时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}单</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope" >
          <img :src="IMG_DOWLOAD+scope.row.imgUrl" style="width:80px;height:80px"/>
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            style="margin-right:10px;"
            type="text,primary"
            size="mini"
            @click="dialogFormVisible = true,handleEdit(scope.row)"
          >编辑</el-button>
          <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" :label-width="formLabelWidth">
                <el-select v-model="form.category" placeholder="请选择商品种类">
                  <el-option
                    v-for="(item,index) in list"
                    :key="index"
                    :label="item.cateName"
                    :value="item.cateName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input-number v-model="form.price" :min="1"></el-input-number>
              </el-form-item>
              <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  :action="IMG_UPDATE"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :data="img"
                >
                  <img
                    v-if="form.imgUrl"
                    :src="IMG_DOWLOAD+form.imgUrl"
                    class="avatar"
                    style="width:80px;height:80px"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    style="border: 1px dashed #d9d9d9;"
                  ></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="商品描述" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.goodsDesc"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sure">确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,15,20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import {
  itemlist,
  itemdel,
  itemedit,
  categories,
  IMG_UPDATE,
  IMG_DOWLOAD,
} from "@/api/api.js";
import { getuserlist } from "@/utils/utils";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      id: 0,
      IMG_UPDATE: "",
      IMG_DOWLOAD: "",
      list: [],
      form: {},
      img: {},
      imageUrl: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      loading: true,
    };
  },
  created() {
    this.IMG_UPDATE = IMG_UPDATE;
    this.IMG_DOWLOAD = IMG_DOWLOAD;
    this.getgoodslist();
    categories().then((res) => {
      this.list = res.data.categories;
    });
  },

  methods: {
    getgoodslist() {
      this.loading = true;
      itemlist(this.currentPage, this.pageSize).then((res) => {
        this.total = res.data.total;
        let arr = res.data.data;
        arr.forEach((item) => {
          item.ctime = getuserlist(item.ctime);
        });
        this.tableData = arr;
        this.loading = false;
      });
    },
    handleEdit(row) {
      this.form = { ...row };
      this.id = row.id;
      console.log(row);
    },
    sure() {
      itemedit(this.form).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getgoodslist();
          this.dialogFormVisible = false;
        } else {
          this.$message.error("修改失败～");
        }
      });
    },
    // 删除
    handleDelete(index, row) {
      this.id = row.id;
      // if (res.data.code == 0) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          itemdel(this.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getgoodslist();
            } else {
              this.$message.error("删除失败,请稍后再试");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 获取所有页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getgoodslist();
    },
    // 获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoodslist();
    },
    // 图片上传成功之后
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.form.imgUrl = res.imgUrl;
      }
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
};
</script>

<style lang="less" scoped>
#proslits {
  height: 100%;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  #title {
    padding-left: 20px;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  /deep/.el-dialog__header {
    height: 40px;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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