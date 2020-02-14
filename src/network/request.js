import Axios from "axios";

export function request(config) {

  //1.创建axios的实例
  const instance = Axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });

  //2.axios拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config;  //放行
    /**
     * 应用场景
     * 1.比如config中的一些信息不符合服务器的要求
     * 2.比如每次发送网络请求时都希望在界面显示一个请求的图标
     * 3.某些网络请求(比如登录),必须携带一些特殊的信息
     */
  }, error => {
  });
  //2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
     return res.data; //过滤掉其他信息，只要数据data结果
    return res;
  }, err => {
    // console.log(err);
  });

  //3.发送真正的网络请求
  return instance(config);

}
