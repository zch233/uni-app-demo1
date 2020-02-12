<template>
	<view class="content">
		<view class="card addressBar">1</view>
		<view class="card goodBar">2</view>
		<view class="card orderBar">3</view>
	</view>
</template>

<script>
	export default {
		methods: {
    }
	}
</script>

<style lang="scss" scoped>
.content {
	background-color: rgb(247, 247, 247);
	min-height: 100vh;
	padding: 0 4%;
	.card {
		border-radius: 20rpx;
		background-color: #fff;
		padding: 30rpx 20rpx;
		margin-bottom: 28rpx;
	}
}
</style>
