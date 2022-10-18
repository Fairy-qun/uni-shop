export default {
	namespaced: true,
	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// token: uni.getStorageSync('token') || '',
		token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null
	},
	getters: {
		addressInfo(state) {
			if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	},
	mutations: {
		// 更新收货地址方法
		updateAddress(state,address) {
			state.address = address
			
			// 提交到下一个mutations
			this.commit('my_user/saveToStorage')
		},
		// 将数据持久化存储
		saveToStorage(state) {
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		// 更新用户信息的函数
		updateUserInfo(state,userinfo) {
			state.userinfo = userinfo
			this.commit('my_user/saveToStorageUserInfo')
		},
		// 持久化存储
		saveToStorageUserInfo(state) {
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		// 更新token方法
		updateToken(state,newToken) {
			state.token = newToken
			this.commit('my_user/savaToToken')
		},
		// 持久化存储
		savaToToken(state) {
			uni.setStorageSync('token',state.token)
		},
		// 更新重定向回来的方法
		updateRedirectInfo(state,info) {
			state.redirectInfo = info 
		}
	}
}