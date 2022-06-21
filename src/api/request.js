const BASE_REMOTE_URL = "http://101.35.127.138:8080" // 真实线上环境
const BASE_URL = "http://localhost:8080" // 本机测试环境
const NET_STATUS_OK = 200
const NET_STATUS_NO_PERMIT = 401
const NET_STATUS_RESOURCE_DENY = 403
const NET_STATUS_NOT_FOUND = 404


import axios from "axios";
import QueryString from "qs";

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
})

request.interceptors.response.use(
    response => {
        if (response.status === NET_STATUS_OK) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        if (error.status.code) {
            switch (error.status.code) {
                case NET_STATUS_NO_PERMIT:
                    break;
                case NET_STATUS_RESOURCE_DENY:
                    break;
                case NET_STATUS_NOT_FOUND:
                    break;
            }
        }
        console.log(error.status.code)
        return Promise.reject(error.response)
    }
)

export function get(url, params) {
    return new Promise((resolve, reject) => {
        request.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// post方法必须要使用对提交从参数对象进行序列化的操作，所以通过node的qs模块来序列化参数
export function post(url, params) {
    return new Promise((resolve, reject) => {
        request.post(url, QueryString.stringify(params)).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}