export default {
    isRequestSuccess(res) {
        if (res && res.code && res.success) {
            return true;
        }
        return false;
    },
    clearCookieByName(name) {
        document.cookie = name + "=";
    },
    getCookieByName(name) {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let obj = cookies[i].split("=");
            console.log(obj[1])
            // trim剔除多余的空格
            if (obj[0].trim() === name) {
                return obj[1]
            }
        }
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

}

export const languages = {
    "Java": 70,
    "C": 70,
    "C++": 60,
    "Python": 50,
    "Go": 50,
    "C#": 50,
    "SQL": 50,
    "Rust": 50,
    "JavaScript": 50,
    "Android": 50,
    "Dart": 50,
    "Kotlin": 50
}
