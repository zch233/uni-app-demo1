<template>
	<view class="vipPayContent">
		<view class="vipPayContent-user">
      <view class="vipPayContent-user-img">
        <image mode='widthFix' :src="userAvater"></image>
      </view>
      <view class="vipPayContent-user-info">
        <view class="vipPayContent-user-infoName">{{ userName }}</view>
        <view class="vipPayContent-user-infoVip">{{ userVip ? '黄金会员' : '普通会员'}}</view>
      </view>
    </view>
    <view class="vipPayContent-payBar">
      <view class="vipPayContent-payBar-title">超级会员套餐</view>
      <view class="vipPayContent-payBar-info">
        <view>
          <view class="vipPayContent-payBar-info-title">年度超级会员</view>
          <view class="vipPayContent-payBar-info-tips">12个月，每天≈2.7元</view>
        </view>
        <view class="vipPayContent-payBar-info-price">￥<text>998</text></view>
      </view>
      <view class="vipPayContent-payBar-option">
        <view>支付方式</view>
        <view class="vipPayContent-payBar-option-selected">微信支付<image mode='widthFix' src="/static/img/right.png"></image></view>
      </view>
    </view>
    <view class="vipPayContent-bottomBar">
      <view class="vipPayContent-bottomBar-price">总价<text>￥998</text></view>
      <view class="vipPayContent-bottomBar-button" @tap="payVip">确认支付</view>
    </view>
    <uniPopup ref="popup" :maskClick="false">
     <image @click="$refs.popup.close()" mode='widthFix' src="/static/img/payVipSuccess.png"></image>
    </uniPopup>
	</view>
</template>

<script>
  import uniPopup from 'components/uni-popup/uni-popup.vue'
  import { mapState } from 'vuex'
  import { payVip } from '@/api/user'

	export default {
    components: { uniPopup },
    computed: {
      ...mapState(['userAvater', 'userName', 'userVip'])
    },
    methods: {
      async payVip () {
        uni.showLoading({ title: '正在支付' });
        const [error , { data }] = await payVip()
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '获取参数失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
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
						_this.$refs.popup.open()
					},
					fail: function (err) {
						uni.showToast({ icon: 'none', title: '支付失败' })
					}
				});
      }
    }
	}
</script>

<style>
  .vipPayContent-user {
    padding: 20rpx 0 29rpx;
    border-bottom: 20rpx solid rgb(248, 246, 249);
    display: flex;
    align-items: center;
  }
  .vipPayContent-user-img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-left: 41rpx;
    overflow: hidden;
  }
  .vipPayContent-user-img image {
    width: 80rpx;
  }
  .vipPayContent-user-info {
    padding-left: 28rpx;
    color: #B5B5B5;
    font-size: 26rpx;
  }
  .vipPayContent-user-infoName {
    font-size: 32rpx;
    color: #333;
    margin-bottom: 15rpx;
  }
  .vipPayContent-payBar {
    width: 92%;
    margin: 0 auto;
    padding-top: 28rpx;
  }
  .vipPayContent-payBar-title {
    font-size: 32rpx;
    color: #333333;
  }
  .vipPayContent-payBar-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 22rpx 33rpx 19rpx;
    border: 2rpx solid #f2f2f2;
    border-radius: 20rpx;
    font-size: 32rpx;
    color: #333333;
    margin: 35rpx 0 40rpx;
  }
  .vipPayContent-payBar-info-tips {
    font-size: 24rpx;
    color: #999;
    margin-top: 16rpx;
  }
  .vipPayContent-payBar-info-price {
    color: #E21A1A;
  }
  .vipPayContent-payBar-info-price text {
    font-size: 42rpx;
    font-weight: bold;
  }
  .vipPayContent-payBar-option {
    border: 2rpx solid #f2f2f2;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 20rpx 33rpx 19rpx 32rpx;
    color: #333;
    font-size: 32rpx;
    display: flex;
    justify-content: space-between;
  }
  .vipPayContent-payBar-option-selected {
    color: #F22061;
  }
  .vipPayContent-payBar-option-selected image {
    width: 19rpx;
    vertical-align: -.16em;
    margin-left: 19rpx;
  }
  .vipPayContent-bottomBar {
    position: fixed;
    left: 0;
    bottom: var(--window-bottom);
    font-size: 32rpx;
    color: #333333;
    border-top: 1rpx solid #f2f2f2;
    display: flex;
    width: 100%;
    line-height: 1;
  }
  .vipPayContent-bottomBar-price {
    padding: 30rpx 27rpx;
    flex: 1;
  }
  .vipPayContent-bottomBar-price text {
    color: #E21A1A;
    margin-left: .6em;
  }
  .vipPayContent-bottomBar-button {
    color: #fff;
    background-color: rgb(245, 31, 98);
    text-align: center;
    padding: 30rpx 98rpx;
  }
</style>
