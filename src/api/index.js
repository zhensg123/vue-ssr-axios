import api from "create-api"
export function fetchItem(id) {

  return new Promise(function(resolve, reject) {
    api.get("http://www.youxuewang.com.cn/shouji/home/LoadProducts", {
      pageno: 1,
      pagesize: 200,
      condstr: '社会大课堂:0'
    }).then(function(res) {
      resolve({ text: JSON.stringify(res)});

    }).catch(function() {
      console.log(222222222222222);
    });
  })

  //return Promise.resolve(obj)
}
