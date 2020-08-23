<template>
  <div id="userlist">
    <p id="title"></p>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :style="style"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="用户组" prop="userGroup"></el-table-column>
      <el-table-column label="创建时间" prop="ctime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="dialogFormVisible = true,handleEdit(scope.$index, scope.row)"
            size="mini"
            style="margin-right:10px"
          >编辑</el-button>
          <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.account" autocomplete="off" style="width:40%"></el-input>
              </el-form-item>
              <el-form-item label="用户组" :label-width="formLabelWidth">
                <el-select v-model="form.userGroup" placeholder="请选择用户组">
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false,comfirm()">确 定</el-button>
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
    <div style="margin-top: 20px;margin-left:20px">
      <el-button @click="batchRemove()" type="primary">批量删除</el-button>
      <el-button @click="toggleSelection()" type="danger">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { getuserlist } from "@/utils/utils";
import { list, del, batchdel, edit } from "@/api/api.js";
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      ids: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      id: 0,
      str: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        account: "",
        userGroup: "",
      },
      style: {},
    };
  },
  created() {
    this.getuserlist();
    this.style = {
      width: "100%",
      height: "400px",
    };
  },
  methods: {
    // 封装函数
    getuserlist() {
      this.loading = true;
      list(this.currentPage, this.pageSize).then((res) => {
        this.total = res.data.total;
        let newarr = res.data.data;
        newarr.forEach((item) => {
          item.ctime = getuserlist(item.ctime);
        });
        this.tableData = newarr;
        this.loading = false;
      });
    },
    // 获取所有页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getuserlist();
      this.style = {};
    },
    // 获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getuserlist();
      this.style = {};
    },
    // 批量删除
    batchRemove() {
      this.$confirm("此操作将永久删除选中文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          batchdel(this.str).then((res) => {
            if (res.data.code == 0) {
              //成功
              this.$message({
                message: "批量删除成功",
                type: "success",
              });
              this.getuserlist();
            } else {
              this.$message.error("批量删除失败,请稍后再试");
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
    // 重置
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 获取当前选中
    handleSelectionChange(val) {
      // val 当前所有选中的一个数组，需要把这个选中的删除
      //编辑
      let arr = [];
      val.forEach((item) => {
        // 去掉重复的部分
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      this.str = JSON.stringify(arr);
    },
    // 确认修改
    comfirm() {
      edit(this.rowid, this.form.account, this.form.userGroup).then((res) => {
        if (res.data.code == 0) {
          //成功
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getuserlist();
        } else {
          this.$message.error("修改失败,请稍后再试");
        }
      });
    },
    // 编辑行
    handleEdit(index, row) {
      this.rowid = row.id;
      this.getuserlist();
      this.form.account=row.account
      this.form.userGroup=row.userGroup
      console.log(row)
    },
    // 删除当前行
    handleDelete(index, row) {
      this.id = row.id;
      // if (res.data.code == 0) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(this.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getuserlist();
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
  },
};
</script>
<style lang="less" scoped>
#userlist {
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-bottom: 40px;
  // height:100%;
  #title {
    padding-left: 20px;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
  }
  // .el-table {
  //   // height:70%;
  // }
}
</style>