<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-image-info>
      <detail-params-info ref="params" :param-info="itemParams"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commonInfo"></detail-comment-info>
      <good-list ref="recommend" :goods="recommends"></good-list>
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
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodList from "../../components/content/goods/GoodList";
  import {itemListenrMinin} from "../../common/minin";
  import {debounce} from "../../common/utils";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamsInfo,
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
        themeTopYs: [0, 1000, 2000, 3000],
        getThemeTopY: null,
        currentIndex: 0
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
      });
      //4 给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      }, 100)
      //组件加载完后的回调函数,仅仅dom渲染好，如果有图片，可能依然没有加载好
      //offsetTop值不对一般都是因为图片
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    },
    destroyed() {
      this.$bus.$off("itemImageLoad", this.ItemImageListenr);
    },
    methods: {
      detailImageLoad() {
        this.newRefresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
      },
      contentScroll(position) {
        //[0, 1000, 2000, 3000]
        //1 获取Y值
        const positionY = -position.y;
        //2 positionY和主题中值进行对比
        const Tlength = this.themeTopYs.length;
        for (let i = 1; i < Tlength; i++) {
          if (positionY > this.themeTopYs[i - 1] && positionY <= this.themeTopYs[i])
            this.$refs.detailNav.currentIndex = i - 1;
          else if (i == Tlength - 1 && positionY > this.themeTopYs[i])
            this.$refs.detailNav.currentIndex = i;
        }
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
