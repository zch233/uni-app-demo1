<template>
	<view class="content">
		<swiper :indicator-dots="true">
      <swiper-item>
        <image mode='widthFix' class="swiperImg" src="/static/img/swiper.png"></image>
      </swiper-item>
      <swiper-item>
        <image mode='widthFix' class="swiperImg" src="/static/img/swiper.png"></image>
      </swiper-item>
      <swiper-item>
        <image mode='widthFix' class="swiperImg" src="/static/img/swiper.png"></image>
      </swiper-item>
    </swiper>
    <view class="product-list">
      <view class="product-list-item">
        <image mode='widthFix' class="product-list-item-img" src="/static/img/good.png"></image>
        <view class="product-list-item-info">
          <view class="product-list-item-info-title">短袖</view>
          <view class="product-list-item-info-des">千万不要华丽低俗，因为从衣服可以看出一个人。</view>
          <view class="product-list-item-info-des">好评率：100%</view>
          <view class="product-list-item-info-priceBar">
            <view class="product-list-item-info-priceBar-price">￥<text>29</text></view>
            <view class="product-list-item-info-priceBar-countBar">
              <image mode='widthFix' class="product-list-item-info-priceBar-countBar-minus" src="/static/img/minus.png"></image>
              <view class="product-list-item-info-priceBar-countBar-count">0</view>
              <image mode='widthFix' class="product-list-item-info-priceBar-countBar-add" src="/static/img/add.png"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="totalBar">
      <image class="totalBar-img" mode='widthFix' src="/static/img/totalBg.png"></image>
      <view class="totalBar-total">{{ totalCount }}</view>
      <view class="totalBar-info">
        <view class="totalBar-info-tips">共选择{{ totalCount }}件</view>
        <view class="totalBar-info-price">￥{{ totalPrice }}</view>
      </view>
      <view class="totalBar-button">去结算</view>
    </view>
	</view>
</template>

<script>
	export default {
    data () {
      return {
        totalCount: 0,
        totalPrice: 0
      }
    }
	}
</script>

<style lang="scss" scoped>
.swiperImg {
  width: 100%;
}
.product-list {
  padding: 30rpx;
  box-sizing: border-box;
  &-item {
    margin-bottom: 40rpx;
    display: flex;
    line-height: 1;
    &-img {
      width: 150rpx;
      padding-right: 21rpx;
    }
    &-info {
      flex: 1;
      &-title {
        color: #333333;
        font-size: 35rpx;
        margin-bottom: 18rpx;
      }
      &-des {
        color: #A3A3A3;
        font-size: 22rpx;
        margin-bottom: 8rpx;
      }
      &-priceBar {
        display: flex;
        margin-top: 20rpx;
        justify-content: space-between;
        &-price {
          color: #E21A1A;
          font-size: 22rpx;
          text {
            font-size: 30rpx;
          }
        }
        &-countBar {
          display: inline-flex;
          font-size: 30rpx;
          align-items: center;
          $r: 30rpx;
          text-align: center;
          font-weight: bold;
          &-minus {
            width: 30rpx;
          }
          &-count {
            color:#333;
            margin: 0 19rpx;
            font-weight: normal;
          }
          &-add {
            width: 30rpx;
          }
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.totalBar {
  position: fixed;
  left: 0;
  bottom: calc(var(--window-bottom) + 24rpx);
  width: 100%;
  display: flex;
  background-color: rgb(173, 170, 173);
  padding: 24rpx 0;
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  $imgWidth: 130rpx;
  $imgLeft: 30rpx;
  &-img {
    width: $imgWidth;
    position: absolute;
    left: 30rpx;
    bottom: $imgLeft;
  }
  &-total {
    $r: 26rpx;
    content: '';
    position: absolute;
    left: 154rpx;
    background-color: rgb(242, 26, 97);
    width: $r;
    height: $r;
    border-radius: 50%;
    top: -18rpx;
    line-height: $r;
    font-size: 18rpx;
    color: #fff;
    text-align: center;
  }
  &-info {
    padding-left: 200rpx;
    flex: 1;
    &-tips {
      margin-bottom: 22rpx;
    }
  }
  &-button {
    margin-right: 30rpx;
    background-color: rgb(104, 104, 104);
    border-radius: 16rpx;
    padding: 15rpx 40rpx;
    &.active {
      background-color: rgb(242, 26, 97);
    }
  }
}
</style>
