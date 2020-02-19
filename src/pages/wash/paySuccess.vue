<template>
	<view class="content">
		<view class="payBg">
			<image v-if="success === 'true'" mode='widthFix' src="/static/img/paySuccess.png"></image>
			<image v-else mode='widthFix' src="/static/img/payFail.png"></image>
    </view>
    <view v-if="success === 'true'" class="payStatus">付款成功</view>
    <view v-else class="payStatus">付款失败</view>
		<view @tap="viewDetail" class="viewOrder">查看订单详情</view>
	</view>
</template>

<script>
	export default {
    onLoad (e) {
      this.orderId = e.id
      this.success = e.success
    },
    data () {
      return {
        success: 'true',
        orderId: '',
      }
    },
    methods: {
      viewDetail () {
        uni.redirectTo({ url: `/pages/user/orderDetail?id=${this.orderId}` })
      }
    }
	}
</script>

<style lang="scss" scoped>
.content {
  line-height: 1;
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.payBg {
  background-image: url('~@/static/img/payBg.png');
  background-repeat: no-repeat;
  background-size: 100%;
  width: 326rpx;
  box-sizing: border-box;
  padding-top: 24rpx;
  image {
    width: 226rpx;
    margin-left: 50rpx;
  }
}
.payStatus {
  color: #666666;
  font-size: 56rpx;
  font-weight: bold;
}
.viewOrder {
  color: #FFFFFF;
  font-size: 36rpx;
  margin-top: 248rpx;
  line-height: 1;
  padding: 32rpx 68rpx;
  border-radius: 100rpx;
  background-image: linear-gradient(to bottom, #f085a6, #f22061);
}
</style>
