import Vue from 'vue'
import Vuex from 'vuex'
import { logout, updateUserInfo } from '@/api/user.js'

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
	},
	mutations: {
		login(state, data) {
			state.userName = data.nickname
			state.vvip = data.type === 1 ? false : true
			state.tempLogin = true
		},
		updateUserInfo(state, userInfo) {
			state.userName = userInfo.nickName
			state.userAvater = userInfo.avatarUrl
			state.userInfo = userInfo
			state.hasLogin = true;
		},
		updateUserIPhone(state, userPhone) {
			state.userPhone = userPhone
		},
		logout(state) {
			state.userName = '';
			state.userAvater = '/static/img/userHead.png'
			state.userVip = false
			state.userPhone = ''
			state.userInfo = {}
			state.hasLogin = false;
		},
	},
	actions: {
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
