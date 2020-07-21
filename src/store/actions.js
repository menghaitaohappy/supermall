import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";
export default {
  addCart(context, payload) {
    //payload添加新的商品
    let Product = null;
    //1 判断购物车是否已经有
    Product = context.state.CartList.find(item => {
      console.log(item);
      return item.iid === payload.iid;
    })
    //2 有的话直接+1
    if (Product) {
      // Product.count += 1;
      context.commit(ADD_COUNTER, Product);
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload);
    }
  }
}
