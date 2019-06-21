import axios from 'axios'
import {Toast} from 'antd-mobile'
axios.interceptors.request.use(config=>{
    // 在发送请求之前做些什么
        Toast.loading('正在加载中', 1);
    return config;
  });

// 添加响应拦截器
axios.interceptors.response.use(config=>{
    // 对响应数据做点什么
    Toast.hide()
    return config;
  });