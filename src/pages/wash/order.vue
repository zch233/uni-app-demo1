<template>
	<view class="content">
		<view class="header">
			<view class="header-addressBar" @tap="chooseAddress">
				<view class="header-addressBar-address" v-show="addressInfo.address">
					<view class="header-addressBar-address-home">{{ addressInfo.province + addressInfo.city + addressInfo.district + addressInfo.address }}</view>
					<view class="header-addressBar-address-name">{{ addressInfo.nickname }} {{ addressInfo.mobile }}</view>
				</view>
				<view class="header-addressBar-address" v-show="!addressInfo.address">
					<view class="header-addressBar-address-home">请选择地址</view>
				</view>
				<image mode='widthFix' class="right2" src="/static/img/right2.png"></image>
			</view>
			<view class="header-time" @tap="showTimeOption">
				<view class="header-time-label">取货时间</view>
				<view class="header-time-value">
					<view>约{{ orderTime }}</view>
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
			<view class="details-item" v-for="good in orderGoodList" :key="good.id">
				<image mode='widthFix' class="details-item-img" :src="good.image"></image>
				<view class="details-item-name">{{ good.title }}</view>
				<view class="details-item-total">x{{ good.buy_number }}</view>
				<view class="details-item-price">￥<text>{{ good.totalPrice }}</text></view>
			</view>
			<view class="details-discountBar" @tap="showCouponOption">
				<view class="details-discountBar-label">红包/抵用券</view>
				<view class="details-discountBar-value" v-show="couponInfo.id">-￥<text>{{ couponInfo.coupon_price * 1 }}</text></view>
				<view class="details-discountBar-value" style="color: #bbb;" v-show="!couponInfo.id">请选择优惠券</view>
			</view>
			<view class="details-finall">
				<text class="details-finall-label">小计：</text>￥<text class="details-finall-value">{{ totalPrice }}</text>
			</view>
		</view>
		<textarea v-show="textareaVisible" class="remark" @blur="bindTextAreaBlur" placeholder-style="color:#BFBFBF" placeholder="备注"/>
		<view class="footer">
			<view class="footer-price"><text>¥{{ totalPrice }}</text>已优惠¥{{ couponInfo.coupon_price || 0 }}</view>
			<view class="footer-button" @tap="payNow">确认支付</view>
		</view>
		<uni-popup ref="timePopup" class="timePopup" type="bottom">
			<view class="timeTitle">选择上门时间</view>
			<view class="timeContent">
				<view class="timeContent-left">
					<view class="timeContent-left-time" :class="{active: index === leftTimeIndex}" v-for="(item, index) in leftTime" @tap="selectLeftTime(index)" :key="index">{{ item }}</view>
				</view>
				<scroll-view scroll-y class="timeContent-right" scroll-with-animation>
					<view class="timeContent-right-time" :class="{active: index === rightTimeIndex}" v-for="(item, index) in rightTime" @tap="selectRightTime(index)" :key="index"><text v-show="leftTimeIndex === 0 && index === 0">尽早上门</text>{{ item }}</view>
				</scroll-view>
			</view>
    </uni-popup>
		<uni-popup ref="couponPopup" class="couponPopup" type="bottom">
			<scroll-view scroll-y class="couponList" scroll-with-animation>
				<p v-if="couponList.length === 0" style="text-align:center;margin-top:3vh;color:#aaa;">您当前暂无可用优惠券</p>
				<view class="couponList-item blue" v-for="item in couponList" :key="item.id" @tap="chooseCoupon(item)">
					<view class="couponList-item-left">
						<view class="couponList-item-left-price">￥<text>{{ item.coupon_price }}</text></view>
						<view class="couponList-item-left-tips">满{{ item.condition }}元可用</view>
					</view>
					<view class="couponList-item-middle">
						<view class="couponList-item-middle-info">{{ item.coupon_name }}</view>
						<view class="couponList-item-middle-time">{{ item.coupon_start_time }} ~ {{ item.coupon_end_time }}</view>
					</view>
					<view class="couponList-item-right">立即使用</view>
				</view>
				<text @tap="chooseCoupon({})" class="couponNotUse">现在不使用</text>
			</scroll-view>
    </uni-popup>
	</view>
</template>

