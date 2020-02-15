<template>
	<view class="content">
		<view class="settingItem">修改手机号</view>
		<view class="settingItem" @tap="$refs.popup.open()">退出登陆</view>
		<uniPopup ref="popup" :maskClick="false">
			<view class="popupWrapper">
				<view class="title">是否确认退出登陆</view>
				<view class="buttonBar">
					<view class="buttonBar-cancel" @tap="$refs.popup.close()">取消</view>
					<view class="buttonBar-confirm" @tap="bindLogout">确认</view>
				</view>		
			</view>
    </uniPopup>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	import { logout } from '@/api/user.js'
	import uniPopup from 'components/uni-popup/uni-popup.vue'

	export default {
		components: { uniPopup },
		methods: {
			...mapMutations(['logout']),
			async bindLogout () {
				const [error, { data }] = await logout()
				if (error) {
					uni.showToast({ icon: 'none', title: '退出失败' })
					return
				}
				this.logout();
				uni.reLaunch({
					url: '../index/index',
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.content {
	box-sizing: border-box;
	padding: 0 4%;
}
.settingItem {
	color: #333333;
	font-size: 30rpx;
	padding: 40rpx 0;
	border-bottom: 2rpx solid #f2f2f2;
}
.popupWrapper {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 70rpx 60rpx;
	text-align: center;
	width: 90%;
	.title {
		color: #333;
		font-size: 36rpx;
		margin-bottom: 99rpx;
	}
	.buttonBar {
		display: flex;
		justify-content: space-between;
		&-cancel, &-confirm {
			border-radius: 10rpx;
			padding: 22rpx 72rpx;
			border: 2rpx solid #F22061;
		}
		&-cancel {
			background-color: #F22061;
			color: #fff;
		}
		&-confirm {
			background-color: #fff;
			color: #F22061;
		}
	}
}
</style>
