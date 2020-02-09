<template>
	<view class="vipDetailContent">
    <view class="vipDetailContent-list" v-for="(item, index) in list" :key="item">
      <text>{{ index + 1 }}.</text>
      <text>{{ item }}</text>
    </view>
    <view class="vipDetailContent-last">
      <text>9.</text>
      <text>会员支付年费998元</text>
      <view class="vipDetailContent-last-info">
        <view>=200元干洗券*12/月</view>
        <view>=200元优惠券*12/月</view>
        <view>=货品5折</view>
        <view>=干洗7折</view>
      </view>
    </view>
		<view class="vipDetailContent-more">更多会员权益，敬请期待...</view>
	</view>
</template>

<script>
	export default {
    data () {
      return {
        list: [
          '每月干洗券200元，会员可在APP上下单，免费上门收件。',
          '会员专享优惠券：每月200元优惠券（满699可用）',
          '会员优惠券+干洗券注册即可领取，即领即用，当 月有效。',
          '会员专享7折（购物+干洗）',
          '会员年享优惠低于1000元，年费全退。',
          '分享注册普通会员各奖励一百元礼包：50元优惠券    (无门槛）+50元干洗券（无门槛）',
          '分享注册超级会员各奖励一千元礼包：500元优惠    券(满699可用）+500元干洗券（无门槛）',
          '会员年累计干洗券/优惠券用满15张可免次年年费',
        ]
      }
    }
	}
</script>

<style>
  .vipDetailContent {
    color: #333333;
    font-size: 30rpx;
    padding: 64rpx 4%;
    box-sizing: border-box;
    line-height: 1.4;
  }
  .vipDetailContent-list {
    margin-bottom: 29rpx;
    display: flex;
  }
  .vipDetailContent-more {
    margin-top: 40rpx;
    text-align: center;
  }
  .vipDetailContent-last {
    display: flex;
  }
  .vipDetailContent-last-info view {
    margin-bottom: 29rpx;
  }
</style>
