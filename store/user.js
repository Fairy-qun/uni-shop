export default {
	namespaced: true,
	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{}')
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
		}
	}
}