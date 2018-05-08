const isProd = process.env.NODE_ENV === 'production';

const axios = require('axios');
let host = isProd ? 'http://www.youxuewang.com.cn/shouji/home/LoadProducts' : 'http://www.youxuewang.com.cn/shouji/home/LoadProducts';
let cook = process.__COOKIE__ || '';
let api;

axios.defaults.baseURL = host;
axios.defaults.timeout = 10000;

axios.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status < 300) {
    console.log(121212,res.status );
    return res;
  }
  return Promise.reject(res);
}, (error) => {
  // 网络异常
  return Promise.reject({message: '网络异常，请刷新重试', err: error, type: 1});
});

if (process.__API__) {
  api = process.__API__;
} else {
  api = {
    get: function(target, options = {}) {
      return new Promise((resolve, reject) => {
        axios.request({
          url: target,
          method: 'get',
          headers: {
            'Cookie': cook
          },
          params: options
        }).then(res => {
          resolve(res.data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    post: function(target, options = {}) {
      return new Promise((resolve, reject) => {
        axios.request({
          url: target,
          method: 'post',
          headers: {
            'Cookie': cook
          },
          params: options
        }).then(res => {
          resolve(res.data);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  };
}

module.exports = api;