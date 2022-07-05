import Cookies from "js-cookie";

export default {
    isRequestSuccess(res) {
        if (res && res.code && res.success) {
            return true;
        }
        return false;
    },
    clearCookieByName(name) {
        Cookies.remove(name)
    },
    getCookieByName(name) {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let obj = cookies[i].split("=");
            // trim剔除多余的空格
            if (obj[0].trim() === name) {
                return obj[1]
            }
        }
    },
    setObjectToLocalStorage(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    removeObjectFromLocalStorage(key) {
        window.localStorage.removeItem(key)
    },
    getObjectFromLocalStorage(key) {
        return JSON.parse(window.localStorage.getItem(key))
    },
    isNullOrNil(str) {
        if (str == null || str.length < 1) {
            return true
        }
        return false
    },
    // Element-UI校验合格性通用方法
    isFormValid(formName, vueComponent) {
        let res;
        vueComponent.$refs[formName].validate((valid) => {
            if (valid) {
                res = true
            } else {
                res = false
            }
        });
        return res
    },
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    //文档高度
    getDocumentTop() {
        var scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },

//可视窗口高度
    getWindowHeight() {
        var windowHeight = 0;
        if (document.compatMode === "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },

//滚动条滚动高度
    getScrollHeight() {
        var scrollHeight = 0,
            bodyScrollHeight = 0,
            documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }


}

export const languages = {
    "Java": 1 << 2,
    "C": 1,
    "C++": 1 << 1,
    "Python": 1 << 3,
    "Go": 1 << 8,
    "C#": 1 << 7,
    "Rust": 1 << 8,
    "JavaScript": 1 << 4,
    "Android": 1 << 10,
    "Dart": 1 << 14,
    "Kotlin": 1 << 11,
    "iOS": 1 << 13,
    "Swift": 1 << 12,
    "HTML": 1 << 5,
    "CSS": 1 << 6
}

export const categories = {
    "前端": 1,
    "后端": 1 << 1,
    "数据库": 1 << 2,
    "操作系统": 1 << 3,
    "网络": 1 << 4,
    "游戏": 1 << 5,
    "大数据": 1 << 6,
    "人工智能": 1 << 7,
    "测试": 1 << 8,
    "安全": 1 << 9,
    "小程序": 1 << 10,
    "软件工程": 1 << 11
}
