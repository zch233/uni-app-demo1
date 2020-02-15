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
					const [error, { data }] = await login({ js_code: code })
					if (error) {
						uni.showToast({ icon: 'none', title: '登陆失败' })
						return
					}
					uni.setStorageSync('access_token', data.data.access_token)
					this.login(data.data)
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
