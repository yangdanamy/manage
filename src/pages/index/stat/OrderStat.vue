<template>
  <div id="orderstat">
    <el-form style="display:flex">
      <el-form-item label="时间范围" style="display:flex">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:10px">
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <div
      id="myCharts"
      ref="myCharts"
      style="width:100%;height:500px;background:#fff;margin-top:20px"
    ></div>
  </div>
</template>

<script>
import { getuserlist } from "@/utils/utils";
import { ordertotal } from "@/api/api";
export default {
  data() {
    return {
      date: ["2020-06-04 00:00:00","2020-06-05 00:00:00"],
      arr: [],
    };
  },
  methods: {
    search() {
      this.date = JSON.stringify([
        getuserlist(this.date[0]),
        getuserlist(this.date[1]),
      ]);
      console.log(this.date)
      ordertotal(this.date).then((res) => {
        this.arr = res.data.data;
        res.data.data.orderTime = getuserlist(res.data.data.orderTime);
        let options = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999",
              },
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ["订单数据"],
          },
          xAxis: [
            {
              type: "category",
              data: this.arr.map((item) => {
                return getuserlist(item.orderTime);
              }),
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "订单金额",
              type: "bar",
              data: this.arr.map((item) => {
                return item.orderAmount;
              }),
            },
          ],
        };
        this.myCharts.setOption(options);
      });
    },
  },
  // 点击之后才会有值
  mounted() {
    // 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
    this.myCharts = this.$echarts.init(this.$refs.myCharts);
    
  },
};
</script>

<style lang="less" scoped>
#orderstat {
  width: 100%;
  height: 100%;
}
#myCharts {
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 20px 40px;
  height: 500px;
  background: #fff;
  margin-top: 20px;
}
</style>