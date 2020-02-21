import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, updateUserInfo, globalInfo } from '@/api/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		tempLogin: false,
		hasLogin: false,
		userName: '',
		userAvater: '/static/img/userHead.png',
		userVip: false,
		userPhone: '',
		userInfo: {},
		userVipInfo: {},
		globalInfo: [],
	},
	mutations: {
		login(state, data) {
			state.userName = data.nickname
			state.userVip = state.hasLogin && (data.type === 1 ? false : true)
			state.tempLogin = true
		},
		updateUserInfo(state, userInfo) {
			state.userName = userInfo.nickName
			state.userAvater = userInfo.avatarUrl
			state.userInfo = userInfo
			state.hasLogin = true;
		},
		updateUserVipInfo(state, userVipInfo) {
			state.userVipInfo = userVipInfo
		},
		updateUserIPhone(state, userPhone) {
			state.userPhone = userPhone
		},
		saveGlobalInfo(state, data) {
			state.globalInfo = data
		},
		logout(state) {
			state.userName = '';
			state.userAvater = '/static/img/userHead.png'
			state.userVip = false
			state.userPhone = ''
			state.userInfo = {}
			state.hasLogin = false;
		},
		upgradeVip (state) {
			state.userVip = true;
		}
	},
	actions: {
		upgradeVip({ commit }) {
			return new Promise(async (resolve, reject) => {
				commit('upgradeVip')
				resolve()
      })
		},
		login({commit}, { code, invite_uid }) {
			return new Promise(async (resolve, reject) => {
				const [error, { data }] = await login({ js_code: code, invite_uid })
				if (error) {
					reject(error)
					return
				}
				uni.setStorageSync('access_token', data.data.access_token)
				commit('login', data.data)
				const [globalError, globalData] = await globalInfo()
				if (globalError) {
					reject(globalError)
					return
				}
				commit('saveGlobalInfo', globalData.data.data)
				resolve()
      })
		},
		updateUserInfo({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
				updateUserInfo({ nickname: userInfo.nickName, avatar: userInfo.avatarUrl }).then(() => {
					commit('updateUserInfo', userInfo)
					resolve()
				}).catch(error => {
          reject(error)
        })
      })
		},
		updateUserPhone({ commit }, mobile) {
      return new Promise((resolve, reject) => {
				updateUserInfo({ mobile }).then(() => {
					commit('updateUserIPhone', mobile)
					resolve()
				}).catch(error => {
          reject(error)
        })
      })
		},
		logout({ commit }) {
      return new Promise((resolve, reject) => {
				logout().then(() => {
					commit('logout')
					resolve()
				}).catch(error => {
          reject(error)
        })
      })
    },
	}
})

export default store
