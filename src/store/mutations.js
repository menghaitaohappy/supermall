import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";
export default {
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法完成的事情尽量单一
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    state.CartList.push(payload);
  }
}
