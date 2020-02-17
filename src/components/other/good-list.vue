<template>
	<view class="scroll-items">
		<view class="scroll-item" v-for="good in list" :key="good.id" @tap="viewDetail(good)">
			<view class="scroll-item-title">
				<view class="scroll-item-title-id">{{ good.order_id }}</view>
				<view class="scroll-item-title-status">{{ status[good.status] }}</view>
			</view>
			<view class="scroll-item-info">
				<image src="/static/img/good.png"></image>
				<view>
					<view class="scroll-item-info-des">{{ good.goods_detail.map(v => `${v.title}x${v.buy_number}`).join('，') }}</view>
					<view class="scroll-item-info-total">共计{{ good.goods_detail.map(v => v.buy_number).reduce((a, b) => a + b, 0) }}件商品合计<text>￥<text>{{ good.real_price }}</text></text></view>
				</view>
			</view>
			<view class="scroll-item-bottom" v-if="good.status !== 0">
				<view class="scroll-item-bottom-button normal" v-if="good.status && good.status < 3 " @tap.stop="showCancelOrder(item)">取消订单</view>
				<view class="scroll-item-bottom-button normal" v-if="good.status > 3" @tap.stop="viewExpress(item)">查看物流</view>
				<view class="scroll-item-bottom-button highLight" v-if="good.status === 1" @tap.stop="payOrder(item)">去支付</view>
				<view class="scroll-item-bottom-button highLight" v-if="good.status === 5" @tap.stop="showConfirmOrder(item)">确认收货</view>
			</view>
		</view>

    <uniPopup ref="cancelPopup" :maskClick="false">
			<view class="popupWrapper">
				<view class="title">是否确认收货</view>
				<view class="buttonBar">
					<view class="buttonBar-cancel" @tap="$refs.popup.close()">取消</view>
					<view class="buttonBar-confirm" @tap="confirmOrder">确认</view>
				</view>		
			</view>
    </uniPopup>
    <uniPopup ref="confirmPopup" :maskClick="false">
			<view class="popupWrapper">
				<view class="title">是否确认收货</view>
				<view class="buttonBar">
					<view class="buttonBar-cancel" @tap="$refs.popup.close()">取消</view>
					<view class="buttonBar-confirm" @tap="confirmOrder">确认</view>
				</view>		
			</view>
    </uniPopup>
	</view>
</template>

<script>
  import { getOrderList, cancelOrder, confirmOrder } from '@/api/user.js'
  import uniPopup from 'components/uni-popup/uni-popup.vue'
  
	export default {
    components: { uniPopup },
		props:{
			list: { // 数据列表
				type: Array,
				default(){
					return []
				}
			}
    },
    data () {
      return {
        status: ['订单已取消', '未付款', '已付款', '已揽件', '门店签收', '门店发货', '用户签收'],
        currentOrderInfo: {}
      }
    },
    methods: {
      viewDetail (good) {
        if (good.status === 1) {
          uni.navigateTo({ url: `/pages/wash/order?id=${good.id}` })
        } else {
          uni.navigateTo({ url: `/pages/user/orderDetail?id=${good.id}` })
        }
      },
      showCancelOrder (good) {
        this.$refs.cancelPopup.open()
        this.currentOrderInfo = good
      },
      viewExpress (good) {
        uni.navigateTo({ url: `/pages/user/expressTrack?id=${good.id}` })
      },
      payOrder (good) {
        uni.navigateTo({ url: `/pages/wash/order?id=${good.id}` })
      },
      showConfirmOrder (good) {
        this.$refs.confirmPopup.open()
        this.currentOrder = good
      },
      async cancelOrder () {
				uni.showLoading({ title: '正在取消订单' });
        const [error , { data }] = await cancelOrder({ id: this.currentOrderInfo.id })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '订单取消失败' })
          return
				}
				uni.showToast({ icon: 'none', title: '取消成功' })
				this.currentOrderInfo.status = 0
			},
			async confirmOrder () {
				uni.showLoading({ title: '正在签收' });
        const [error , { data }] = await confirmOrder({ id: this.currentOrderInfo.id })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '订单签收失败' })
          return
				}
				uni.showToast({ icon: 'none', title: '收货成功' })
				this.currentOrderInfo.status = 6
			},
    }
	}
</script>

<style lang="scss" scoped>
.scroll-items{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50rpx 30rpx;
  box-sizing: border-box;
}
.scroll-item{
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  margin-bottom: 30rpx;
  background-color: white;
  width: 100%;
  border: 1px solid #f8f8f8;
  color: #333333;
  line-height: 1;
  border-radius: 20rpx;
  %flex {
    display: flex;
    align-items: center;
  }
  &-title {
    @extend %flex;
    justify-content: space-between;
    font-size: 36rpx;
    &-status {
      color: #F22061;
      font-size: 24rpx;
    }
  }
  &-info {
    @extend %flex;
    padding: 28rpx 0;
    border-bottom: 2rpx solid #f2f2f2;
    font-size: 28rpx;
    image {
      width: 120rpx;
      height: 120rpx;
      border-radius: 10rpx;
      margin-right: 18rpx;
    }
    > view {
      flex: 1;
    }
    &-des {
      line-height: 1.4;
      font-size: 28rpx;
      word-break: break-all;
    }
    &-total {
      font-size: 24rpx;
      text-align: right;
      margin-top: 22rpx;
      > text {
        color: #E21A1A;
        margin-left: 20rpx;
        > text {
          color: #E21A1A;
          font-size: 36rpx;
        }
      }
    }
  }
  &-bottom {
    @extend %flex;
    padding-top: 20rpx;
    justify-content: flex-end;
    &-button {
      border-radius: 2em;
      margin-left: 30rpx;
      padding: 12rpx 0;
      width: 158rpx;
      text-align: center;
      &.normal {
      border: 2rpx solid #f2f2f2;
      }
      &.highLight {
        color: #F22061;
        border: 2rpx solid #F22061;
      }
    }
  }
}
</style>
