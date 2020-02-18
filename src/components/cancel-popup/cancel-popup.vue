<template>
  <view class="cancelPopupWrapper">
    <view class="title">取消订单</view>
    <view class="subTitle">请选择取消订单原因</view>
    <view class="reasonList">
      <view class="reasonItem" v-for="(item, index) in reasonList" :key="item" @tap="chooseReason(index)">
        <view class="reasonItem-label">{{ item }}</view>
        <view class="reasonItem-value" :class="{ active: activeReasonIndex === index }"></view>
      </view>
    </view>
    <view class="buttonBar">
      <view class="buttonBar-cancel" @tap="$emit('hidePopup')">暂不取消</view>
      <view class="buttonBar-confirm" @tap="cancelOrder">确认取消</view>
    </view>
  </view>
</template>

<script>
  import { cancelOrder } from '@/api/user.js'
  
	export default {
		props:{
			currentOrderInfo: Object
    },
    data () {
      return {
        reasonList: ['我不想洗了', '信息填写错误，重新拍', '其他原因'],
        activeReasonIndex: 0,
      }
    },
    methods: {
      chooseReason (index) {
        this.activeReasonIndex = index
      },
      async cancelOrder () {
				uni.showLoading({ title: '正在取消订单' });
        const [error , { data }] = await cancelOrder({ id: this.currentOrderInfo.id, remark: this.reasonList[this.activeReasonIndex] })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '订单取消失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
				uni.showToast({ icon: 'none', title: '取消成功' })
				this.$emit('changeOrderStatus', 0)
				this.$emit('hidePopup', 0)
			},
    }
	}
</script>

<style lang="scss" scoped>
.cancelPopupWrapper {
  background-color: #fff;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  padding: 38rpx 3%;
  color: #333;
  line-height: 1;
  .title {
    font-size: 36rpx;
    padding-bottom: 30rpx;
    border-bottom: 2rpx solid #f2f2f2;
    text-align: center;
  }
  .subTitle {
    color:#A7A7A7;
    font-size: 30rpx;
    padding: 30rpx 0 20rpx;
  }
  .reasonList {
    .reasonItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28rpx 0;
      border-bottom: 2rpx solid #f2f2f2;
      &:last-child {
        border-bottom: none;
      }
      &-label {
        font-size: 30rpx;
      }
      &-value {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        border: 2rpx solid #f2f2f2;
        &.active {
          background: radial-gradient(ellipse at center, rgb(243, 31, 100) 0,rgb(243, 31, 100) 45%,rgb(243, 31, 100) 45%,#ffffff 45%,#ffffff 55%,rgb(243, 31, 100) 55%,rgb(243, 31, 100) 100%);
        }
      }
    }
  }
  .buttonBar {
    display: flex;
    color: #fff;
    font-size: 30rpx;
    text-align: center;
    border-radius: 70rpx;
    overflow: hidden;
    margin-top: 40rpx;
    box-sizing: border-box;
    > view {
      flex: 1;
      padding: 20rpx 0;
    }
    &-cancel {
      background-color: #309EEB;
    }
    &-confirm {
      background-color: rgb(242, 26, 97);
    }
  }
}
</style>
