<template>
	<view class="content">
    <view class="card goodInfo">
      <scroll-view scroll-x class="goodInfo-top" scroll-with-animation>
        <view class="goodInfo-top-item" v-for="item in goodsList" :key="item.id">
          <image mode='widthFix' :src="item.image"></image>
          <view>{{ item.title }}×{{ item.buy_number }}</view>
        </view>
      </scroll-view>
      <view class="goodInfo-bottom">
        <view>{{ (status === 4 || statsu === 6) ? '已签收' : '已发货'  }}</view>
        <text>{{ (status === 4 || statsu === 6) ? '已送达' : '包裹地目的地越来越近了'  }}</text>
      </view>
    </view>
    <view class="card expressInfo send" :class="{ show: hideExpressTrackIndex === 1 }" @tap="switchExpressTrack(1)">
      <image mode='widthFix' src="/static/img/express.png"></image>
      <view>
        <view>顺丰速运 {{ mail_no }}</view>
        <text>官方电话 95338</text>
      </view>
    </view>
    <view class="card expressInfo collect" :class="{ show: hideExpressTrackIndex === 2, transparent: status <= 4 }" @tap="switchExpressTrack(2)">
      <image mode='widthFix' src="/static/img/express.png"></image>
      <view>
        <view>顺丰速运 {{ mail_no }}</view>
        <text>官方电话 95338</text>
      </view>
    </view>
    <view class="card trackInfo">
      <view class="trackInfo-trackFinall">
        <image v-if="status === 4 || statsu === 6" mode='widthFix' src="/static/img/trackFinall-active.png"></image>
        <image v-else mode='widthFix' src="/static/img/trackFinall.png"></image>
        <view>收货地址：{{ address }}</view>
      </view>
      <view class="trackInfo-trackItem" v-for="(item, index) in expressTrack" :key="index">
        <view class="trackInfo-trackItem-time">
          <view>{{ item.accept_time.split(' ')[0].slice(5) }}</view>
          <text>{{ item.accept_time.split(' ')[1] }}</text>
        </view>
        <image v-if="index === 0 && status !== 4 && statsu !== 6" mode='widthFix' src="/static/img/wlxx_mdysh_selected.png"></image>
        <image v-else mode='widthFix' src="/static/img/wlxx_mdysh_default.png"></image>
        <view class="trackInfo-trackItem-tips">{{ item.remark }}</view>
      </view>
    </view>
	</view>
</template>

<script>
  import { getExpressTrack } from '@/api/user.js'
  import { mapState } from 'vuex'
  
	export default {
    computed: {
			...mapState(['globalInfo', 'imgPath']),
		},
    data () {
      return {
        order_id: '',
        status: '',
        address: '',
        goodsList: [],
        mail_no: '',
        hideExpressTrackIndex: '',
        expressTrack: [],
      }
    },
    onLoad(e) {
      this.order_id = e.order_id
      this.status = e.status
      this.hideExpressTrackIndex = this.status <= 4 ? 1 : 2
      this.getExpressTrack(false, this.hideExpressTrackIndex)
    },
    methods: {
      switchExpressTrack (index) {
        if (this.hideExpressTrackIndex === index) return
        this.hideExpressTrackIndex = index
        this.getExpressTrack(false, index)
      },
      async getExpressTrack (refresh, type) {
        uni.showLoading({ title: '加载中' });
				const [error, { data }] = await getExpressTrack({ order_id: this.order_id, type })
				if (refresh) uni.stopPullDownRefresh()
        uni.hideLoading();
        if (error) {
          uni.showModal({
            title: '提示',
            content: '获取失败',
            showCancel: false,
            success: (res) => {
              uni.navigateBack()
            }
          });
          return
        }
        if (data.code !== 'success') {
          uni.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false,
            success: (res) => {
              uni.navigateBack()
            }
          });
					return
				}
        this.address = data.data.address
        this.goodsList = data.data.goods_detail.map(v => (v.image = this.imgPath + v.image) && v)
        this.expressTrack = data.data.express_route.map(v => v['@attributes']).reverse()
        this.mail_no = data.data.mail_no
      }
    },
    onPullDownRefresh() {
      this.getExpressTrack('refresh', this.hideExpressTrackIndex)
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
    margin-bottom: 80rpx;
    &-top {
      padding: 40rpx;
      font-size: 30rpx;
      box-sizing: border-box;
      &-item {
        margin-right: 42rpx;
        display: inline-block;
        text-align: center;
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
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 12rpx 6rpx rgba(0, 0, 0, 0.1);
    z-index: 0;
    &.collect {
      top: -280rpx;
      z-index: 0;
      &::before, &::after {
        content: '';
        position: absolute;
      }
      &::before {
        width: 110rpx;
        height: 110rpx;
        left: -55rpx;
        top: -55rpx;
        background-color: rgb(97, 167, 243);
        transform: rotate(45deg);
      }
      &::after {
        content: '收';
        color: #fff;
        font-size: 26rpx;
        font-weight: bold;
        left: 8rpx;top: 10rpx;
      }
    }
    &.send {
      top: -40rpx;
      &::before, &::after {
        content: '';
        position: absolute;
      }
      &::before {
        width: 110rpx;
        height: 110rpx;
        left: -55rpx;
        top: -55rpx;
        background-color: rgb(243, 32, 98);
        transform: rotate(45deg);
      }
      &::after {
        content: '寄';
        color: #fff;
        font-size: 26rpx;
        font-weight: bold;
        left: 8rpx;top: 10rpx;
      }
    }
    &.send.show {
      z-index: 2;
      top: 0;
    }
    &.collect.show {
      z-index: 2;
      top: -240rpx
    }
    &.collect.transparent {
      opacity: 0;
    }
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
    margin-top: -236rpx;
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
        bottom: 70rpx;
        width: 1rpx;
        height: 100%;
        z-index: -1;
        background-color: #BBBBBB;
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
