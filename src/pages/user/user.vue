<template>
	<view class="content">
		<view class="userCard" :class="{ vvip: userVip }">
			<view class="userCard-userInfo">
				<image mode='widthFix' class="userCard-userInfo-img" :src="userAvater"></image>
				<view v-if="hasLogin" class="userCard-userInfo-brief">
					<view class="userCard-userInfo-brief-name">
						{{ userName }}
						<image mode='widthFix' v-if="userVip" src="/static/img/userVip.png"></image>
					</view>
					<view v-if="userPhone" class="userCard-userInfo-brief-phone">{{ userPhone }}</view>
				</view>
				<view v-if="!hasLogin" class="userCard-userInfo-brief" @tag="login">
					<view class="userCard-userInfo-brief-name">
						点击注册 / 登陆
						<!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button> -->
						<button open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
					</view>
				</view>
				<view class="userCard-userInfo-rank" v-if="userVip">黄金</view>
				<view class="userCard-userInfo-rank" v-if="!userVip">普通会员</view>
			</view>
			<view class="userCard-progressBar" v-if="userVip">
				<view class="userCard-progressBar-progress">
					<view class="userCard-progressBar-progress-bg"></view>
					<view class="userCard-progressBar-progress-main">
						<view class="userCard-progressBar-progress-main-leftDay">剩余XXX天</view>
					</view>
				</view>
				<view class="userCard-progressBar-time">2020-02-02 到期</view>
			</view>
			<view class="userCard-numberBar">
				<view class="userCard-numberBar-number" v-if="userVip">NO.00000 0000 0000</view>
				<navigator url="/pages/index/vipPay" class="userCard-numberBar-button" :class="{ noUserVip: !userVip }" v-if="!userVip">立即开通会员</navigator>
				<navigator url="/pages/index/vipPay" class="userCard-numberBar-button" v-if="userVip">立即续费</navigator>
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
					<text v-if="orderInfo[1]">{{ orderInfo[1] }}</text>
				</view>
				<view class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu2" src="/static/img/userMenu2.png"></image>
					<view>待取货</view>
					<text v-if="orderInfo[1]">{{ orderInfo[2] }}</text>
				</view>
				<view class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu3" src="/static/img/userMenu3.png"></image>
					<view>待收货</view>
					<text v-if="orderInfo[1]">{{ orderInfo[5] }}</text>
				</view>
				<view class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu4" src="/static/img/userMenu4.png"></image>
					<view>待评价</view>
					<text v-if="orderInfo[1]">{{ orderInfo[6] }}</text>
				</view>
			</view>
		</view>
		<view class="userCoupon">
			<view class="userCoupon-title">我的卡券</view>
			<view class="userCoupon-item blue" v-for="item in couponList" :key="item">
				<view class="userCoupon-item-left">
					<view class="userCoupon-item-left-price">￥<text>100</text></view>
					<view class="userCoupon-item-left-tips">满900元可用</view>
				</view>
				<view class="userCoupon-item-middle">
					<view class="userCoupon-item-middle-info">线上洗涤抵用券</view>
					<view class="userCoupon-item-middle-time">2020.2.3 ~ 2020.2.4</view>
				</view>
				<view class="userCoupon-item-right">立即扫码</view>
			</view>
		</view>
		<navigator url="/pages/user/setting" class="userSetting">
			账户设置
			<image mode='widthFix' src="/static/img/right.png"></image>
		</navigator>
	</view>
</template>

