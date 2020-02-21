<template>
	<view class="vipContent">
		<view class="vipContent-vipCard">
			<image mode='widthFix' class="vipContent-vipCard-HG" src="/static/img/vipHG.png"></image>
			<view class="vipContent-vipCard-title">开通盲果VIP乐享3大权益</view>
			<view class="vipContent-vipCard-text">很高兴在这里遇见您！希望在接下来的日子里，盲果可以成为您美好生活中的一部分，希望您能加入盲果VIP！服务即将解锁......</view>
			<view class="vipContent-vipCard-footer">
				<view class="vipContent-vipCard-footer-left">
					<image mode='widthFix' src="/static/img/vipZS.png"></image>
					<text>乐享3大权益</text>
				</view>
				<view class="vipContent-vipCard-footer-right">
					<image mode='widthFix' src="/static/img/vipFX.png"></image>
					<text>分享有礼</text>
				</view>
			</view>
		</view>
		<image mode='widthFix' class="vipContent-down" src="/static/img/vipDown.png"></image>
		<view class="vipContent-title"><text>每月领取优惠券</text></view>
		<view class="vipContent-coupon">
			<view class="vipContent-coupon-item-wrapper">
				<view class="vipContent-coupon-item">
					<view class="vipContent-coupon-item-title">门店抵用券</view>
					<view class="vipContent-coupon-item-price">￥200</view>
					<view class="vipContent-coupon-item-info">满699元可使用</view>
				</view>
				<view class="vipContent-coupon-item-tips">全年最高可领2400元</view>
			</view>
			<view class="vipContent-coupon-item-wrapper">
				<view class="vipContent-coupon-item">
					<view class="vipContent-coupon-item-title">洗涤抵用券</view>
					<view class="vipContent-coupon-item-price">￥100</view>
					<view class="vipContent-coupon-item-info">满1元可使用</view>
				</view>
				<view class="vipContent-coupon-item-tips">全年最高可领1200元</view>
			</view>
		</view>
		<view class="vipContent-title"><text>专属会员特权</text></view>
		<view class="vipContent-right">
			<view class="vipContent-right-top">
				<view class="vipContent-right-item">
					<image mode='widthFix' class="vipRight1" src="/static/img/vipRight1.png"></image>
					<view>线下购物<text>5</text>折优惠</view>
				</view>
				<view class="vipContent-right-item">
					<image mode='widthFix' class="vipRight2" src="/static/img/vipRight2.png"></image>
					<view>线上洗涤<text>7</text>折优惠</view>
				</view>
				<view class="vipContent-right-item">
					<image mode='widthFix' class="vipRight3" src="/static/img/vipRight3.png"></image>
					<view>会员<text>免</text>运费</view>
				</view>
			</view>
			<view class="vipContent-right-bottom">
				<view class="vipContent-right-item">
					<image mode='widthFix' class="vipRight4" src="/static/img/vipRight4.png"></image>
					<view>年享优惠未满3000元</view>
					<view><text>退</text>全年年费</view>
				</view>
				<view class="vipContent-right-item">
					<image mode='widthFix' class="vipRight5" src="/static/img/vipRight5.png"></image>
					<view>年累计干洗券 / 优惠券用满</view>
					<view>15张可<text>免</text>次年年费</view>
				</view>
			</view>
		</view>
		<view class="vipContent-title"><text>分享有礼</text></view>
		<view class="vipContent-gift">
			<image mode='widthFix' class="vipGift" src="/static/img/vipGift.png"></image>
			<image mode='widthFix' class="vipGiftBg" src="/static/img/vipGiftBg.png"></image>
			<view class="vipContent-gift-info">
				<view class="vipContent-gift-infoTitle">邀请有礼</view>
				<view class="vipContent-gift-infoTips">邀请好友即可获得￥1000</view>
				<navigator class="vipContent-gift-infoNav" url="/pages/index/vipDetail">查看详情</navigator>
			</view>
		</view>
		<view class="vipContent-shareBar">
			<view class="vipContent-shareBar-button" @click="save">生成海报</view>
			<navigator class="vipContent-shareBar-button" url="/pages/index/vipShare">面对面分享</navigator>
		</view>
		<navigator url="/pages/index/vipPay" class="vipContent-buyButton">￥<text>998/</text>年 购买会员权益</navigator>
		<uniPopup ref="popup" :maskClick="false">
			<view class="content-couponWrapper">
				<view class="content-couponTitle">会员好礼！</view>
				<scroll-view class="content-couponList" scroll-y scroll-with-animation style="height:680rpx;width: 100%;">
          <view class="content-couponList-item" v-for="item in couponList" :key="item.id">
            <view class="content-couponList-item-left">
              <view class="content-couponList-item-left-price">￥<text>{{ item.coupon_price * 1 }}</text></view>
              <view class="content-couponList-item-left-tips">全场通用</view>
            </view>
            <view class="content-couponList-item-right">
              <view class="content-couponList-item-right-title">{{ item.coupon_name }}</view>
              <view class="content-couponList-item-right-tips">满{{ item.condition }}元使用</view>
              <view class="content-couponList-item-right-time">{{ item.coupon_start_time }}-{{ item.coupon_end_time }}</view>
            </view>
          </view>
        </scroll-view>
			</view>
			<view @click="$refs.popup.close()" class="content-couponButton">确认</view>
		</uniPopup>
		<canvas canvas-id="shareCanvas" style="position:absolute;width:750px;height:1798px;z-index:-1;top:0;left:0;transform:scale(0.01);"></canvas>
	</view>
