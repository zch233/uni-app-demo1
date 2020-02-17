<template>
	<view class="content">
		<view class="card firstFloor">
			<view class="packageBar">
				<image mode='widthFix' src="/static/img/orderDetail-package.png"></image>
				<view>
					<view class="firstFloor-name">包裹正在等待揽收</view>
					<view class="firstFloor-time">2020/02/02 15:23</view>
				</view>
			</view>
			<view class="storeBar">
				<image mode='widthFix' src="/static/img/orderDetail-store.png"></image>
				<view>
					<view class="firstFloor-name">门店名称<text>15655191620</text></view>
					<view class="firstFloor-address">浙江省杭州市江干区 九堡街道 九堡家苑二区9排 29号</view>
					<view class="firstFloor-time">2020/02/02 15:23</view>
				</view>
			</view>
			<view class="locationBar">
				<image mode='widthFix' src="/static/img/orderDetail-location.png"></image>
				<view>
					<view class="firstFloor-name">唐泽（先生）<text>15655191620</text></view>
					<view class="firstFloor-address">浙江省杭州市江干区 九堡街道 九堡家苑二区9排 29号</view>
					<view class="firstFloor-time">2020/02/02 15:23</view>
				</view>
			</view>
		</view>
		<view class="card secondFloor">
			<view class="secondFloor-goodItem">
				<image mode='widthFix' src="/static/img/good.png"></image>
				<view>上衣x2</view>
				<view class="secondFloor-goodItem-price">￥29</view>
			</view>
			<view class="secondFloor-cancelButton"><text>取消订单</text></view>
			<view class="secondFloor-infoItem">
				<text>商品总价</text>
				<text>¥199</text>
			</view>
			<view class="secondFloor-infoItem">
				<text>运费</text>
				<text>¥0</text>
			</view>
			<view class="secondFloor-priceItem">
				<text>实付款</text>
				<view>¥199</view>
			</view>
		</view>
		<view class="card thirdFloor">
			<view class="thirdFloor-title">订单信息</view>
			<view class="thirdFloor-info">订单编号：123456789123</view>
			<view class="thirdFloor-info">创建时间：2020/02/02 16:14</view>
			<view class="thirdFloor-info">付款时间：2020/02/02 16:14</view>
			<view class="thirdFloor-info">取货时间：2020/02/02 16:14</view>
			<view class="thirdFloor-info">成交时间：2020/02/02 16:14</view>
		</view>
		<view class="buttonBar">
			<view class="buttonBar-store">联系门店</view>
			<view class="buttonBar-express">联系顺风</view>
		</view>
		<view class="payNow">立即支付</view>
	</view>
</template>

<script>
	export default {
		onLoad (e) {
			console.log(e.id, 'id')
		},
		methods: {
			async getOrderDetail () {}
    }
	}
</script>

<style lang="scss" scoped>
.content {
	background-color: rgb(247, 247, 247);
	min-height: 100vh;
	padding: 0 4%;
	color: #333;
	padding-bottom: 100rpx;
	.card {
		border-radius: 20rpx;
		background-color: #fff;
		padding: 30rpx 20rpx;
		margin-bottom: 28rpx;
	}
	.firstFloor {
		> view {
			display: flex;
			font-size: 26rpx;
			color: #333;
			margin-bottom: 78rpx;
			position: relative;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.packageBar::before {
			content: '';
			position: absolute;
			top: 60rpx;
			left: 40rpx;
			width: 2rpx;
			height: 84rpx;
			background-image: linear-gradient(to bottom, rgb(242, 190, 81) 0%, rgb(242, 190, 81) 50%, rgb(107, 170, 247) 50%, rgb(107, 170, 247) 100%);
		}
		.storeBar::before {
			content: '';
			position: absolute;
			top: 54rpx;
			left: 40rpx;
			width: 2rpx;
			height: 200rpx;
			background-image: linear-gradient(to bottom, rgb(107, 170, 247) 0%, rgb(107, 170, 247) 50%, rgb(242, 51, 111) 50%, rgb(242, 51, 111) 100%);
		}
		image {
			width: 60rpx;
			margin-right: 22rpx;
			margin-left: 10rpx;
		}
		&-name {
			text {
				margin-left: 18rpx;
				font-size: 20rpx;
			}
		}
		&-address {
			line-height: 1.4;
			margin-top: 8rpx;
		}
		&-time {
			font-size: 20rpx;
			margin-top: 4rpx;
		}
	}
	.secondFloor {
		&-goodItem {
			display: flex;
			font-size: 30rpx;
			margin-bottom: 19rpx;
			&-price {
				flex: 1;
				text-align: right;
			}
			image {
				width: 120rpx;
				margin-right: 22rpx;
				border-radius: 6rpx;
			}
		}
		&-cancelButton {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-bottom: 30rpx;
			> text {
				font-size: 28rpx;
				padding: 12rpx 24rpx;
				border-radius: 80rpx;
				border: 2rpx solid #f2f2f2;
			}
		}
		&-infoItem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #858585;
			font-size: 26rpx;
			line-height: 1;
			margin-bottom: 20rpx;
		}
		&-priceItem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30rpx;
			padding-top: 18rpx;
			border-top: 2rpx solid 	#f2f2f2;
			> view {
				color: #E21A1A;
			}
		}
	}
	.thirdFloor {
		> view {
			margin-bottom: 18rpx;
			font-size: 30rpx;
			&:last-child {
				margin-bottom: 0;
			}
		}
		&-title {
			font-weight: bold;
		}
	}
	.buttonBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
		padding: 0 60rpx;
		> view {
			padding: 18rpx 42rpx;
			border-radius: 10rpx;
			color:#fff;
			font-size: 36rpx;
		}
		&-store {
			background-color: rgb(99, 166, 242);
		}
		&-express {
			background-color: rgb(53, 50, 53);
		}
	}
	.payNow {
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgb(241, 33, 96);
		color: #fff;
		padding: 22rpx 0;
		width: calc(92% - 120rpx);
		border-radius: 10rpx;
		font-size: 36rpx;
		text-align: center;
	}
}
</style>
