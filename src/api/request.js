const BASE_REMOTE_URL = "http://101.35.127.138:8080" // 真实线上环境
const BASE_URL = "http://localhost:8080" // 本机测试环境
const NET_STATUS_OK = 200
const NET_STATUS_NO_PERMIT = 401
const NET_STATUS_RESOURCE_DENY = 403
const NET_STATUS_NOT_FOUND = 404


import axios from "axios";
import utils from "@/utils/utils"

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})
request.defaults.headers["Content-Type"] = "application/json"

// 配置请求拦截器
request.interceptors.request.use(
    req => {
        // 看Cookie中有没有token请求头, 如果有就加上
        console.log("on axios request interceptor")
        let token = utils.getCookieByName("token")
        if (token != null) {
            req.headers["token"] = token
        }
        return req
    },
    error => {

    }
)
request.interceptors.response.use(
    response => {
        if (response.status === NET_STATUS_OK) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        if (error.status) {
            console.log(error.status.code)
            switch (error.status.code) {
                case NET_STATUS_NO_PERMIT:
                    break;
                case NET_STATUS_RESOURCE_DENY:
                    break;
                case NET_STATUS_NOT_FOUND:
                    break;
            }
        }
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
        request.post(url, JSON.stringify(params)).then(res => {
            console.log(JSON.stringify(params))
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}