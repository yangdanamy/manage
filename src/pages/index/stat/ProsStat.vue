<template>
  <div id="prosstat">
    <el-form style="display:flex">
      <el-form-item label="时间范围" style="display:flex">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left:10px">
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <div id="myCharts" ref="myCharts"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value1:[]
    }
  },
  mounted() {
    // 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
    const myCharts = this.$echarts.init(this.$refs.myCharts);
    let option = {
      title: {
        text: "堆叠区域图",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top",
            },
          },
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    myCharts.setOption(option);
  },
};
</script>

<style lang="less" scoped>
#prosstat {
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