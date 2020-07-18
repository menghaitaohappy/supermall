<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <Scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-image-info>
      <detail-param-info :param-info="itemParams"></detail-param-info>
      <detail-comment-info :comment-info="commonInfo"></detail-comment-info>
      <good-list :goods="recommends"></good-list>
    </Scroll>

  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail, Goods, getRecommend} from "../../network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailImageInfo from "./childComps/DetailImageInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodList from "../../components/content/goods/GoodList";
  import {itemListenrMinin} from "../../common/minin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList
    },
    mixins: [itemListenrMinin],
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        itemParams: {},
        commonInfo: {},
        recommends: [],
      }
    },
    created() {
      //1 保存传入的id
      this.iid = this.$route.query.iid;
      //2 根据id请求详情数据
      getDetail(this.iid).then(res => {
        //1 获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages;
        //2 获取商品信息
        this.goodsInfo = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services);
        //3 取出店铺的信息
        this.shopInfo = res.result.shopInfo;
        //4 取出详情信息
        this.detailInfo = res.result.detailInfo;
        //5 取出参数信息
        this.itemParams = res.result.itemParams;
        //6 取出评论信息
        if (res.result.rate.cRate !== 0) {
          this.commonInfo = res.result.rate.list[0];
        }
      })
      //3 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      })
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off("itemImageLoad", this.ItemImageListenr);
    },
    methods: {
      detailImageLoad() {
        this.refresh();
      }
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
