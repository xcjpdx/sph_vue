<template>
  <div>
    <Header v-show="!$route.meta.isHidenHeader"></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHidenFooter"></Footer>
  </div>
</template>

<script>
// 引入非路由组件
import Footer from "@/components/Footer";
import Header from "@/components/Header";
//引入swiper的css样式
import "swiper/css/swiper.css";
export default {
  name: "App",
  mounted() {
    //获取三级分类数据
    this.$store.dispatch("getBaseCategoryList");
    //获取轮播图数据
    this.$store.dispatch("getBannerList");
    //获取今日推荐数据
    this.$store.dispatch("getRecommend");
    //获取Floor数据
    this.$store.dispatch("getFloor");
  },
  components: {
    Footer,
    Header,
  },
};
</script>

<style></style>
