<template>
  <div class="box">
    <h1>XXX商城后台管理系统</h1>
    <div id="box"></div>
  </div>
</template>
 
<script>
import echarts from "echarts";

export default {
  data() {
    return {};
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("box"));
    myChart.setOption({
      title: {
        text: "欢迎登录后台管理系统",
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: "访问量",
          type: "line",
          data: [66, 57, 76, 100, 121, 90,85],
          areaStyle: {},
          smooth: true
        },
      ],
    });
  },
};

</script>
 
<style scoped>
#box{
  width: 800px;
  height: 600px;
  margin: 20px auto;
}
</style>