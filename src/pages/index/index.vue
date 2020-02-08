<template>
	<view class="vipContent">
		<view class="vipContent-vipCard">
			<image class="vipContent-vipCard-HG" src="/static/img/vipHG.png"></image>
			<view class="vipContent-vipCard-title">开通盲果VIP乐享3大权益</view>
			<view class="vipContent-vipCard-text">很高兴在这里遇见您！希望在接下来的日子里，盲果可以成为您美好生活中的一部分，希望您能加入盲果VIP！服务即将解锁......</view>
			<view class="vipContent-vipCard-footer">
				<view class="vipContent-vipCard-footer-left">
					<image src="/static/img/vipZS.png"></image>
					<text>乐享3大权益</text>
				</view>
				<view class="vipContent-vipCard-footer-right">
					<image src="/static/img/vipFX.png"></image>
					<text>分享有礼</text>
				</view>
			</view>
		</view>
		<image class="vipContent-down" src="/static/img/vipDown.png"></image>
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
		<view class="vipContent-title"><text>分享有礼</text></view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		data () {
			return {
				title: 'zch'
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
			// this.init()
		},
		methods: {
			init () {
				if (!this.hasLogin) {
					uni.showModal({
						title: '未登录',
						content: '您未登录，需要登录后才能继续',
						/**
						 * 如果需要强制登录，不显示取消按钮
						 */
						showCancel: !this.forcedLogin,
						success: (res) => {
							if (res.confirm) {
								/**
								 * 如果需要强制登录，使用reLaunch方式
								 */
								if (this.forcedLogin) {
									uni.reLaunch({
										url: '../login/login'
									});
								} else {
									uni.navigateTo({
										url: '../login/login'
									});
								}
							}
						}
					});
				}
			}
		},
	}
</script>

<style>
	.vipContent {
		color: #BEA26F;
		background-image: url('~@/static/img/vipBg.png');
		background-repeat: no-repeat;
		background-size: cover;
		padding: 40rpx 0;
		text-align: center;
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
		height: 52rpx;
	}
	.vipContent-vipCard-title {
		font-size: 45rpx;
		font-weight: bold;
		margin: 20rpx 0;
		line-height: 1;
		background:linear-gradient(88deg,rgba(228,208,171,1) 0%, rgba(184,150,88,1) 50.78125%, rgba(223,202,164,1) 100%);
		-webkit-background-clip:text;
		-webkit-text-fill-color:transparent;
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
		height: 40rpx;
		margin-right: 12rpx;
	}
	.vipContent-vipCard-footer-right image {
		width: 41rpx;
		height: 41rpx;
		margin-right: 12rpx;
	}
	.vipContent-down {
		width: 129rpx;
		height: 51rpx;
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
		margin-bottom: 115rpx;
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
</style>