<script>
	import { getOrderList, getCouponList } from '@/api/user.js'
	import { payNow } from '@/api/wash.js'
	import { mapState } from 'vuex'
	import uniPopup from 'components/uni-popup/uni-popup.vue'

	const getTimeList = (hour = 0) => [...new Array(24).keys()].splice(hour).map(v => v < 10 ? `0${v}` : v).map(v => ['15', '30', '45'].map(vv =>  v === hour ? (new Date().getMinutes() > vv ? false : `${v}:${vv}`) : `${v}:${vv}`)).reduce((a, b) => a.concat(b), []).filter(Boolean)
	const normalRightTime = getTimeList()
	const nowRightTime = getTimeList(new Date().getHours())
	const day = ['日', '一', '二', '三', '四', '五', '六']
	const nowDay = new Date().getDay()
	const nowLeftTime = [`今天（周${day[nowDay]}）`, `明天（周${day[nowDay + 1]}）`, `后天（周${day[nowDay + 2]}）`]
	export default {
		components: { uniPopup },
		computed: {
			...mapState(['imgPath']),
			totalPrice() {
				const price = this.orderInfo.real_price - (this.couponInfo.coupon_price || 0)
				return price < 0 ? 0.01 : (price.toFixed(2) * 1)
			}
		},
		data () {
			return {
				orderGoodList: [],
				couponList: [],
				addressInfo: {},
				remark: '',
				orderInfo: {},
				couponInfo: {},
				personalInfo: {},
				leftTime: nowLeftTime,
				leftTimeIndex: 0,
				rightTime: nowRightTime,
				rightTimeIndex: 0,
				orderTime: nowRightTime[0],
				textareaVisible: true,
			}
		},
		onLoad (e) {
			this.getOrderInfo(e.id)
		},
		methods: {
			getToday () {
				const date = new Date()
				const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + this.leftTimeIndex) + ' ' + this.rightTime[this.rightTimeIndex]
				return new Date(today.replace(/-/g, '/')).getTime() / 1000
			},
			showTimeOption () {
				this.$refs.timePopup.open()
				this.textareaVisible = false
			},
			showCouponOption () {
				this.$refs.couponPopup.open()
				this.textareaVisible = false
				this.couponList.length <= 0 && this.getCouponList()
			},
			bindTextAreaBlur (e) {
				this.remark = e.detail.value
			},
			async getCouponList () {
				uni.showLoading({ title: '加载中' });
        const [error , { data }] = await getCouponList({ status: 2, type: 1, page_size: 999 })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '加载失败' })
          return
				}
				this.couponList = data.data.data.filter(v => this.orderInfo.total_price * 1 >= v.condition * 1).map(v => {
					v.coupon_start_time = this.time(v.coupon_start * 1000).split(' ')[0].replace(/\-/g, '.')
					v.coupon_end_time = this.time(v.coupon_end * 1000).split(' ')[0].replace(/\-/g, '.')
					return v
				})
			},
			time (time = +new Date()) {
				let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
				return date.toJSON().substr(0, 19).replace('T', ' ');
			},
			async getOrderInfo (id) {
				uni.showLoading({ title: '正在获取订单' });
        const [error , { data }] = await getOrderList({ id })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '订单获取失败' })
          return
				}
				const result = data.data.data[0]
				this.orderInfo = result
				this.orderGoodList = result.goods_detail
				this.orderGoodList.map(v => {
					v.totalPrice = (v.buy_number * v.price).toFixed(2) * 1
					v.image = this.imgPath + v.image
				})
				this.addressInfo = {
					city: result.city,
					district: result.district,
					address: result.address,
					province: result.province,
					mobile: result.mobile,
					nickname: result.nickname,
				}
				this.couponInfo = { id: result.coupon_user_id, coupon_price: result.coupon_price }
			},
			chooseAddress () {
				const _this = this
				uni.chooseAddress({
					success(result) {
						_this.addressInfo = {
							city: result.cityName,
							district: result.countyName,
							address: result.detailInfo,
							province: result.provinceName,
							mobile: result.telNumber,
							nickname: result.userName,
						}
					}
				})
			},
			chooseCoupon (data) {
				console.log(data, 'coupon')
				this.textareaVisible = true
				this.couponInfo = data
				this.$refs.couponPopup.close()
			},
			selectLeftTime (index) {
				this.leftTimeIndex = index
				this.rightTime = index === 0 ? nowRightTime : normalRightTime
				this.rightTimeIndex = 0
			},
			selectRightTime (index) {
				this.textareaVisible = true
				this.rightTimeIndex = index
				this.orderTime = (this.leftTimeIndex === 0 ? '' : this.leftTime[this.leftTimeIndex]) + this.rightTime[this.rightTimeIndex]
				this.$refs.timePopup.close()
			},
			async payNow () {
				if (!this.addressInfo.address) {
					uni.showToast({ icon: 'none', title: '请选择收货地址' })
					return
				}
				uni.showLoading({ title: '加载中' });
        const [error , { data }] = await payNow({ id: this.orderInfo.id, pay_type: 1, express: 1, ...this.addressInfo, coupon_user_id: this.couponInfo.id, get_time: this.getToday(), remark: this.remark })
				uni.hideLoading();
				if (error) {
          uni.showToast({ icon: 'none', title: '加载失败' })
          return
				}
				if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg || JSON.stringify(data) })
					return
				}
				const _this = this
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: data.data.jsApiParameters.timeStamp,
					nonceStr: data.data.jsApiParameters.nonceStr,
					package: data.data.jsApiParameters.package,
					signType: data.data.jsApiParameters.signType,
					paySign: data.data.jsApiParameters.paySign,
					success: function (res) {
						// uni.getSetting({
						// 	success(res) {
						// 		if (res.authSetting) {
						// 			uni.requestSubscribeMessage({
						// 				tmplIds: [''],
						// 				success (res) {
						// 					console.log(res, 1111)
						// 				},
						// 				fail (err) {
						// 					console.log(err, 22)
						// 				}
						// 			})
						// 		}
						// 	}
						// });
						uni.reLaunch({ url: `/pages/wash/paySuccess?id=${_this.orderInfo.id}&success=true` })
					},
					fail: function (err) {
						uni.reLaunch({ url: `/pages/wash/paySuccess?id=${_this.orderInfo.id}&success=false` })
					},
					cancel: function (err) {
						uni.showToast({ icon: 'none', title: '已取消支付' })
					}
				});
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
				word-break: break-all;
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
	z-index: 0;
	box-sizing: border-box;
	position: static;
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
.timeTitle {
	color: #333333;
	font-size: 26rpx;
	line-height: 1;
	padding: 20rpx 0;
	text-align: center;
	background-color: rgb(218, 218, 218);
}
.timeContent {
	display: flex;
	color: #333333;
	font-size: 26rpx;
	line-height: 1;
	height: 40vh;
	background-color: #fff;
	&-left {
		background-color: rgb(208, 208, 208);
		&-time {
			padding: 20rpx 30rpx;
			&.active {
				background-color: #fff;
			}
		}
	}
	&-right {
		flex: 1;
		margin-left: 50rpx;
		&-time {
			padding: 20rpx 0;
			margin-right: 30rpx;
			border-bottom: 2rpx solid #f2f2f2;
			position: relative;
			text {
				padding-right: 20rpx;
				border-right: 2rpx solid #f2f2f2;
				margin-right: 20rpx;
			}
			&.active::before {
				position: absolute;
				content: '';
				width: 24rpx;
				height: 24rpx;
				border-radius: 50%;
				background: radial-gradient(ellipse at center, rgb(243, 31, 100) 0,rgb(243, 31, 100) 45%,rgb(243, 31, 100) 45%,#ffffff 45%,#ffffff 55%,rgb(243, 31, 100) 55%,rgb(243, 31, 100) 100%);
				right: 50rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
%flex {
	display: flex;
	align-items: center;
}
.couponList {
	color: #333;
	height: 100vh;
	background-color: #fff;
	box-sizing: border-box;
	.couponNotUse {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		font-size: 30rpx;
		text-align: center;
		line-height: 100rpx;
		box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, .1);
	}
	&-item {
		box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, .1);
		background-repeat: repeat-y;
		background-size: contain;
		border-radius: 10rpx;
		overflow: hidden;
		width: 96%;
		margin: 20rpx auto;
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
.couponPopup {
	z-index: 999;
}
</style>
