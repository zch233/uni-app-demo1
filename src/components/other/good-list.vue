<template>
	<view class="scroll-items">
		<view class="scroll-item" v-for="good in list" :key="good.id" @tap="viewDetail(good)">
			<view class="scroll-item-title">
				<view class="scroll-item-title-id">{{ good.order_id }}</view>
				<view class="scroll-item-title-status">{{ status[good.status] }}</view>
			</view>
			<view class="scroll-item-info">
				<image :src="good.image"></image>
				<view>
					<view class="scroll-item-info-des">{{ good.goods_detail.map(v => `${v.title}x${v.buy_number}`).join('，') }}</view>
					<view class="scroll-item-info-total">共计{{ good.goods_detail.map(v => v.buy_number).reduce((a, b) => a + b, 0) }}件商品合计<text>￥<text>{{ good.real_price }}</text></text></view>
				</view>
			</view>
			<view class="scroll-item-bottom" v-if="good.status !== 0">
				<view class="scroll-item-bottom-button normal" v-if="good.status && good.status < 3 " @tap.stop="showCancelOrder(good)">取消订单</view>
				<view class="scroll-item-bottom-button normal" v-if="good.status >= 2" @tap.stop="viewExpress(good)">查看物流</view>
				<view class="scroll-item-bottom-button highLight" v-if="good.status === 1" @tap.stop="payOrder(good)">去支付</view>
				<view class="scroll-item-bottom-button highLight" v-if="good.status === 5" @tap.stop="showConfirmOrder(good)">确认收货</view>
			</view>
		</view>

    <uniPopup ref="cancelPopup" :maskClick="false" type="bottom">
			<cancel-popup :currentOrderInfo="currentOrderInfo" @hidePopup="$refs.cancelPopup.close()" @changeOrderStatus="currentOrderInfo.status = 0"></cancel-popup>
    </uniPopup>
    <uniPopup ref="confirmPopup" :maskClick="false">
			<view class="popupWrapper">
				<view class="title">是否确认收货</view>
				<view class="buttonBar">
					<view class="buttonBar-cancel" @tap="$refs.confirmPopup.close()">取消</view>
					<view class="buttonBar-confirm" @tap="confirmOrder">确认</view>
				</view>		
			</view>
    </uniPopup>
	</view>
</template>

<script>
  import { getOrderList, confirmOrder } from '@/api/user.js'
  import uniPopup from 'components/uni-popup/uni-popup.vue'
  import cancelPopup from 'components/cancel-popup/cancel-popup.vue'
  
	export default {
    components: { uniPopup, cancelPopup },
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
        uni.navigateTo({ url: `/pages/user/expressTrack?order_id=${good.order_id}&status=${good.status}` })
      },
      payOrder (good) {
        uni.navigateTo({ url: `/pages/wash/order?id=${good.id}` })
      },
      showConfirmOrder (good) {
        this.$refs.confirmPopup.open()
        this.currentOrderInfo = good
      },
			async confirmOrder () {
        uni.showLoading({ title: '正在签收' });
        const [error , { data }] = await confirmOrder({ id: this.currentOrderInfo.id })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '订单签收失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
        uni.showToast({ icon: 'none', title: '收货成功' })
        this.$refs.confirmPopup.close()
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
.cancelPopupWrapper {
  background-color: #fff;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  padding: 38rpx 3%;
  color: #333;
  line-height: 1;
  .title {
    font-size: 36rpx;
    padding-bottom: 30rpx;
    border-bottom: 2rpx solid #f2f2f2;
    text-align: center;
  }
  .subTitle {
    color:#A7A7A7;
    font-size: 30rpx;
    padding: 30rpx 0 20rpx;
  }
  .reasonList {
    .reasonItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28rpx 0;
      border-bottom: 2rpx solid #f2f2f2;
      &:last-child {
        border-bottom: none;
      }
      &-label {
        font-size: 30rpx;
      }
      &-value {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        border: 2rpx solid #f2f2f2;
        &.active {
          background: radial-gradient(ellipse at center, rgb(243, 31, 100) 0,rgb(243, 31, 100) 45%,rgb(243, 31, 100) 45%,#ffffff 45%,#ffffff 55%,rgb(243, 31, 100) 55%,rgb(243, 31, 100) 100%);
        }
      }
    }
  }
  .buttonBar {
    display: flex;
    color: #fff;
    font-size: 30rpx;
    text-align: center;
    border-radius: 70rpx;
    overflow: hidden;
    margin-top: 40rpx;
    box-sizing: border-box;
    > view {
      flex: 1;
      padding: 20rpx 0;
    }
    &-cancel {
      background-color: #309EEB;
    }
    &-confirm {
      background-color: rgb(242, 26, 97);
    }
  }
}
</style>
