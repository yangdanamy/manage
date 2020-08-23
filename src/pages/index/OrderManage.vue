<template>
  <div id="ordermanage">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="formInline.orderState" placeholder="订单状态">
          <el-option v-for="(item) in arr" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form style="display:flex">
        <el-form-item label="选择时间" style="display:flex">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-form>
    <el-table :data="tableData" border :style="height" v-loading="loading">
      <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column prop="orderTime" label="下单日期" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="订单信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <span v-if="flag">{{form.orderNo}}</span>
          <el-input v-if="!flag" v-model="form.orderNo" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <span v-if="flag">{{form.orderTime}}</span>
          <el-input v-if="!flag" v-model="form.orderTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <span v-if="flag">{{form.phone}}</span>
          <el-input v-if="!flag" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <span v-if="flag">{{form.consignee}}</span>
          <el-input v-if="!flag" v-model="form.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收获地址" :label-width="formLabelWidth">
          <span v-if="flag">{{form.deliverAddress}}</span>
          <el-input v-if="!flag" v-model="form.deliverAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <span v-if="flag">{{form.deliveryTime}}</span>
          <el-input v-if="!flag" v-model="form.deliveryTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <span v-if="flag">{{form.remarks}}</span>
          <el-input v-if="!flag" v-model="form.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <span v-if="flag">{{form.orderAmount}}</span>
          <el-input v-if="!flag" v-model="form.orderAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <span v-if="flag">{{form.orderState}}</span>
          <el-input v-if="!flag" v-model="form.orderState" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </div>
    </el-dialog>
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
import { orderlist, orderdetail, ordereidt } from "@/api/api";
import { getuserlist } from "@/utils/utils";
export default {
  data() {
    return {
      loading: true,
      height: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {},
      formInline: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
      },
      formLabelWidth: "120px",
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      id: 0,
      date: [],
      disabled: true,
      flag: true,
      arr: ["已受理", "已完成", "派送中", "全部"],
    };
  },
  created() {
    this.height = { width: "100%", height: "400px" };
    this.getorderlist();
  },
  methods: {
    // 获取订单列表
    getorderlist(searchex) {
      this.loading = true;
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...searchex,
      }).then((res) => {
        let arr = res.data.data;
        this.total = res.data.total;
        arr.forEach((item) => {
          item.orderTime = getuserlist(item.orderTime);
          item.deliveryTime = getuserlist(item.deliveryTime);
        });
        this.tableData = arr;
        this.loading = false;
      });
    },
    // 查询
    search() {
      let searchex = {};
      let { orderNo, consignee, phone, orderState } = this.formInline;
      if (orderNo != "") searchex.orderNo = orderNo;
      if (consignee != "") searchex.consignee = consignee;
      if (phone != "") searchex.phone = phone;
      if (orderState != "" && orderState != "全部")
        searchex.orderState = orderState;
      if (this.date.length > 0 && this.date != null)
        searchex.date = JSON.stringify([
          getuserlist(this.date[0]),
          getuserlist(this.date[1]),
        ]);
      this.searchex = searchex;
      this.getorderlist(this.searchex);
    },
    // 查看信息
    handleClick(row) {
      this.id = row.id;
      this.dialogFormVisible = true;
      this.flag = true;
      orderdetail(this.id).then((res) => {
        this.form = res.data.data;
        this.form.deliveryTime = getuserlist(this.form.deliveryTime);
        this.form.orderTime = getuserlist(this.form.orderTime);
      });
    },
    // 编辑
    edit(row) {
      this.dialogFormVisible = true;
      this.flag = false;
      this.form = { ...row };
    },
    sure() {
      if (this.flag == false) {
        ordereidt(this.form).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.dialogFormVisible = false;
            this.getorderlist();
          } else {
            this.$message.error("修改订单失败！");
          }
        });
      } else {
        this.dialogFormVisible = false;
      }
    },
    // 获取所有页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getorderlist(this.searchex);
      this.height = {};
    },
    // 获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getorderlist(this.searchex);
      this.height = {};
    },
  },
};
</script>

<style lang="less" scoped>
#ordermanage {
  background: #fff;
  padding: 30px 0;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .el-form {
    padding-left: 10px;
  }
  .el-form-item__content {
    width: 100%;
    .el-date-editor {
      width: auto;
    }
  }
}
</style>