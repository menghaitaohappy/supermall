<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <Scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
    </Scroll>

  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail, Goods} from "../../network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailShopInfo from "./childComps/DetailShopInfo";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll,
      DetailShopInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {}
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
        this.goodsInfo = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services);
        //3 去除店铺的信息
        this.shopInfo=res.result.shopInfo;
      })
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }
</style>
