<template>
	<view class="content">
		<view class="header">
			<view class="header-addressBar" @tap="chooseAddress">
				<view class="header-addressBar-address">
					<view class="header-addressBar-address-home">极地创新中心</view>
					<view class="header-addressBar-address-name">姓名（先生） 156xxxxxxxx</view>
				</view>
				<image mode='widthFix' class="right2" src="/static/img/right2.png"></image>
			</view>
			<view class="header-time" @tap="showTimeOption">
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
			<view class="details-item" v-for="item in orderGoodList" :key="item.id">
				<image mode='widthFix' class="details-item-img" src="/static/img/good.png"></image>
				<view class="details-item-name">{{ item.title }}</view>
				<view class="details-item-total">x{{ item.num }}</view>
				<view class="details-item-price">￥<text>{{ (item.num * item.discounted_price).toFixed(2) }}</text></view>
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
			<view class="footer-button" @tap="payNow">确认支付</view>
		</view>
		<uni-popup ref="popup" class="timePopup" :maskClick="false" type="bottom">
			<view class="timeTitle">选择上门时间</view>
			<view class="timeContent">
				<view class="timeContent-left">
					<view class="timeContent-left-time">今天（周一）</view>
					<view class="timeContent-left-time">今天（周二）</view>
					<view class="timeContent-left-time">今天（周三）</view>
				</view>
				<scroll-view scroll-y class="timeContent-right" scroll-with-animation>
					<view class="timeContent-right-time">14:00</view>
					<view class="timeContent-right-time">14:00</view>
					<view class="timeContent-right-time">14:00</view>
					<view class="timeContent-right-time">14:00</view>
					<view class="timeContent-right-time">14:00</view>
					<view class="timeContent-right-time">14:00</view>
					<view class="timeContent-right-time">14:00</view>
					<view class="timeContent-right-time">14:00</view>
				</scroll-view>
			</view>
    </uni-popup>
	</view>
</template>

<script>
	import { getOrderList } from '@/api/user.js'
	import { mapState } from 'vuex'
	import uniPopup from 'components/uni-popup/uni-popup.vue'

	export default {
		components: { uniPopup },
		data () {
			return {
				orderGoodList: [],
				addressInfo: {},
			}
		},
		onLoad (e) {
			console.log(e)
		},
		methods: {
			showTimeOption () {
				this.$refs.popup.open()
			},
			async getOrderInfo (id) {
				uni.showLoading({ title: '正在获取订单' });
        const [error , { data }] = await getOrderList({ id })
        if (error) {
          uni.showToast({ icon: 'none', title: '订单获取失败' })
          return
        }
        uni.hideLoading();
			},
			chooseAddress () {
				uni.chooseAddress({
					success(res) {
						this.addressInfo = res
					},
					fail() {
						uni.showToast({ icon: 'none', title: '获取地址失败' })
					}
				})
			},
			async payNow () {
				uni.showLoading({ title: '加载中' });
        const [error , { data }] = await payNow({ pay_type: 1, express: 1, address: this.addressInfo.provinceName + this.addressInfo.cityName + this.addressInfo.countyName + this.addressInfo.detailInfo })
        if (error) {
          uni.showToast({ icon: 'none', title: '加载失败' })
          return
        }
        uni.hideLoading();
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
		}
	}
	&-right {
		flex: 1;
		margin-left: 50rpx;
		&-time {
			padding: 20rpx 0;
			margin-right: 30rpx;
			border-bottom: 2rpx solid #f2f2f2; 
		}
	}
}
</style>
