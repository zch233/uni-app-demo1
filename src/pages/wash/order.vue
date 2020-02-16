<template>
	<view class="content">
		<view class="header">
			<view class="header-addressBar" @click="chooseAddress">
				<view class="header-addressBar-address">
					<view class="header-addressBar-address-home">极地创新中心</view>
					<view class="header-addressBar-address-name">姓名（先生） 156xxxxxxxx</view>
				</view>
				<image mode='widthFix' class="right2" src="/static/img/right2.png"></image>
			</view>
			<view class="header-time">
				<view class="header-time-label">取货时间</view>
				<view class="header-time-value">
					<view>约10：:30</view>
					<image mode='widthFix' class="right2" src="/static/img/right2.png"></image>
				</view>
			</view>
			<view class="header-channel">
				<view class="header-channel-label">支付方式</view>
				<view class="header-channel-value">
					<view>微信支付</view>
					<image mode='widthFix' class="right2" src="/static/img/right2.png"></image>
				</view>
			</view>
		</view>
		<view class="details">
			<view class="details-item">
				<image mode='widthFix' class="details-item-img" src="/static/img/good.png"></image>
				<view class="details-item-name">名称</view>
				<view class="details-item-total">x1</view>
				<view class="details-item-price">￥<text>69</text></view>
			</view>
			<view class="details-discountBar">
				<view class="details-discountBar-label">红包/抵用券</view>
				<view class="details-discountBar-value">-￥<text>69</text></view>
			</view>
			<view class="details-finall">
				<text class="details-finall-label">小计：</text>￥<text class="details-finall-value">69</text>
			</view>
		</view>
		<textarea class="remark" placeholder-style="color:#BFBFBF" placeholder="备注"/>
		<view class="footer">
			<view class="footer-price"><text>¥100</text>已优惠¥100</view>
			<view class="footer-button">确认支付</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		computed: {
			...mapState(['orderGoodList'])
		},
		onLoad() {
			console.log(this.orderGoodList)
		},
		methods: {
			chooseAddress () {
				uni.chooseAddress({
					success(res) {
						console.log(res.userName)
						console.log(res.postalCode)
						console.log(res.provinceName)
						console.log(res.cityName)
						console.log(res.countyName)
						console.log(res.detailInfo)
						console.log(res.nationalCode)
						console.log(res.telNumber)
					}
				})
			}
    }
  }
</script>

<style lang="scss" scoped>
.content {
	min-height: 100vh;
	background-color: rgb(243, 240, 243);
	padding-top: 20rpx;
	padding-bottom: 84rpx;
	box-sizing: border-box;
}
.right2 {
	width: 18rpx;
}
.header {
	width: 92%;
	background-color: #fff;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 30rpx 20rpx;
	border-radius: 10rpx;
	font-size: 26rpx;
	line-height: 1;
	border: 2rpx solid #f2f2f2;
	%flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	&-addressBar {
		@extend %flex;
		color: #BFBFBF;
		font-size: 22rpx;
		padding-bottom: 15rpx;
		border-bottom: 2rpx solid #f2f2f2;
		&-address {
			flex: 1;
				&-home {
				color: #333;
				font-size: 35rpx;
				margin-bottom: 12rpx;
				font-weight: bold;
			}
		}
	}
	&-time {
		padding: 20rpx 0;
		@extend %flex;
		border-bottom: 2rpx solid #f2f2f2;
		&-label {
			color: #333333;
		}
		&-value {
			color: #F22061;
			display: inline-flex;
			align-items: center;
			image {
				margin-left: 18rpx;
			}
		}
	}
	&-channel {
		@extend %flex;
		padding-top: 20rpx;
		&-label {
			color: #333333;
		}
		&-value {
			color: #F22061;
			display: inline-flex;
			align-items: center;
			image {
				margin-left: 18rpx;			}
		}
	}
}
.details {
	border: 2rpx solid #f2f2f2;
	padding: 30rpx 20rpx;
	border-radius: 10rpx;
	width: 92%;
	background-color: #fff;
	margin: 20rpx auto 30rpx;
	box-sizing: border-box;
	font-size: 26rpx;
	color: #333333;
	&-item {
		align-items: center;
		display: flex;
		margin-bottom: 30rpx;
		&:last-child {
			margin-bottom: 20rpx;
		}
		&-img {
			width: 80rpx;
			padding-right: 20rpx;
		}
		&-name {
			flex: 1;
		}
		&-total {
			width: 80rpx;
		}
		&-price {
			width: 100rpx;
			text-align: right;
			font-size: 18rpx;
			color: #E21A1A;
			text {
				font-size: 26rpx;
			}
		}
	}
	&-discountBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-top: 2rpx solid #f2f2f2;
		border-bottom: 2rpx solid #f2f2f2;
		font-size: 26rpx;
		color: #333333;
		&-value {
			font-size: 18rpx;
			color: #E21A1A;
			text {
				font-size: 26rpx;
			}
		}
	}
	&-finall {
		text-align: right;
		font-size: 18rpx;
		color: #E21A1A;
		padding-top: 22rpx;
		&-label {
			color: #333333;
			font-size: 26rpx;
		}
		text {
			font-size: 36rpx;
		}
	}
}
.remark {
	color: #333;
	font-size: 26rpx;
	padding: 20rpx;
	border-radius: 10rpx;
	width: 92%;
	background-color: #fff;
	margin: 30rpx auto;
	box-sizing: border-box;
}
.footer {
	position: fixed;
	left: 0;
	bottom: var(--window-bottom);
	color: #fff;
	font-size: 36rpx;
	background-color: rgb(173, 170, 173);
	width: 100%;
	padding: 10rpx 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	line-height: 1;
	&-price {
		font-size: 18rpx;
		text {
			border-right: 2rpx solid #fff;
			font-size: 30rpx;
			font-weight: bold;
			padding-right: .3em;
			margin-right: .3em;
		}
	}
	&-button {
		background-color: rgb(243, 31, 100);
		border-radius: 10rpx;
		font-size: 36rpx;
		font-weight: bold;
		padding: 20rpx;
	}
}
</style>
