const axios = require('axios');
let api;

axios.defaults.timeout = 10000;

//拦截器，使用拦截器提前对axios操控，before they are handled by then or catch.
axios.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status < 300) {
    console.log(22,res.status );
    return res;
  }
  return Promise.reject(res);
}, (error) => {
  // 网络异常
  return Promise.reject({message: '网络异常，请刷新重试', err: error});
});

if (process.__API__) {
  api = process.__API__;
} else {
  api = {
    get: function(target, params = {}) {
      const suffix = Object.keys(params).map(name => {
        return `${name}=${JSON.stringify(params[name])}`;
      }).join('&');
      const urls = `${target}?${suffix}`;
      return new Promise((resolve, reject) => {
        axios.get(urls, params).then(res => {
          resolve(res.data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    post: function(target, options = {}) {
      return new Promise((resolve, reject) => {
        axios.post(target, options).then(res => {
          resolve(res.data);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  };
}

module.exports = api;