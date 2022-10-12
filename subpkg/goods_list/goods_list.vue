<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,i) in goodslist" :key="item.goods_id" @click="gotoGoodsDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodslist: [],
				tatol: 0,
				isLoading: false
			};
		},
		onLoad(options) {
			// console.log(options);
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			
			this.getGoodsList()
			
		},
		methods: {
			async getGoodsList(cb) {
				// 打开节流阀
				this.isLoading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				this.isLoading = false
				// 只要数据请求完成，就需要关闭下拉刷新，先判断是否有回调传入
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMsg()
				// 新旧数据进行拼接
				this.goodslist = [...this.goodslist,...res.message.goods]
				this.tatol = res.message.total
				// console.log(res.message);
				
			},
			gotoGoodsDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		},
		onReachBottom() {
			// 判断是否还继续发请求
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.tatol) return uni.$showMsg('数据加载完毕...')
			// 先判断是否处于请求数据
			if (this.isLoading) return
			// 让页码值+1
			this.queryObj.pagenum++
			// 重新获取数据
			this.getGoodsList()
		},
		// 监听下拉刷新事件
		onPullDownRefresh() {
			// 重置数据
			this.queryObj.pagenum = 1
			this.tatol = 0
			this.isLoading = false
			this.goodslist = []
			
			// 重新发起请求(并传入一个回调关闭下拉刷新)
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
</style>
