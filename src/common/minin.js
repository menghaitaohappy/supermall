import {debounce} from "./utils";

export const itemListenrMinin = {
  data() {
    return {
      ItemImageListenr: null,
      refresh:null
    }
  },
  mounted() {
    //1.监听item中图片加载完成,对这个函数进行防抖操作
    this.refresh = debounce(this.$refs.scroll.refresh, 200);
    //对监听的事件进行保存
    this.ItemImageListenr = () => {
      this.refresh();
    }
    this.$bus.$on('itemImageLoad', this.ItemImageListenr);
  }
}
