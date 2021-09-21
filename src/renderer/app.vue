<template>
  <div class="main1">
    <el-button type="primary" @click="sendMsg">查库</el-button>
    <el-button type="primary" @click="sendMsg2">另一种发送</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: "app vue!",
      imgs: require("./resources/ponychart.jpg").default,
      imgs2: require("@/renderer/resources/ponychart.jpg").default,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  created() {
    // console.log("imgs", this.imgs);
  },
  methods: {
    sendMsg(){
      console.log('发送消息');
      window.myAPI.ipcRenderer.send('ping', 'test礼拜')
      // ipcRenderer.send('vue-send', 'test');
      window.myAPI.ipcRenderer.invoke('some-name', {aaa: 111, bbb: '江南西'}).then((result) => {
          console.log('返回的值 btn', result)
      })
    },
    sendMsg2(){
      
    }
  }
};
</script>
<style lang="scss" scoped>
$mColor: blue;
.main1 {
  // color: $mColor;
  width: 100%;
  height: 100%;
}
.bg1 {
  width: 300px;
  height: 300px;
  background: url(./resources/ponychart.jpg);
  background-size: 100%;
  border: 1px solid black;
}
</style>