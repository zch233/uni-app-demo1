<template>
	<view class="content">
    <image mode='widthFix' src="/static/img/couponSuccess.png"></image>
    <view class="title">核销失败</view>
    <view class="item">
      <view class="item-label">条形码编号：</view>
      <view class="item-value">1234567</view>
    </view>
    <view class="item">
      <view class="item-label">优惠券金额：</view>
      <view class="item-value">¥500</view>
    </view>
    <view class="item">
      <view class="item-label">有效期至：</view>
      <view class="item-value">2020/3/31</view>
    </view>
    <view class="item error">
      <view class="item-label">失败原因：</view>
      <view class="item-value">未达到满减金额/已到期</view>
    </view>
    <navigator class="confirmButton" url="/pages/user/user">确认</navigator>
	</view>
</template>

<script>
	export default {
	}
</script>

<style lang="scss" scoped>
.content {
	box-sizing: border-box;
	padding: 0 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
  min-height: 100vh;
  image {
    width: 137rpx;
    margin-bottom: 57rpx;
  }
  .title {
    color: #333333;
    font-size: 36rpx;
    margin-bottom: 70rpx;
  }
  .item {
    color: #333333;
    font-size: 30rpx;
    display: flex;
    margin-bottom: 38rpx;
    text-align: left;
    width: 100%;
    &-label {
      width: 6.2em;
      margin-right: .4em;
    }
    &-value {
      flex: 1;
    }
    &.error {
      color: #E21A1A;
    }
  }
  .confirmButton {
    background-color: rgb(242, 26, 97);
    color: #fff;
    padding: 28rpx 0;
    width: 92%;
    border-radius: 100rpx;
    font-size: 36rpx;
    margin-top: 130rpx
  }
}

</style>
