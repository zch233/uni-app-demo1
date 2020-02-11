<template>
	<view class="content">
		<view class="userCard">
			<view class="userCard-userInfo">
				<image mode='widthFix' class="userCard-userInfo-img" src="/static/img/user.png"></image>
				<view class="userCard-userInfo-brief">
					<view class="userCard-userInfo-brief-name">
						游客
						<image mode='widthFix' src="/static/img/userVip.png"></image>
					</view>
					<view class="userCard-userInfo-brief-phone">15919191111</view>
				</view>
				<view class="userCard-userInfo-rank">普通会员</view>
			</view>
			<view class="userCard-progressBar">
				<view class="userCard-progressBar-progress">---</view>
				<view class="userCard-progressBar-time">2020-02-02 到期</view>
			</view>
			<view class="userCard-numberBar">
				<view class="userCard-numberBar-number">NO.00000 0000 0000</view>
				<view class="userCard-numberBar-button">立即续费</view>
			</view>
		</view>
		<view class="userOrder">
			<view class="userOrder-title">
				我的订单
				<image mode='widthFix' src="/static/img/right.png"></image>
			</view>
			<view class="userOrder-menu">
				<view class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu1" src="/static/img/userMenu1.png"></image>
					<view>待付款</view>
				</view>
				<view class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu2" src="/static/img/userMenu2.png"></image>
					<view>待取货</view>
				</view>
				<view class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu3" src="/static/img/userMenu3.png"></image>
					<view>待送货</view>
				</view>
				<view class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu4" src="/static/img/userMenu4.png"></image>
					<view>待评价</view>
				</view>
			</view>
		</view>
		<view class="userCoupon">
			<view class="userCoupon-title">我的卡券</view>
			<view class="userCoupon-item">1</view>
		</view>
		<view class="userSetting">
			账户设置
			<image mode='widthFix' src="/static/img/right.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
%flex {
	display: flex;
	align-items: center;
}
.content {
	padding: 4%;
	line-height: 1;
	background-color: rgb(251, 248, 251);
	min-height: 100vh;
}
.userCard {
	color: #fff;
	background-image: url('~@/static/img/userCardBg.png');
	background-repeat: no-repeat;
	background-size: 100%;
	padding: 40rpx;
	position: relative;
	z-index: 1;
	margin-bottom: 38rpx;
	&::before {
		content: '';
		left: 40rpx;
		bottom: 37rpx;
		background-image: url('~@/static/img/vvipBg.png');
		background-repeat: no-repeat;
		background-size: 100%;
		width: 315rpx;
		height: 84rpx;
		position: absolute;
	}
	&-userInfo {
		@extend %flex;
		margin-bottom: 50rpx;
		&-img {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
		&-brief {
			padding-left: 20rpx;
			font-weight: bold;
			font-size: 30rpx;
			image {
				width: 45rpx;
				vertical-align: -.2em;
				margin-left: 7rpx;
			}
			&-phone {
				font-size: 24rpx;
				margin-top: 14rpx;
				font-weight: normal;
			}
		}
		&-rank {
			position: absolute;
			right: 29rpx;
			top: 17rpx;
			color: #896837;
			font-weight: bold;
			font-size: 30rpx;
		}
	}
	&-progressBar {
		@extend %flex;
		font-size: 24rpx;
	}
	&-numberBar {
		@extend %flex;
		justify-content: space-between;
		color: #896837;
		font-weight: 26rpx;
		margin-top: 74rpx;
		font-weight: bold;
		&-button {
			border: 3rpx solid #896837;
			padding: 15rpx 22rpx;
			border-radius: 50rpx;
		}
	}
}
.userOrder {
	color: #333;
	padding-bottom: 38rpx;
	border-bottom: 2rpx solid #f2f2f2;
	&::after {
		content: '';
		background-color: rgb(54, 54, 54);
		width: 100%;
		height: 330rpx;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 0 0 50% 50% / 0 0 10% 10%;
	}
	&-title {
		@extend %flex;
		justify-content: space-between;
		font-weight: bold;
		font-size: 35rpx;
		margin-bottom: 38rpx;
		image {
			width: 18rpx;
		}
	}
	&-menu {
		@extend %flex;
		padding: 0 18rpx;
		font-size: 26rpx;
		font-weight: bold;
		justify-content: space-between;
		image.userMenu1 {
			width: 80rpx;
			margin-bottom: 51rpx;
		}
		image.userMenu2 {
			width: 60rpx;
			margin-bottom: 40rpx;
			margin-top: -11rpx;
		}
		image.userMenu3 {
			width: 84rpx;
			margin-top: -3rpx;
			margin-bottom: 48rpx;
		}
		image.userMenu4 {
			width: 73rpx;
			margin-top: -4rpx;
			margin-bottom: 47rpx;
		}
	}
}
.userCoupon {
	color: #333;
	padding: 38rpx 0;
	border-bottom: 2rpx solid #f2f2f2;
	&-title {
		font-weight: bold;
		font-size: 34rpx;
		margin-bottom: 32rpx;
	}
	&-item {
		box-shadow: 0 0 10rpx rgba(0, 0, 0, .3);
		background-repeat: no-repeat;
		background-size: 100%;
	}
	&-item.blue {
		background-image: url('~@/static/img/userCouponBlue.png');
	}
	&-item.red {
		background-image: url('~@/static/img/userCouponRed.png');
	}
	&-item.disabled {
		background-image: url('~@/static/img/userCouponDisabled.png');
	}
}
.userSetting {
	@extend %flex;
	color: #333;
	justify-content: space-between;
	font-weight: bold;
	font-size: 35rpx;
	margin: 38rpx 0;
	image {
		width: 18rpx;
	}
}
</style>
