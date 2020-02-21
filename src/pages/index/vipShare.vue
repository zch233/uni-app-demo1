<template>
	<view class="content">
		<image mode='widthFix' class="vipCodeBg" src="/static/img/vipShareCodeBg.png"></image>
		<image mode='widthFix' class="qrcode" :src="qrcode"></image>
    <button class="saveButton" @tap="saveQRCode">保存到本地</button>
	</view>
</template>

<script>
  import { getQRCode } from '@/api/user'

	export default {
		data () {
			return {
				qrcode: '/static/img/qrcode.png',
			}
		},
    onLoad() {
			this.getQRCode()
		},
		methods: {
			async getQRCode () {
        uni.showLoading({ title: '正在生成分享' });
        const [error , { data }] = await getQRCode({ type: 1 })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '分享生成失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
				this.qrcode = data.data.img
			},
			saveQRCode () {
				const aa = wx.getFileSystemManager();
				aa.writeFile({
					filePath: `${wx.env.USER_DATA_PATH}/qrcode.png`,
					data: this.qrcode.slice(22),
					encoding: 'base64',
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: `${wx.env.USER_DATA_PATH}/qrcode.png`,
							success: function (res) {
								uni.showToast({ title: '保存成功'})
							},
							fail: function (err) {
								uni.showToast({ icon: 'none', title: '保存失败' })
							}
						})
					}, fail: err => {
						console.log(err)
					}
			 })
			}
		},
	}
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background-color: rgb(31, 33, 35);
  background-image: url('~@/static/img/vipShareBg.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  .vipCodeBg {
    width: 446rpx;
    position: absolute;
    top: 291rpx;
    left: 50%;
    transform: translateX(-50%);
  }
	.qrcode {
		width: 292rpx;
		position: absolute;
    top: 358rpx;
    left: 50%;
		border-radius: 50%;
    transform: translateX(-50%);
	}
  .saveButton {
    position: absolute;
    top: 993rpx;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(228, 174, 129);
    padding: 49rpx 158rpx;
    line-height: 1;
    border-radius: 10rpx;
    white-space: nowrap;
    color: #333;
    font-size: 36rpx;
  }
}
</style>
