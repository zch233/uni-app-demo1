<script>
	import { login } from '@/api/user.js'
	import { mapMutations } from 'vuex'

	export default {
		methods: {
			...mapMutations(['login']),
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.login({
				provider: 'weixin',
				success: async ({ code }) => {
					uni.showLoading({ title: '加载中' });
					this.$store.dispatch('login', code).then(() => {
						uni.hideLoading();
						console.log('登陆成功')
					})
				},
				fail: (err) => {
					console.error('授权登录失败：' + JSON.stringify(err));
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* @import "./common/uni.css"; */
	::-webkit-scrollbar {
		display: none;  
		width: 0 !important;  
		height: 0 !important;  
		-webkit-appearance: none;  
		background: transparent;  
	}
</style>
