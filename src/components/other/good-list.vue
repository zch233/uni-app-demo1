<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<!-- <view class="pd-list">
		<view class="pd-li" v-for="pd in list" :key="pd.id">
			<image class="pd-img" :src="pd.pdImg" mode="widthFix"/>
			<view class="pd-name">{{pd.pdName}}</view>
			<text class="pd-price">{{pd.pdPrice}} 元</text>
			<text class="pd-sold">已售{{pd.pdSold}}件</text>
		</view>
	</view> -->
	<view class="scroll-items">
		<view class="scroll-item" v-for="pd in list" :key="pd.id">
			<view class="scroll-item-title">
				<view class="scroll-item-title-id">123456789123</view>
				<view class="scroll-item-title-status">待支付</view>
			</view>
			<view class="scroll-item-info">
				<image src="/static/img/good.png"></image>
				<view>
					<view class="scroll-item-info-des">上衣×2，鞋子×1，裤子×1，普通外套×1， 皮革外套×1</view>
					<view class="scroll-item-info-total">共计6件商品合计<text>￥<text>199</text></text></view>
				</view>
			</view>
			<view class="scroll-item-bottom">
				<view class="scroll-item-bottom-button normal">取消订单</view>
				<view class="scroll-item-bottom-button highLight">去支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: { // 数据列表
				type: Array,
				default(){
					return []
				}
			}
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
