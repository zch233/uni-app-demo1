<template>
	<view class="content">
		<view class="userCard" :class="{ vvip: userVip }">
			<view class="userCard-userInfo">
				<image mode='widthFix' class="userCard-userInfo-img" :src="userAvater" @tap="goToProfile"></image>
				<view v-if="hasLogin" class="userCard-userInfo-brief" @tap="goToProfile">
					<view class="userCard-userInfo-brief-name">
						{{ userName }}
						<image mode='widthFix' v-if="userVip" src="/static/img/userVip.png"></image>
					</view>
					<view v-if="userPhone" class="userCard-userInfo-brief-phone">{{ userPhone }}</view>
				</view>
				<view v-if="!hasLogin" class="userCard-userInfo-brief">
					<view class="userCard-userInfo-brief-name">
						点击注册 / 登陆
						<button open-type="getUserInfo" @getuserinfo="getWxUserInfo"></button>
					</view>
				</view>
				<view class="userCard-userInfo-rank" v-if="userVip">黄金会员</view>
				<view class="userCard-userInfo-rank" v-if="!userVip">普通会员</view>
			</view>
			<view class="userCard-progressBar" v-if="userVip">
				<view class="userCard-progressBar-progress">
					<view class="userCard-progressBar-progress-bg"></view>
					<view class="userCard-progressBar-progress-main" :style="{ width: `${1 - twoDateDays / 365}%` }">
						<view class="userCard-progressBar-progress-main-leftDay">剩余{{ twoDateDays }}天</view>
					</view>
				</view>
				<view class="userCard-progressBar-time">{{ userInfoMember_time }} 到期</view>
			</view>
			<view class="userCard-numberBar">
				<view class="userCard-numberBar-number" v-if="userVip">NO.{{ userVipInfo.uid }}</view>
				<navigator url="/pages/index/vipPay" class="userCard-numberBar-button" :class="{ noUserVip: !userVip }" v-if="!userVip">立即开通会员</navigator>
				<navigator url="/pages/index/vipPay" class="userCard-numberBar-button" v-if="userVip">立即续费</navigator>
			</view>
		</view>
		<view class="userOrder">
			<navigator url="/pages/user/order?page=0" class="userOrder-title">
				我的订单
				<image mode='widthFix' src="/static/img/right.png"></image>
			</navigator>
			<view class="userOrder-menu">
				<navigator url="/pages/user/order?page=1" class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu1" src="/static/img/userMenu1.png"></image>
					<view>待付款</view>
					<text v-if="orderInfo[1]">{{ orderInfo[1] }}</text>
				</navigator>
				<navigator url="/pages/user/order?page=2" class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu2" src="/static/img/userMenu2.png"></image>
					<view>待取货</view>
					<text v-if="orderInfo[2]">{{ orderInfo[2] }}</text>
				</navigator>
				<navigator url="/pages/user/order?page=3" class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu3" src="/static/img/userMenu3.png"></image>
					<view>待收货</view>
					<text v-if="orderInfo[5]">{{ orderInfo[5] }}</text>
				</navigator>
				<navigator url="/pages/user/order?page=4" class="userOrder-menu-item">
					<image mode='widthFix' class="userMenu4" src="/static/img/userMenu4.png"></image>
					<view>待评价</view>
					<text v-if="orderInfo[6]">{{ orderInfo[6] }}</text>
				</navigator>
			</view>
		</view>
		<view class="userCoupon">
			<view class="userCoupon-title">我的卡券</view>
			<view class="userCoupon-item" :class="[item.type === 1 ? 'blue' : 'red']" v-for="item in couponList" :key="item.id" @tap="useUserCoupon(item)">
				<view class="userCoupon-item-left">
					<view class="userCoupon-item-left-price">￥<text>{{ item.coupon_price }}</text></view>
					<view class="userCoupon-item-left-tips">满{{ item.condition }}元可用</view>
				</view>
				<view class="userCoupon-item-middle">
					<view class="userCoupon-item-middle-info">{{ item.coupon_name }}</view>
					<view class="userCoupon-item-middle-time">{{ item.coupon_start_time }} ~ {{ item.coupon_end_time }}</view>
				</view>
				<view class="userCoupon-item-right">{{ item.type === 1 ? '立即使用' : '立即扫码' }}</view>
			</view>
			<view class="userCoupon-more">
				<image mode='widthFix' @tap="getCouponMore" :class="{userCouponMoreImg: userCouponMore}" src="/static/img/userCouponMore.png"></image>
			</view>
			<view class="userCoupon-item disabled" v-for="item in disabledCouponList" :key="item.id">
				<view class="userCoupon-item-left">
					<view class="userCoupon-item-left-price">￥<text>{{ item.coupon_price }}</text></view>
					<view class="userCoupon-item-left-tips">满{{ item.condition }}元可用</view>
				</view>
				<view class="userCoupon-item-middle">
					<view class="userCoupon-item-middle-info">{{ item.coupon_name }}</view>
					<view class="userCoupon-item-middle-time">{{ item.coupon_start_time }} ~ {{ item.coupon_end_time }}</view>
				</view>
				<view class="userCoupon-item-right" :class="[item.status === 3 ? 'used' : 'expired']">{{ item.type === 1 ? '立即使用' : '立即扫码' }}</view>
			</view>
		</view>
		<navigator url="/pages/user/setting" class="userSetting">
			账户设置
			<image mode='widthFix' src="/static/img/right.png"></image>
		</navigator>
		<navigator url="/pages/user/message" class="userSetting messageSetting">
			消息推送
			<view class="messageSetting-tips" v-if="messageList.length">{{ messageList.length }}</view>
			<image mode='widthFix' src="/static/img/right.png"></image>
		</navigator>
		<uniPopup ref="popup" :maskClick="false">
			<view class="couponWrapper">
				<view class="couponWrapper-title">{{ currrntCouponInfo.coupon_name }}<image @tap="$refs.popup.close()" mode='widthFix' src="/static/img/close.png"></image></view>
				<view class="couponWrapper-time">有效期至：{{ currentCoupon_time }}</view>
				<view class="couponWrapper-price"><text>{{ currrntCouponInfo.coupon_price }}</text>元优惠券</view>
				<view class="couponWrapper-tips">商家扫描条形码使用</view>
				<canvas style="width: 300rpx; height: 300rpx; margin: 0 auto;" canvas-id="qrcode"></canvas>
				<canvas style="width: 520rpx; height: 114rpx; margin: 0 auto;" canvas-id="barcode"></canvas>
				<view class="couponWrapper-code">{{ currrntCouponInfo.code }}</view>
			</view>
		</uniPopup>
	</view>
