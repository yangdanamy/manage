<template>
  <div id="prostype">
    <p id="title">
      <span>商品分类</span>
      <el-button type="primary" size="small" @click="dialogFormVisible = true">添加分类</el-button>
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" prop autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false,sure()">确 定</el-button>
        </div>
      </el-dialog>
    </p>
    <el-table :data="tableData" :style="height" v-loading="loading">
      <el-table-column label="序号" width="80" prop="index"></el-table-column>
      <el-table-column label="分类名称" width="160" prop="cateName">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
          <el-input v-show="scope.row.isedit" width="100" v-model="scope.row.cateName" />
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="280" prop="state">
        <template slot-scope="scope">
          <el-switch
            :disabled="!scope.row.isedit"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >{{scope.row.isedit==true?"完成":"编辑"}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { catelist, delcate, addcate, editcate } from "@/api/api.js";
export default {
  data() {
    return {
      id: null,
      pageSize: 10,
      total: 10,
      currentPage: 1,
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        value: null,
      },
      formLabelWidth: "120px",
      loading:true,
      height:{}
    };
  },
  created() {
    this.height={height:"578px"}
    this.getcatelist();
  },
  methods: {
    // 获取列表
    getcatelist() {
        this.loading=true
      catelist(this.currentPage, this.pageSize).then((res) => {
        let index = 1;
        this.total = res.data.total;
        let newarr = res.data.data;
        newarr.forEach((item) => {
          item.index = index++;
          item.isedit = false;
          item.state = Boolean(item.state);
        });
        this.tableData = newarr;
        this.loading=false
      });
    },
    // 出现
    handleEdit(index, row) {
      // 出现输入框
      row.isedit = !row.isedit;
      // isedit  显示隐藏     为false的时候出现span，是编辑   true 出现input 是完成
      if (!row.isedit) {
        editcate(row.id, row.cateName, row.state).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          }
        });
      }
    },
    // 删除当前行
    handleDelete(index, row) {
      this.id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(this.id).then((res) => {
            if (res.data.code == 0) {
              // 当前对象在数组中删除
              //删除成功
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              this.getcatelist();
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
      // 点击删除的时候，列表删除，并且数据库删除
    },
    // 获取所有页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getcatelist();
      this.height={}
    },
    // 获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getcatelist();
      this.height={}
    },
    // 添加分类
    sure() {
      addcate(this.form.name, this.form.value).then((res) => {
        if (res.data.code == 0) {
          //成功
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getcatelist();
        } else {
          this.$message.error("添加失败");
        }
        this.form.name = "";
      });
    },
  },
};
</script>

<style lang="less" scoped>
#prostype {
  background: #fff;
  padding-bottom: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  #title {
    padding: 0 20px;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
    > .el-button {
      float: right;
      margin-top: 9px;
    }
    .el-dialog {
      width: 30% !important;
    }
  }
  .el-table {
    padding: 0 20px;
  }
}
</style>