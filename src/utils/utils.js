export default {
    isRequestSuccess(res) {
        if (res && res.code && res.success) {
            return true;
        }
        return false;
    },
    getCookieByName(name) {
        let cookies = unescape(document.cookie).split(";")
        console.log(cookies)
        for (let i = 0; i < cookies.length; i++) {
            let obj = cookies[i].split("=")
            if (obj[0] === name) {
                return obj[1];
            }
        }
        return null
    },
    clearCookieByName(name) {
        document.cookie = name + "=";
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
    }

}