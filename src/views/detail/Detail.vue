<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail, Goods} from "../../network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "../home/childComps/DetailBaseInfo";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {}
      }
    },
    created() {
      //1 保存传入的id
      this.iid = this.$route.query.iid;
      //2 根据id请求
      getDetail(this.iid).then(res => {
        //1 获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages;
        //2 获取商品信息
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      })
    }
  }
</script>

<style scoped>

</style>
