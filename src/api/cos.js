var COS = require('cos-js-sdk-v5');
const bucket = "echo-1312614853"
const Region = 'ap-nanjing';
import utils from "@/utils/utils";
// 先请求服务器获取临时的secretKey和id, 然后再发请求
// 这样不会把服务全局key暴露在前端, 更加安全
export const cos = new COS({
    // getAuthorization 必选参数
    getAuthorization: function (options, callback) {
        // 前期用官方给的xhr请求, 后期考虑用axios
        var url = 'http://localhost:8080/util/requestCOSKey'; // url替换成您自己的后端服务
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        // 还是要先拿到token
        let token = utils.getCookieByName("token")
        // 先设置token
        xhr.setRequestHeader('token', token);
        xhr.onload = function (e) {
            try {
                var data = JSON.parse(e.target.responseText);
                console.log(data.data)
                var credentials = data.data.credentials;
            } catch (e) {
            }
            if (!data || !credentials) {
                return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2))
            }
            ;
            callback({
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                SecurityToken: credentials.sessionToken,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: data.data.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: data.data.expiredTime, // 时间戳，单位秒，如：1580000000
            });
        };
        xhr.send();
    }
});
export const uploadSimpleImage = (file, func) => {
    let name = utils.generateUUID()
    cos.putObject({
        Bucket: 'echo-1312614853', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: 'echo/post/cover/' + name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file,
    }, func)
}