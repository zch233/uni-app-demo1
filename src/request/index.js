export default function request(url, data = {}, way) {
    // 获取自定义的code
    const access_token = uni.getStorageSync('access_token')
    // 进行请求
    // 若出现用户凭证失效问题，可以在这里先做处理，我暂时没做。
    return uni.request({
        url: 'https://wx.mangguovvip.com' + url,
        data: access_token ? Object.assign({}, data, { access_token }) : data,
        // 获取设置请求方式
        method: way || 'POST'
    });
}
 