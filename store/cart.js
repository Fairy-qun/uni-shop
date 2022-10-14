export default {
	namespaced: true,
	state: {
		// 查看本地存储当中是否有cart数据，有就取出来，没有就为空数组
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	},
	getters: {
		total(state) {
			// let num = 0
			// state.cart.forEach(goods => num += goods.goods_count)
			// return num
			return state.cart.reduce((total,item) => total += item.goods_count,0)
		},
		// 判断当前勾选的数量用于渲染结算的数目
		checkCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count,0)
		},
		// 动态计算所有已被勾选的商品的总价格
		updateGoodsAllCheckPrice(state) {
			return state.cart.filter(x => x.goods_state).reduce((total,item) => {
				return total += item.goods_count * item.goods_price
			},0).toFixed(2)
		}
	},
	actions: {},
	mutations: {
		saveToStorage(state) {
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		addToCart(state,goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (!findResult) {
				// 如果购物车中没有，直接添加
				state.cart.push(goods)
			} else {
				// 如果购物车中有，更新商品数量
				state.cart.goods_count++
			}
			// 调用commit提交到下一个mutations任务方法执行
			this.commit('my_cart/saveToStorage')
		},
		// 编写更新选择框的函数
		updateRadio(state,goods) {
			const findResualt = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResualt) {
				// 更新对应商品的状态
				findResualt.goods_state = goods.goods_state
				// 提交数据，用于持久化存储
				this.commit('my_cart/saveToStorage')
			}
		},
		// 更新商品购物车中的数量
		updateGoodsNum(state,goods) {
			const findResualt = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResualt) {
				// 更新对应商品购物车中的数量
				findResualt.goods_count = goods.goods_count
				// 提交数据
				this.commit('my_cart/saveToStorage')
			}
		},
		// 删除购物车商品的函数
		deleteGoodsById(state,goods) {
			// 将当前数据过滤掉
			state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			this.commit('my_cart/saveToStorage')
		},
		
		// 定义方法，用于进行商品的反选
		updateGoodsAllCheck(state,newState) {
			state.cart.forEach(item => item.goods_state = newState)
			// 提交持久化存储
			this.commit('my_cart/saveToStorage')
		}
	}
}