</template>

<script>
  import uniPopup from 'components/uni-popup/uni-popup.vue'
	import { mapState } from 'vuex'
	import { getQRCode, getCouponList } from '@/api/user'

	export default {
    components: { uniPopup },
		data () {
			return {
				couponList: [],
				title: 'zch'
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad(e) {
			this.init(e)
		},
		methods: {
			init ({ invite_uid }) {
				// this.checkLogin(invite_uid)
			},
			checkLogin (invite_uid) {
				if (!this.hasLogin) {
					uni.login({
						provider: 'weixin',
						success: async ({ code }) => {
							uni.showLoading({ title: '加载中' });
							this.$store.dispatch('login', { code, invite_uid }).then(() => {
								uni.hideLoading();
								console.log('登陆成功')
								uni.showModal({
									title: '未登录',
									content: '您未登录，需要登录后才能继续',
									/**
									 * 如果需要强制登录，不显示取消按钮.
									 */
									showCancel: !this.forcedLogin,
									success: (res) => {
										if (res.confirm) {
											uni.reLaunch({
												url: '../user/user'
											});
										}
									}
								});
							})
						},
						fail: (err) => {
							console.error('授权登录失败：' + JSON.stringify(err));
						}
					});
				} else {
					this.getShareCoupon()
				}
			},
			async getShareCoupon () {
        const [error , { data }] = await getCouponList({ status: 1, page_size: 999 })
        if (error) {
          uni.showToast({ icon: 'none', title: '获取优惠券失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
				this.couponList = data.data.data.map(v => {
					v.coupon_start_time = this.time(v.coupon_start * 1000).split(' ')[0].replace(/\-/g, '.')
					v.coupon_end_time = this.time(v.coupon_end * 1000).split(' ')[0].replace(/\-/g, '.')
					return v
				})
				if (this.couponList.length > 0) {
					this.$refs.popup.open()
				}
			},
			async getQRCode () {
        uni.showLoading({ title: '正在生成分享' });
        const [error , { data }] = await getQRCode()
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '分享生成失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
				return data.data.img
			},
			async save () {
				const img = await this.getQRCode({ type: 2 })
				const ctx = wx.createCanvasContext('shareCanvas');
				ctx.drawImage('/static/img/poster.png', 0, 0, 750, 1798);
				ctx.drawImage(img, 154, 1592, 147, 147);
				ctx.draw(true, function () {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: 750,
						height: 1798,
						canvasId: 'shareCanvas',
						success: function (res) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: (res) => {
									uni.showToast({ title: '保存成功' })
								},
								fail: (err) => {
									uni.showToast({ icon: 'none', title: '保存失败' })
								}
							})
						}
					})
				})
			},
			time (time = +new Date()) {
				let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
				return date.toJSON().substr(0, 19).replace('T', ' ');
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		&-couponWrapper {
			width: 622rpx;
			height: 778rpx;
			color: #BEA26F;
			background-image: url('~@/static/img/vipCouponBg2.png');
			background-repeat: no-repeat;
			background-size: cover;
			padding: 86rpx 53rpx 9rpx;
			position: relative;
			box-sizing: border-box;
		}
		&-couponWrapper::before {
			content: '';
			position: absolute;
			width: 691rpx;
			background-image: url('~@/static/img/vipCouponBg1.png');
			background-repeat: no-repeat;
			background-size: cover;
			height: 538rpx;
			top: -50rpx;
			left: -33rpx;
			z-index: 2;
		}
		&-couponTitle {
			position: absolute;
			top: -14rpx;
			left: -14rpx;
			color: #7D582C;
			font-size: 36rpx;
			width: 100%;
			height: 159rpx;
			background-image: url('~@/static/img/vipCouponBg3.png');
			background-repeat: no-repeat;
			background-size: cover;
			padding-top: 1em;
			box-sizing: border-box;
			text-align: center;
			z-index: 1;
		}
		&-couponList {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			white-space: nowrap;
			-webkit-overflow-scrolling : touch;
			&-item {
				box-sizing: border-box;
				width: 100%;
				margin: 0 auto 50rpx;
				overflow: hidden;
				position: relative;
				z-index: 0;
				display: flex;
				line-height: 1;
				align-items: center;
				padding: 4px;
				background-image: url('~@/static/img/vipCouponBg.png');
				background-repeat: no-repeat;
				background-size: 100%;
				&-left {
					padding: 56rpx 12rpx 58rpx 0;
					color: #7D582C;
					font-size: 30rpx;
					text-align: center;
					&-price {
						color: #DCB17E;
						font-size: 50rpx;
						margin-bottom: 6rpx;
						text {
							font-size: 110rpx;
							font-weight: 400;
							margin-left: -6rpx;
						}
					}
				}
				&-right {
					padding-left: 16rpx;
					&-title {
						font-size: 36rpx;
						color: #7D582C;
						margin-top: 16rpx;
					}
					&-tips {
						font-size: 30rpx;
						color: #C09E77;
						margin: 14rpx 0 20rpx;
					}
					&-time {
						font-size: 24rpx;
						color: #C09E77;
						white-space: nowrap;
					}
				}
			}
		}
		&-couponButton {
			color: #fff;
			background-color: rgb(211, 170, 125);
			border: 2rpx solid rgb(196, 123, 69);
			box-shadow: 0 0 0 10rpx rgb(211, 170, 125);
			border-radius: 89rpx;
			font-size: 36rpx;
			line-height: 2;
			width: 60%;
			margin: 0 auto;
			margin-top: 40rpx;
			text-align: center;
		}
	}
	.vipContent {
		color: #BEA26F;
		background-image: url('~@/static/img/vipBg.png');
		background-repeat: no-repeat;
		background-size: cover;
		padding: 40rpx 0;
		text-align: center;
		overflow: hidden;
	}
	.vipContent-vipCard {
		border: 5rpx solid #BEA26F;
		width: 92%;
		box-sizing: border-box;
		margin: 0 auto;
		padding: 20rpx 60rpx;
		border-radius: 20rpx;
	}
	.vipContent-vipCard-HG {
		width: 70rpx;
	}
	.vipContent-vipCard-title {
		font-size: 45rpx;
		font-weight: bold;
		margin: 20rpx 0;
		line-height: 1;
		background: linear-gradient(88deg,rgba(228,208,171,1) 0%, rgba(184,150,88,1) 50.78125%, rgba(223,202,164,1) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.vipContent-vipCard-text {
		font-size: 18rpx;
		line-height: 1.8;
		text-align: left;
	}
	.vipContent-vipCard-footer {
		display: flex;
		margin-top: 44rpx;
		justify-content: space-between;
	}
	.vipContent-vipCard-footer-left, .vipContent-vipCard-footer-right {
		font-size: 30rpx;
		display: inline-flex;
		align-items: center;
	}
	.vipContent-vipCard-footer-left image {
		width: 46rpx;
		margin-right: 12rpx;
	}
	.vipContent-vipCard-footer-right image {
		width: 41rpx;
		margin-right: 12rpx;
	}
	.vipContent-down {
		width: 129rpx;
		margin: 14rpx 0 40rpx;
	}
	.vipContent-title {
		padding-bottom: 52rpx;
	}
	.vipContent-title text {
		font-size: 36rpx;
		line-height: 1;
		position: relative;
	}
	.vipContent-title text::before, .vipContent-title text::after {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 3em;
		height: 2rpx;
		background-color: #BEA26F;
	}
	.vipContent-title text::before {
		right: calc(100% + .4em);
	}
	.vipContent-title text::after {
		left: calc(100% + .4em);
	}
	.vipContent-coupon {
		display: flex;
		justify-content: space-between;
		padding: 0 10%;
		line-height: 1;
		color: #E5D0A4;
		margin-bottom: 100rpx;
	}
	.vipContent-coupon-item-wrapper {
		text-align: center;
		width: 255rpx;
	}
	.vipContent-coupon-item {
		text-align: right;
		background-image: url('~@/static/img/vipCoupon.png');
		background-repeat: no-repeat;
		background-size: 100%;
		position: relative;
		padding: 18rpx 14rpx 10rpx 60rpx;
	}
	.vipContent-coupon-item::before {
		content: '券';
		font-size: 58rpx;
		left: 20rpx;
		bottom: 20rpx;
		position: absolute;
	}
	.vipContent-coupon-item-title {
		font-size: 36rpx;
	}
	.vipContent-coupon-item-price {
		font-size: 50rpx;
		font-weight: bold;
		margin: 18rpx 0 6rpx;
		padding-right: .1em;
	}
	.vipContent-coupon-item-info {
		font-size: 12rpx;
		color: #BEA26F;
		padding-right: 2em;
		margin-bottom: 10rpx;
	}
	.vipContent-coupon-item-tips {
		font-size: 18rpx;
		color: #BEA26F;
		margin-top: 4rpx;
	}
	.vipContent-right view {
		margin-bottom: 10rpx;
	}
	.vipContent-right text {
		font-size: 30rpx;
		font-weight: bold;
		padding: 0 .2em;
	}
	.vipContent-right-top, .vipContent-right-bottom {
		display: flex;
		text-align: center;
		line-height: 1;
		color: #E5D0A4;
		font-size: 18rpx;
		justify-content: space-between;
		letter-spacing: .1em;
	}
	.vipContent-right-top {
		padding: 0 10%;
	}
	.vipContent-right-top image {
		margin-bottom: 18rpx;
	}
	.vipContent-right-top image.vipRight1 {
		width: 109rpx;
	}
	.vipContent-right-top image.vipRight2 {
		width: 100rpx;
	}
	.vipContent-right-top image.vipRight3 {
		width: 109rpx;
	}
	.vipContent-right-top image.vipRight4 {
		width: 117rpx;
	}
	.vipContent-right-top image.vipRight5 {
		width: 117rpx;
	}
	.vipContent-right-bottom {
		padding: 38rpx 18% 72rpx;
	}
	.vipContent-right-bottom image {
		width: 115rpx;
		margin-bottom: 18rpx;
	}
	.vipContent-gift {
		display: flex;
		padding: 27rpx 28rpx 30rpx;
		align-items: center;
		border: 3rpx solid #E5D0A4;
		border-radius: 20rpx;
		width: 92%;
		margin: 0 auto;
		box-sizing: border-box;
		position: relative;
		line-height: 1;
	}
	.vipContent-gift .vipGift {
		width: 177rpx;
		padding-left: 84rpx;
	}
	.vipContent-gift .vipGiftBg {
		width: 294rpx;
		position: absolute;
		top: 30rpx;
		left: 28rpx;
	}
	.vipContent-gift-info {
		padding-left: 63rpx;
	}
	.vipContent-gift-infoTitle {
		font-size: 46rpx;
		color: #BEA26F;
	}
	.vipContent-gift-infoTips {
		font-size: 24rpx;
		margin: 19rpx 0 27rpx;
	}
	.vipContent-gift-infoNav {
		font-size: 24rpx;
		color: #333333;
		padding: 8rpx 12rpx;
		background-image: linear-gradient(to left,rgba(228,208,171,1) 0%, rgba(184,150,88,1) 100%);;
		border-radius: 5rpx;
		display: inline-block;
	}
	.vipContent-shareBar {
		display: flex;
		justify-content: space-between;
		width: 92%;
		margin: 30rpx auto 39rpx;
		color: #333333;
		font-size: 42rpx;
	}
	.vipContent-shareBar-button {
		width: 264rpx;
		background-image: linear-gradient(to left,rgba(228,208,171,1) 0%, rgba(184,150,88,1) 100%);;
		border-radius: 5rpx;
		line-height: 83rpx;
		text-align: center;
		border-radius: 5rpx;
	}
	.vipContent-buyButton {
		text-align: center;
		width: 92%;
		margin: 0 auto;
		color: #333333;
		font-size: 50rpx;
		background-image: linear-gradient(to left,rgba(228,208,171,1) 0%, rgba(184,150,88,1) 100%);;
		border-radius: 100rpx;
		padding: 12rpx 0 14rpx;
		line-height: 1;
		font-weight: bold;
	}
	.vipContent-buyButton text {
		font-size: 80rpx;
	}
</style>