</template>

<script>
	import { login, updateUserInfo, getUserInfo, getCouponList, getMessageList } from '@/api/user.js'
	import { mapState, mapMutations } from 'vuex'
	import uniPopup from 'components/uni-popup/uni-popup.vue'
	import wxbarcode from 'wxbarcode'
	
	export default {
		components: { uniPopup },
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userPhone', 'userAvater', 'userName', 'userVip', 'userVipInfo']),
			userInfoMember_time () {
				return this.time(this.userInfo.member_time * 1000).split(' ')[0]
			},
			twoDateDays () {
				return this.getDays(this.userInfoMember_time, this.time().split(' ')[0])
			},
			currentCoupon_time () {
				return this.time(this.currrntCouponInfo.expire_time * 1000).split(' ')[0]
			}
		},
		onLoad () {
			this.getWxUserInfo()
			this.getUserCoupon(2)
			this.getMessageList()
		},
		data () {
			return {
				couponList: [],
				disabledCouponList: [],
				messageList: [],
				userInfo: {},
				orderInfo: {},
				currrntCouponInfo: {},
				userCouponMore: false,
				qrcodeURL: '',
				codeURL: '',
			}
		},
		onPullDownRefresh() {
			this.freshPage()
		},
		methods: {
			...mapMutations(['updateUserVipInfo', 'updateUserIPhone']),
			goToProfile () {
				uni.navigateTo({ url: '/pages/user/profile' })
			},
			getDays(date1 , date2){
				let date1Str = date1.split("-");//将日期字符串分隔为数组,数组元素分别为年.月.日
				//根据年 . 月 . 日的值创建Date对象
				let date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
				let date2Str = date2.split("-");
				let date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
				let t1 = date1Obj.getTime();
				let t2 = date2Obj.getTime();
				let dateTime = 1000*60*60*24; //每一天的毫秒数
				let minusDays = Math.floor(((t2-t1)/dateTime));//计算出两个日期的天数差
				let days = Math.abs(minusDays);//取绝对值
				return days;
			},
			time (temp) {
				let time = temp || +new Date()
				let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
				return date.toJSON().substr(0, 19).replace('T', ' ');
			},
			getWxUserInfo () {
				const _this = this
				uni.showLoading({ title: '加载中' });
				uni.getUserInfo({
					provider: 'weixin',
					success: async ({ userInfo }) => {
						_this.$store.dispatch('updateUserInfo', userInfo).then(() => {
							_this.getUserInfo()
						}).catch((err) => {
							uni.showToast({ icon: 'none', title: '更新失败' })
						}).finally(() => {
							uni.hideLoading();
						})
					},
					fail() {
						_this.getUserInfo()
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '请手动点击登陆 / 注册'
						});
					}
				});
			},
			async getUserCoupon (status) {
				uni.showLoading({ title: '加载中' });
				const [error, { data }] = await getCouponList({ status, page_size: 999 })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '获取失败' })
          return
        }
				const list = data.data.data.map(v => {
					v.coupon_start_time = this.time(v.coupon_start * 1000).split(' ')[0].replace(/\-/g, '.')
					v.coupon_end_time = this.time(v.coupon_end * 1000).split(' ')[0].replace(/\-/g, '.')
					return v
				})
				if (status === 2) {
					this.couponList = list
				} else if (status === 34) {
					this.disabledCouponList = list
				}
			},
			async freshPage () {
				const p1 = () => new Promise(async (reslove) => {
					await this.getUserInfo()
					reslove()
				})
				const p2 = () => new Promise(async (reslove) => {
					await this.getUserCoupon(2)
					reslove()
				})
				const p3 = () => new Promise(async (reslove) => {
					await this.getMessageList()
					reslove()
				})
				Promise.all([p1(), p2(), p3()]).then(() => {
					uni.stopPullDownRefresh()
				})
			},
			async getUserInfo () {
				uni.showLoading({ title: '加载中' });
				const [error, { data }] = await getUserInfo()
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '获取失败' })
          return
				}
				if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
				this.userInfo = data.data.user_info
				this.updateUserVipInfo(data.data.user_info)
				this.updateUserIPhone(data.data.user_info.mobile)
				this.orderInfo = data.data.order_count
				if (!data.data.user_info.mobile) {
					uni.showModal({
						title: '未验证手机号',
						content: '您未绑定手机号，需要绑定才能享受更多功能',
						showCancel: !this.forcedLogin,
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/user/profile'
								});
							}
						}
					});
				}
			},
			async getCouponMore () {
				if (this.userCouponMore) {
					this.disabledCouponList = []
				} else {
					await this.getUserCoupon(34)
				}
				this.userCouponMore = !this.userCouponMore
			},
			async getMessageList () {
				uni.showLoading({ title: '加载中' });
				const [error, { data }] = await getMessageList({ status: 1, page_size: 999 })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '获取失败' })
          return
				}
				if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
				this.messageList = data.data.data
			},
			useUserCoupon (item) {
				if (item.type === 1) {
					uni.switchTab({ url: '/pages/wash/wash' })
				} else if (item.type === 2) {
					uni.showLoading({ title: '加载中' });
					wxbarcode.barcode('barcode', item.code, 520, 114);
					wxbarcode.qrcode('qrcode', item.code, 300, 300);
					this.currrntCouponInfo = item
					this.$refs.popup.open()
					uni.hideLoading();
				}
			},
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
	margin-bottom: 8rpx;
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
				width: 100%;
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
		padding: 30rpx 0;
		margin-bottom: 20rpx;
		image {
			width: 18rpx;
		}
	}
	&-menu {
		@extend %flex;
		font-size: 26rpx;
		font-weight: bold;
		justify-content: space-between;
		&-item {
			position: relative;
			text-align: center;
			padding: 18rpx;
		}
		text {
			$r: 30rpx;
			position: absolute;
			right: 0;
			top: 0;
			color: #fff;
			background-color: #F22061;
			border-radius: 50%;
			line-height: $r;
			width: $r;
			height: $r;
			line-height: $r;
			font-size: 20rpx;
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
	padding: 38rpx 0 28rpx;
	border-bottom: 2rpx solid #f2f2f2;
	&-more {
		text-align: center;
		margin-bottom: 10rpx;
		image {
			width: 50rpx;
			&.userCouponMoreImg {
				transform: rotate(180deg);
			}
		}
	}
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
			padding: 12rpx 0;
			width: 220rpx;
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
		position: relative;
	}
	&-item.disabled &-item-left {
		color: #bbb;
	}
	&-item.disabled &-item-right.used::before, &-item.disabled &-item-right.expired::before {
		content: '';
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		background-repeat: no-repeat;
		background-size: 100%;
		top: 50%;
		right: 50%;
		transform: translateY(-50%);
	}
	&-item.disabled &-item-right.used::before {
		background-image: url('~@/static/img/userCouopnDisabled-used.png');
	}
	&-item.disabled &-item-right.expired::before {
		background-image: url('~@/static/img/userCouponDisabled-expired.png');
	}
}
.userSetting {
	@extend %flex;
	color: #333;
	justify-content: space-between;
	font-weight: bold;
	font-size: 35rpx;
	padding: 38rpx 0;
	image {
		width: 18rpx;
	}
}
.messageSetting {
	border-top: 2rpx solid #f2f2f2;
	position: relative;
	&-tips {
		position: absolute;
		$r: 30rpx;
		width: $r;
		height: $r;
		line-height: $r;
		text-align: center;
		border-radius: 50%;
		background-color: rgb(242, 32, 97);
		top: 50%;
		transform: translateY(-50%);
		right: 10%;
		color: #fff;
		font-size: 22rpx;
	}
}
.couponWrapper {
	background-image: url('~@/static/img/couponWrapperBg.png');
	background-repeat: no-repeat;
	background-size: 100%;
	width: 670rpx;
	padding: 16rpx;
	text-align: center;
	line-height: 1;
	box-sizing: border-box;
	&-title {
		position: relative;
		color: #F22061;
		font-weight: bold;
		font-size: 36rpx;
		padding: 34rpx 10rpx;
		border-bottom: 3rpx dashed #f2f2f2;
		image {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 0;
			width: 36rpx;
		}
	}
	&-time {
		color: #6B6B6B;
		font-size: 30rpx;
		margin: 82rpx 0 22rpx
	}
	&-price {
		color: #333333;
		font-size: 60rpx;
		margin-bottom: 70rpx;
		text {
			color: #FE4040;
		}
	}
	&-tips {
		color: #131313;
		font-size: 28rpx;
		margin-bottom: 22rpx;
	}
	&-code {
		text-align: center;
		margin-top: 22rpx;
		letter-spacing: .5em;
		margin-bottom: 24rpx;
	}
}
</style>
