import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: 'recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discount;
    this.discountBgColor = itemInfo.discountBgColor;
    this.realPrice = itemInfo.realPrice;
    this.columns = columns;
    this.services = services;
  }
}

// export class Shop {
//   constructor(shopInfo) {
//     this.shopLogo = shopInfo.shopLogo;
//   }
// }
