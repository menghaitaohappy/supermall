import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenrMinin = {
  data() {
    return {
      ItemImageListener: null,
      newRefresh: null
    }
  },
  mounted() {
    //1.监听item中图片加载完成,对这个函数进行防抖操作
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    //对监听的事件进行保存
    this.ItemImageListener = () => {
      this.newRefresh();
    }
    this.$bus.$on('itemImageLoad', this.ItemImageListener);
  }
}
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: true
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 650);
    },
  },

}