<script>
	import { login, updateUserInfo, getUserInfo } from '@/api/user.js'
	import { mapState, mapMutations } from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userPhone', 'userAvater', 'userName', 'userVip'])
		},
		onLoad () {
			this.getWxUserInfo()
			this.getUserInfo()
		},
		data () {
			return {
				couponList: [],
				userInfo: {}
			}
		},
		methods: {
			...mapMutations(['updateUserInfo']),
			getWxUserInfo () {
				uni.showLoading({ title: '加载中' });
				uni.getUserInfo({
					provider: 'weixin',
					success: async ({ userInfo }) => {
						this.updateUserInfo(userInfo)
						await updateUserInfo({ nickname: userInfo.nickName, avatar: userInfo.avatarUrl })
						uni.hideLoading()
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '请手动点击登陆 / 注册'
						});
					}
				});
			},
			async getUserInfo () {
				uni.showLoading({ title: '加载中' });
				const [error, { data }] = await getUserInfo()
        if (error) {
          uni.showToast({ icon: 'none', title: '获取失败' })
          return
        }
        this.userInfo = data.data.user_info
        this.orderInfo = data.data.order_count
        uni.hideLoading();
			},
			getPhoneNumber ({ detail }) {
				console.log(detail)
				if (detail.errMsg === 'getPhoneNumber:fail user deny'){
					uni.showModal({
							title: '提示',
							showCancel: false,
							content: '未授权',
					})
				} else {
					console.log('获取成功')
				}
			}
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
	box-sizing: border-box;
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
	&.vvip::before {
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
			button {
				color: #333;
				background-color: transparent;
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100vh;
				&::after {
					border: none;
				}
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
		&-progress {
			&-bg {
				width: 320rpx;
				height: 10rpx;
				background-color: rgb(184, 157, 106);
				position: relative;
				top: 10rpx;
				left: 30rpx;
				&::before, &::after {
					content: 'VIP';
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 32rpx;
					font-size: 12rpx;
					height: 16rpx;
					line-height: 16rpx;
					text-align: center;
					border-radius: 16rpx;
					z-index: 1;
				}
				&::before {
					left: -30rpx;
					background-color: #fff;
					color: rgb(184, 157, 106);
				}
				&::after {
					right: -30rpx;
					background-color: rgb(184, 157, 106);
				}
			}
			&-main {
				position: relative;
				background-image: linear-gradient(to bottom, #fff 0%, #fff 50%, transparent 50%, transparent 100%);
				width: 30%;
				height: 26rpx;
				left: 30rpx;
				border-right: 2rpx solid #fff;
				&-leftDay {
					position: absolute;
					right: -44rpx;
					width: 88rpx;
					background-color: #fff;
					color: rgb(184, 157, 106);
					line-height: 16rpx;
					height: 16rpx;
					bottom: -16rpx;
					font-size: 16rpx;
					text-align: center;
					border-radius: 16rpx;
				}
			}
		}
		&-time {
			margin-left: 70rpx;
			margin-top: -5rpx;
		}
	}
	&-numberBar {
		@extend %flex;
		justify-content: space-between;
		color: #896837;
		font-weight: 26rpx;
		margin-top: 64rpx;
		font-weight: bold;
		&-button {
			border: 3rpx solid #896837;
			padding: 15rpx 22rpx;
			border-radius: 50rpx;
			&.noUserVip {
				margin-top: 68rpx;
			}
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
		&-item {
			position: relative;
			text-align: center;
		}
		text {
			$r: 26rpx;
			position: absolute;
			right: -($r / 2);
			top: -($r / 2);
			color: #fff;
			background-color: #F22061;
			border-radius: 50%;
			line-height: $r;
			width: $r;
			height: $r;
			line-height: 1;
			font-size: 22rpx;
		}
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
		box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, .1);
		background-repeat: repeat-y;
		background-size: contain;
		border-radius: 10rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		@extend %flex;
		&-left {
			color: #F22061;
			font-size: 24rpx;
			text-align: center;
			padding: 12rpx 40rpx;
			border-right: 4rpx dashed #bbb;
			&-price {
				font-weight: bold;
				font-size: 30rpx;
				margin-bottom: 18rpx;
				text {
					font-size: 48rpx;
				}
			}
		}
		&-middle {
			flex: 1;
			padding-left: 40rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 24rpx;
			&-time {
				color: #bbb;
				margin-top: 24rpx;
			}
		}
		&-right {
			color: #fff;
			width: 2em;
			padding: 1.66em .8em;
		}
	}
	&-item.blue &-item-right {
		background-color: #309EEB;
	}
	&-item.red &-item-right {
		background-color: #F22061;
	}
	&-item.disabled &-item-right {
		background-color: #DBDBDB;
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
