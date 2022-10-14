import {mapGetters} from 'vuex'

// 导出一个 mixin 对象
export default {
	
	computed: {
		...mapGetters('my_cart',['total'])
	},
	onShow() {
		this.isSetBadge()
	},
	watch: {
		total(val) {
			this.setBadge()
			if (val === 0) {
				this.removeBadge()
			}
		}
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''  // 徽标内容只能是字符串，不能是数字
			})
		},
		removeBadge() {
			uni.removeTabBarBadge({
				index: 2
			})
		},
		isSetBadge() {
			if (this.total !== 0) {
				this.setBadge()
			}
		}
	},
}