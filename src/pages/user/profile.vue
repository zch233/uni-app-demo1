<template>
	<view class="content">
		<view class="profileItem">
      <view class="profileItem-label">头像</view>
      <view class="profileItem-value">
        <image mode='widthFix' class="avatar" src="/static/img/user.png"></image>
        <image mode='widthFix' class="right" src="/static/img/right.png"></image>
      </view>
    </view>
    <view class="profileItem">
      <view class="profileItem-label">姓名</view>
      <view class="profileItem-value">
        唐泽
      </view>
    </view>
    <view class="profileItem">
      <view class="profileItem-label">手机号</view>
      <view class="profileItem-value">
        161616151511
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 4%;
}
.right {
  width: 18rpx;
  margin-left: 24rpx;
}
.profileItem {
  border-bottom: 2rpx solid #f2f2f2;
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-label {
    font-size: 32rpx;
    color: #333;
  }
  &-value {
    font-size: 30rpx;
    color: #A1A1A1;
    display: inline-flex;
    align-items: center;
    .avatar {
      width: 88rpx;
      height: 88rpx;
      border-radius: 50%;
    }
  }
  &:last-child {
    border-bottom: none;
  }
}
</style>
