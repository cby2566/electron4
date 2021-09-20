<template>
  <div>
    <span>{{ msg }}</span>
    <!-- <img src="../ponychart.jpg" alt="" srcset=""> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "app vue!",
    };
  },
};
</script>
<style lang="scss" scoped>
$mColor: blue;
div{
  color: $mColor;
}
</style>