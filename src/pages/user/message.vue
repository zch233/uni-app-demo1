<template>
	<view class="messageList">
    <view class="messageList-empty" v-if="messageList.length === 0">
      您当前暂无新消息
    </view>
    <view class="messageList-item" v-for="item in messageList" :key="item.id" :class="{ disabled: item.status === 2 }" @tap="viewMessage(item)">
      <view class="messageList-item-title">{{ item.created_time }}</view>
      <view class="messageList-item-content">
        <view class="messageList-item-content-top">{{ item.order_id }}</view>
        <view class="messageList-item-content-bottom">
          <view class="messageList-item-content-bottom-status">{{ item.message }}</view>
          <view class="messageList-item-content-bottom-good">
            <image mode='widthFix' src="/static/img/good.png"></image>
            <text>{{ item.goods_detail.map(v => `${v.title}x${v.buy_number}`).join('，') }}</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="end" class="messageList-end">已经到底啦~</view>
  </view>
</template>

<script>
  import { getMessageList, viewMessage } from '@/api/user.js'

	export default {
    data () {
      return {
        messageList: [],
        page: 1,
        end: false
      }
    },
    onLoad () {
      this.getMessageList()
    },
    onPullDownRefresh() {
      this.page = 1
      this.messageList = []
			this.getMessageList('refresh')
		},
    async onReachBottom () {
      if (end) return
      this.page += 1
      const data = await this.getMessageList()
    },
    methods: {
      async getMessageList (refresh) {
				uni.showLoading({ title: '加载中' });
				const [error, { data }] = await getMessageList({ status: 'all',page_size: 10, page: this.page })
        uni.hideLoading();
        if (refresh) uni.stopPullDownRefresh()
        if (error) {
          uni.showToast({ icon: 'none', title: '获取失败' })
          return
				}
				if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
        }
        this.messageList = this.messageList.concat(data.data.data)
        if (data.data.total_num < data.data.page_size * 10) {
          this.end = true
        }
        return data.data
      },
      async viewMessage (message) {
        if (message.status === 2) return
        await viewMessage({ id: message.id })
        message.status = 2
      }
    }
  }
</script>

<style lang="scss" scope>
  .messageList {
    min-height: 100vh;
    box-sizing: border-box;
    background-color: rgb(247, 247, 247);
    padding: 4%;
    &-empty {
      text-align: center;
      font-size: 36rpx;
      color: #999;
      padding-top: 7vh;
    }
    &-end {
      text-align: center;
      font-size: 30rpx;
      color: #999;
      padding: 1em 0;
    }
    &-item {
      color: #333333;
      &.disabled {
        filter: grayscale(100%);
        pointer-events: none;
        opacity: .7;
        color: #666;
      }
      &-title {
        font-size: 24rpx;
        text-align: center;
      }
      &-content {
        margin: 30rpx 0;
        background-color: #fff;
        border-radius: 20rpx;
        &-top {
          font-size: 36rpx;
          padding: 30rpx 20rpx;
          border-bottom: 2rpx solid #f2f2f2;
        }
        &-bottom {
          padding: 28rpx 20rpx;
          &-status {
            font-size: 36rpx;
            margin-bottom: 28rpx;
          }
          &-good {
            display: flex;
            image {
              width: 120rpx;
            }
            text {
              flex: 1;
              font-size: 28rpx;
              padding-left: 18rpx;
              padding-top: 26rpx;
              word-break: break-all;
              background-color: rgb(243, 243, 243);
            }
          }
        }
      }
    }
  }
</style>
