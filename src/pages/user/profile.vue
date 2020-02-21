<template>
	<view class="content">
		<view class="profileItem">
      <view class="profileItem-label">头像</view>
      <view class="profileItem-value">
        <image mode='widthFix' class="avatar" :src="userAvater"></image>
        <image mode='widthFix' class="right" src="/static/img/right.png"></image>
      </view>
    </view>
    <view class="profileItem">
      <view class="profileItem-label">姓名</view>
      <view class="profileItem-value">{{ userName }}</view>
    </view>
    <view class="profileItem">
      <view class="profileItem-label">手机号</view>
      <view v-if="userPhone">{{ userPhone }}</view>
      <button class="profileItem-value" open-type="getPhoneNumber" v-else @getphonenumber="getPhoneNumber">点击绑定手机号</button>
    </view>
	</view>
</template>

<script>
  import { mapState } from 'vuex'
  import { updateUserInfo, decrypt } from '@/api/user.js'

	export default {
		computed: {
			...mapState(['userPhone', 'userAvater', 'userName', 'userVipInfo']),
    },
    methods: {
      async getPhoneNumber ({ detail }) {
				if (detail.errMsg === 'getPhoneNumber:fail user deny'){
					uni.showModal({
							title: '提示',
							showCancel: false,
							content: '未授权',
					})
				} else {
          const [error, { data }] = await decrypt({ ...detail, uid: this.userVipInfo.uid})
          this.$store.dispatch('updateUserPhone', JSON.parse(data.data).phoneNumber)
				}
			},
    }
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
    margin: 0;
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
