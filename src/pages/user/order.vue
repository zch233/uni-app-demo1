<template>
	<view class="content">
    <view class="QS-tabs-box">
			<QSTabs 
			ref="tabs" 
			:tabs="tabs" 
			animationMode="line3" 
			:current="current" 
			@change="change"
      :minWidth="150"
			activeColor="#F22061"
			lineColor="#F22061"
      defaultColor="#333333"
      :space="0"
      :activeBold="false"
			:swiperWidth="750">
			</QSTabs>
		</view>
		<swiper
    style="height: calc(100vh - 80rpx)"
		:current="swiperCurrent"
		@transition="transition"
		@animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="tabs in tabs" :key="tabs">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<view class="scroll-items">
						<view class="scroll-item" v-for="(ite, ind) in 30" :key="ind">
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
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
  import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default {
		components: {
			QSTabs
		},
		data() {
			return {
				tabs: ['全部', '待支付', '待取货', '待收货', '待评价'],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0
			}
		},
		methods: {
			change(index) {
				this.swiperCurrent = index;
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({detail: { current }}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	}
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background-color: rgb(247, 247, 247);
}
.QS-tabs-box{
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
}
.scroll-items{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30rpx;
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
