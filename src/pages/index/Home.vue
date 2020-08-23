<template>
  <div id="stat">
    <ul>
      <li>
        <i class="el-icon-document" style="color:#1296db"></i>
        <div>
          <p>总订单</p>
          <span>{{totalOrder}}</span>
        </div>
      </li>
      <li>
        <i class="el-icon-money" style="color:#d4237a"></i>
        <div>
          <p>总销售额</p>
          <span>{{totalAmount}}</span>
        </div>
      </li>
      <li>
        <i class="el-icon-s-order" style="color:#1296db"></i>
        <div>
          <p>今日订单数</p>
          <span>{{todayOrder}}</span>
        </div>
      </li>
      <li>
        <i class="el-icon-coin" style="color:#1afa29"></i>
        <div>
          <p>今日销售额</p>
          <span>{{totayAmount}}</span>
        </div>
      </li>
    </ul>
    <div id="myCharts" ref="myCharts"></div>
  </div>
</template>

<script>
import {totaldata} from '@/api/api'
export default {
  data(){
    return{
      todayOrder:0,
      totalAmount:0,
      totalOrder:0,
      totayAmount:0
    }
  },
  methods: {},
  mounted() {
    // 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
    const myCharts = this.$echarts.init(this.$refs.myCharts);
    totaldata().then(res=>{
      this.todayOrder=res.data.todayOrder
      this.totalAmount=res.data.totalAmount
      this.totalOrder=res.data.totalOrder
      this.totayAmount=res.data.totayAmount
      let options = {
      title: {
        text: "数据统计",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["订单数据", "金额数据"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data:res.data.xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "订单数据",
          type: "line",
          stack: "总量",
          data: res.data.orderData,
        },
        {
          name: "金额数据",
          type: "line",
          stack: "总量",
          data: res.data.amountData,
        },
      ],
    };
    myCharts.setOption(options);
    })
    
  },
};
</script>

<style lang="less" scoped>
#stat {
  width: 100%;
    height:100%;
  ul {
    display: flex;
    justify-content: space-around;
    width: 100%;
    li {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 23%;
      height: 80px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      i {
        font-size: 60px;
      }
      div {
        p {
          color: #cdcdcd;
          margin-bottom: 5px;
        }
        span {
          font-weight: bold;
        }
      }
    }
  }
  #myCharts {
    border-radius: 5px;
    margin-top: 30px;
    background: #fff;
    width: 98%;
    height:430px;
    padding: 40px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>