import {debounce} from "./utils";

export const itemListenrMinin = {
  data() {
    return {
      ItemImageListener: null,
      newRefresh:null
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
