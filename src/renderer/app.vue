<template>
  <div class="main1">
    <span>{{ msg }}</span>
    <div>
      <img :src="imgs" alt="" srcset="" class="img3" />
    </div>
    <div class="bg1"></div>
    <div>
      <img :src="imgs2" alt="" srcset="" class="img3" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "app vue!",
      imgs: require("./resources/ponychart.jpg").default,
      imgs2: require("@/renderer/resources/ponychart.jpg").default,
    };
  },
  created() {
    // console.log("imgs", this.imgs);
  },
};
</script>
<style lang="scss" scoped>
$mColor: blue;
.main1 {
  color: $mColor;
  display: flex;
}
.img3 {
  width: 300px;
  height: 300px;
}
.bg1 {
  width: 300px;
  height: 300px;
  background: url(./resources/ponychart.jpg);
  background-size: 100%;
  border: 1px solid black;
}
</style>