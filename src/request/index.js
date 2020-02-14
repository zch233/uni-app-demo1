export default function request(url, data, way) {
    // 获取自定义的code
    const access_token = uni.getStorageSync('access_token')
    // 进行请求
    return uni.request({
        url: 'https://wx.mangguovvip.com' + url,
        data: data,
        // 获取设置请求方式
        method: way || 'POST'
    });
}
 