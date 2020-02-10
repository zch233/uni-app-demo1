<template>
	<view class="content">
		<image mode='widthFix' class="vipCodeBg" src="/static/img/vipShareCodeBg.png"></image>
    <button class="saveButton">保存到本地</button>
    <uniPopup ref="popup" :maskClick="false">
			<view class="content-couponWrapper">
				<view class="content-couponTitle">升级会员好礼！</view>
				<view class="content-couponList">
          <view class="content-couponList-item">
            <view class="content-couponList-item-left">
              <view class="content-couponList-item-left-price">￥<text>50</text></view>
              <view class="content-couponList-item-left-tips">全场通用</view>
            </view>
            <view class="content-couponList-item-right">
              <view class="content-couponList-item-right-title">优惠券</view>
              <view class="content-couponList-item-right-tips">满1元使用</view>
              <view class="content-couponList-item-right-time">2018/09/01-2018/09/02</view>
            </view>
          </view>
        </view>
			</view>
			<view @click="$refs.popup.close()" class="content-couponButton">确认</view>
		</uniPopup>
	</view>
</template>

<script>
  import uniPopup from 'components/uni-popup/uni-popup.vue'
  
	export default {
    components: { uniPopup },
    onLoad() {
			// this.init()
			this.$refs.popup.open()
		},
	}
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background-color: rgb(31, 33, 35);
  background-image: url('~@/static/img/vipShareBg.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  .vipCodeBg {
    width: 446rpx;
    position: absolute;
    top: 291rpx;
    left: 50%;
    transform: translateX(-50%);
  }
  .saveButton {
    position: absolute;
    top: 993rpx;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(228, 174, 129);
    padding: 49rpx 158rpx;
    line-height: 1;
    border-radius: 10rpx;
    white-space: nowrap;
    color: #333;
    font-size: 36rpx;

  }
  &-couponWrapper {
		width: 622rpx;
		height: 778rpx;
		color: #BEA26F;
		background-image: url('~@/static/img/vipCouponBg2.png');
		background-repeat: no-repeat;
		background-size: cover;
		padding: 86rpx 53rpx 91rpx;
		position: relative;
		box-sizing: border-box;
	}
	&-couponWrapper::before {
		content: '';
		position: absolute;
		width: 691rpx;
		background-image: url('~@/static/img/vipCouponBg1.png');
		background-repeat: no-repeat;
		background-size: cover;
		height: 538rpx;
		top: -50rpx;
		left: -33rpx;
		z-index: 1;
	}
	&-couponTitle {
		position: absolute;
		top: -14rpx;
		left: -14rpx;
		color: #7D582C;
		font-size: 36rpx;
		width: 100%;
		height: 159rpx;
		background-image: url('~@/static/img/vipCouponBg3.png');
		background-repeat: no-repeat;
		background-size: cover;
		padding-top: 1em;
		box-sizing: border-box;
    text-align: center;
	}
	&-couponList {
		width: 100%;
		height: 100%;
    // overflow-y: scroll;
    box-sizing: border-box;
    &-item {
      border: 3rpx solid #cba983;
      box-shadow: 0 0 0 15rpx #fff;
      background-color: #fff;
      box-sizing: border-box;
      width: calc(100% - 30rpx);
      margin: 0 auto;
    }
	}
	&-couponButton {
		color: #fff;
		background-color: rgb(211, 170, 125);
		border: 2rpx solid rgb(196, 123, 69);
		box-shadow: 0 0 0 10rpx rgb(211, 170, 125);
		border-radius: 89rpx;
		font-size: 36rpx;
		line-height: 2;
		width: 60%;
		margin: 0 auto;
		margin-top: 40rpx;
    text-align: center;
	}
}
</style>
