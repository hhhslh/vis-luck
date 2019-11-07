import axios from 'axios'
import Qs from 'qs'
import Vue from "vue"

// 封装get方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

// 封装post方法 qs将提交的参数对象进行序列化
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

//环境地址
Vue.prototype.axios = axios

//生产环境
axios.defaults.baseURL = "https://data.xinxueshuo.cn/nsi-1.0/"

//测试环境
// axios.defaults.baseURL =  "http://192.168.0.18:8080/nsi-1.0"
