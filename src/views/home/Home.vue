<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
            @pullingUp="loadMore"
            :pull-up-load="true">

      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"
                   @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";


  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import GoodList from "../../components/content/goods/GoodList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";


  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components: {
      TabControl,
      HomeSwiper,
      NavBar,
      RecommendView,
      FeatureView,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0, list: []
          },
          'new': {
            page: 0, list: []
          },
          'sell': {
            page: 0, list: []
          },
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();

      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      //监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      this.$bus.$on('itemImageLoad', () => {
        // this.$refs.scroll.refresh();
        refresh();
      })
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      /**
       * 事件监听相关方法
       * */
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 650);
      },
      loadMore() {
        console.log('test');
        this.getHomeGoods(this.currentType);
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 450;
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page + 1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /*
  吸顶效果
  移动端一般都支持
   */
  .tab-control {
    position: sticky;
    top: 44px;

    z-index: 8;
  }

  /*.content {*/
  /*  !*减去上下两边组件的高度*!*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
  .content {
    /*height: 300px;*/
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    position: absolute;
  }
</style>
