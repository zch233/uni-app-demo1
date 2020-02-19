<template>
	<view class="content">
		<view class="card firstFloor" v-if="false">
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
			<view class="secondFloor-goodItem" v-for="item in orderGoodList" :key="item.id">
				<image mode='widthFix' src="/static/img/good.png"></image>
				<view>{{ item.title }}x{{ item.buy_number }}</view>
				<view class="secondFloor-goodItem-price">￥{{ item.totalPrice }}</view>
			</view>
			<view class="secondFloor-cancelButton" v-if="orderInfo.status < 3 && orderInfo.status"><text @tap="showCancelOrder">取消订单</text></view>
			<view class="secondFloor-infoItem">
				<text>商品总价</text>
				<text>¥{{ orderInfo.total_price }}</text>
			</view>
			<view class="secondFloor-infoItem">
				<text>运费</text>
				<text>¥0</text>
			</view>
			<view class="secondFloor-priceItem">
				<text>实付款</text>
				<view>¥{{ orderInfo.real_price }}</view>
			</view>
		</view>
		<view class="card thirdFloor">
			<view class="thirdFloor-title">订单信息</view>
			<view class="thirdFloor-info">订单编号：{{ orderInfo.order_id }}</view>
			<view class="thirdFloor-info">创建时间：{{ orderInfo.created_time }}</view>
			<view class="thirdFloor-info" v-for="item in orderLog" :key="item.desc">{{ item.desc }}：{{ item.created_time }}</view>
		</view>
		<view class="buttonBar">
			<view class="buttonBar-store">联系门店</view>
			<view class="buttonBar-express">联系顺风</view>
		</view>
		<view class="payNow" v-if="orderInfo.status === 5" @tap="showConfirmOrder">立即收货</view>
		<navigator class="payNow" :url="`/pages/wash/order?id=${orderInfo.id}`" v-if="orderInfo.status === 1">立即支付</navigator>

		<uniPopup ref="popup" :maskClick="false">
			<view class="popupWrapper">
				<view class="title">是否确认收货</view>
				<view class="buttonBar">
					<view class="buttonBar-cancel" @tap="$refs.popup.close()">取消</view>
					<view class="buttonBar-confirm" @tap="confirmOrder">确认</view>
				</view>		
			</view>
    </uniPopup>
		<uniPopup ref="cancelPopup" :maskClick="false" type="bottom">
			<cancel-popup :currentOrderInfo="orderInfo" @hidePopup="$refs.cancelPopup.close()" @changeOrderStatus="orderInfo.status = 0"></cancel-popup>
    </uniPopup>
	</view>
</template>

<script>
	import { getOrderList, cancelOrder, confirmOrder } from '@/api/user.js'
	import uniPopup from 'components/uni-popup/uni-popup.vue'
	import cancelPopup from 'components/cancel-popup/cancel-popup.vue'

	export default {
		components: { uniPopup, cancelPopup },
		onLoad (e) {
			this.getOrderInfo(e.id)
		},
		data () {
			return {
				orderInfo: {},
				orderGoodList: [],
				orderLog: [],
				address: '',
			}
		},
		methods: {
			showConfirmOrder () {
				this.$refs.popup.open()
			},
			showCancelOrder () {
				this.$refs.cancelPopup.open()
			},
			async getOrderInfo (id) {
				uni.showLoading({ title: '正在获取订单' });
        const [error , { data }] = await getOrderList({ id })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '订单获取失败' })
          return
				}
				this.orderInfo = data.data.data[0]
				this.orderGoodList = data.data.data[0].goods_detail
				this.orderLog = data.data.data[0].order_log || []
				this.orderGoodList.map(v => (v.totalPrice = (v.buy_number * v.price).toFixed(2) * 1))
				this.address = data.data.data[0].address
			},
			async confirmOrder () {
				uni.showLoading({ title: '正在签收' });
        const [error , { data }] = await confirmOrder({ id: this.orderInfo.id })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '订单签收失败' })
          return
				}
				uni.showToast({ icon: 'none', title: '收货成功' })
				this.orderInfo.status = 6
			},
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
	box-sizing: border-box;
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
.popupWrapper {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 70rpx 60rpx;
	text-align: center;
	width: 90%;
	.title {
		color: #333;
		font-size: 36rpx;
		margin-bottom: 99rpx;
	}
	.buttonBar {
		display: flex;
		justify-content: space-between;
		&-cancel, &-confirm {
			border-radius: 10rpx;
			padding: 22rpx 72rpx;
			border: 2rpx solid #F22061;
		}
		&-cancel {
			background-color: #fff;
			color: #F22061;
		}
		&-confirm {
			background-color: #F22061;
			color: #fff;
		}
	}
}
</style>
