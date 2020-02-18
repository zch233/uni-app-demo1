<template>
	<view class="content">
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true"></app-tabs>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<!--全部 -->
			<swiper-item>
				<mescroll-item :i="0" :status="99" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
			
			<!-- 待支付 -->
			<swiper-item>
				<mescroll-item :i="1" :status="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
			
			<!-- 待取货 -->
			<swiper-item>
				<mescroll-item :i="2" :status="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
			
			<!-- 待收货 -->
			<swiper-item>
				<mescroll-item :i="3" :status="5" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>

			<!-- 待评价 -->
			<swiper-item>
				<mescroll-item :i="4" :status="6" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./order-item.vue";
	import AppTabs from "@/components/other/app-tabs.vue";
	
	export default {
		components: {
			MescrollItem,
			AppTabs
		},
		data() {
			return {
				height: "400px", // 需要固定swiper的高度
				tabs: ['全部', '待支付', '待取货', '待收货', '待评价'],
				tabIndex: 0 // 当前tab的下标
			}
		},
		methods: {
			// 轮播菜单
			swiperChange(e){
				this.tabIndex = e.detail.current
			}
		},
		onLoad(e) {
			this.tabIndex = parseInt(e.page, 10)
			// 需要固定swiper的高度
			this.height = uni.getSystemInfoSync().windowHeight + 'px'
		}
	}
</script>

<style>
.content {
	background-color: rgb(247, 247, 247);
}
</style>
