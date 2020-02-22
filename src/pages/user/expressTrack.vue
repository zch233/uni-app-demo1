<template>
	<view class="content">
    <view class="card goodInfo">
      <view class="goodInfo-top">
        <view class="goodInfo-top-item">
          <image mode='widthFix' src="/static/img/good.png"></image>
          <view>上衣×2</view>
        </view>
      </view>
      <view class="goodInfo-bottom">
        <view>已发货</view>
        <text>预计后天到达</text>
      </view>
    </view>
    <view class="card expressInfo">
      <image mode='widthFix' src="/static/img/express.png"></image>
      <view>
        <view>顺丰速运 123456789123</view>
        <text>官方电话 95338</text>
      </view>
    </view>
    <view class="card trackInfo">
      <view class="trackInfo-trackFinall">
        <image mode='widthFix' src="/static/img/trackFinall.png"></image>
        <view>收货地址：安徽省池州市 某某街道 某某小区 3 号楼4单元5007</view>
      </view>
      <view class="trackInfo-trackItem">
        <view class="trackInfo-trackItem-time">
          <view>02-04</view>
          <text>16:36</text>
        </view>
        <image mode='widthFix' src="/static/img/trackStore.png"></image>
        <view class="trackInfo-trackItem-tips">运输中 已离开 合肥分拨中心合肥分拨中心合肥分拨中心</view>
      </view>
      <view class="trackInfo-trackItem">
        <view class="trackInfo-trackItem-time">
          <view>02-04</view>
          <text>16:36</text>
        </view>
        <image mode='widthFix' src="/static/img/trackStore.png"></image>
        <view class="trackInfo-trackItem-tips">运输中 已离开 合肥分拨中心</view>
      </view>
    </view>
	</view>
</template>

<script>
  import { getExpressTrack } from '@/api/user.js'
  
	export default {
    data () {
      return {
        order_id: ''
      }
    },
    onLoad(e) {
      this.order_id = e.order_id
      this.getExpressTrack()
    },
    methods: {
      async getExpressTrack (refresh) {
        uni.showLoading({ title: '加载中' });
				const [error, { data }] = await getExpressTrack({ order_id: this.order_id })
				if (refresh) uni.stopPullDownRefresh()
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '获取失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
        this.orderInfo = data.data.order_count
      }
    },
    onPullDownRefresh() {
      this.getExpressTrack('refresh')
    },
	}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 4%;
  box-sizing: border-box;
  background-color: rgb(247, 247, 247);
  color: #333333;
  line-height: 1;
  min-height: 100vh;
  .card {
    margin-bottom: 39rpx;
    border-radius: 20rpx;
    background-color: #fff;
    box-sizing: border-box;
  }
  .goodInfo {
    &-top {
      display: flex;
      padding: 40rpx;
      font-size: 30rpx;
      text-align: center;
      box-sizing: border-box;
      &-item {
        margin-right: 42rpx;
      }
      image {
        width: 120rpx;
        margin-bottom: 30rpx;
        border-radius: 10rpx;
      }
    }
    &-bottom {
      background-color: rgb(243, 32, 98);
      color: #fff;
      font-size: 30rpx;
      padding: 30rpx 40rpx;
      box-sizing: border-box;
      > view {
        font-weight: bold;
        margin-bottom: 18rpx;
      }
    }
  }
  .expressInfo {
    padding: 40rpx;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    image {
      width: 120rpx;
      margin-right: 28rpx;
    }
    > view > view {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 28rpx;
    }
  }
  .trackInfo {
    padding: 28rpx 40rpx 28rpx 0;
    line-height: 1.4;
    font-size: 24rpx;
    image {
      width: 36rpx;
      margin-right: 11rpx;
      margin-top: 4rpx;
      background-color: #fff;
    }
    &-trackFinall {
      padding-left: 123rpx;
      margin-bottom: 60rpx;
      display: flex;
      color: #BBBBBB;
      position: relative;
      > view {
        flex: 1;
        &::before {
          content: '';
          position: absolute;
          left: 141rpx;
          top: 36rpx;
          width: 1rpx;
          height: 180%;
          z-index: 0;
          background-color: #BBBBBB;
        }
      }
    }
    &-trackItem {
      display: flex;
      position: relative;
      z-index: 2;
      height: 100rpx;
      &::before {
        content: '';
        position: absolute;
        left: 141rpx;
        top: 36rpx;
        width: 1rpx;
        height: 100%;
        z-index: 0;
        background-color: #BBBBBB;
      }
      &:last-child::before {
        display: none;
      }
      &-time {
        color: #8C8C8C;
        font-size: 20rpx;
        line-height: 1;
        padding-top: 10rpx;
        width: 123rpx;
        text-align: center;
        > view {
          font-size: 24rpx;
          margin-bottom: 8rpx;
        }
      }
      &-tips {
        margin-top: 4rpx;
        color: #BBBBBB;
        line-height: 1.4;
        flex: 1;
      }
    }
  }
}
</style>
