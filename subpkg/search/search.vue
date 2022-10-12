<template>
	<view>
		<view class="search-box">
			<uni-search-bar bgColor="#d6d6d6" cancelButton="none" radius="100" @input="inputChange" @clear="clearInput"></uni-search-bar>
		</view>
		<!-- 渲染搜索建议区域 -->
		<view class="sug-list">
			<view class="sug-list-item" v-for="(item,i) in searchList" :key="item.goods_id" @click="gotoGoodsDetail(item.goods_id)">
				<view class="sug-list-item-name">{{item.goods_name}}</view>
				<!-- 图标 -->
				<uni-icons type="right" size="16"></uni-icons>
			</view>	
		</view>
		<!-- 搜索历史区域 -->
		<view class="his-list" v-if="kw === ''">
			<view class="his-list-title" v-if="historyUnique.length !== 0">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="22" @click="clearHistory"></uni-icons>
			</view>
			<view class="his-list-item">
				<uni-tag :text="item" type="default" v-for="(item,i) in historyUnique" :key="i" @click="gotoGoods_List(item)"></uni-tag>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				// 定义搜索建议列表
				searchList: [],
				// 搜索历史关键字列表
				historyList: [],
				listkw: []
			}
		},
		// 定义一个计算属性,用于将搜索历史列表去重
		computed: {
			historyUnique() {
				const result = [...new Set(this.historyList)]
				return result
			}
		},
		// 在加载onload时,判断history里是否有数据
		onLoad() {
			 this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			gotoGoods_List(val) {
				// console.log(val);
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + val
				})
			},
			// 触发清除input事件
			clearInput(e) {
				this.listkw.unshift(e.value)
				uni.setStorageSync('kw',JSON.stringify(this.listkw))
			},
			// 清除历史搜索
			clearHistory() {
				uni.removeStorageSync('kw')
				this.historyList = []
			},
			// 跳转到商品详情页面
			gotoGoodsDetail(goods_id) {
				// console.log(val);
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			inputChange(value) {
				// 防抖效果
				clearTimeout(this.timer)
				
				this.timer = setTimeout(() => {
					// console.log(value);
					this.kw = value
					this.getSearchList()
					this.saveSearchHistoryList()
				},500)
			},
			saveSearchHistoryList() {
				this.historyList.unshift(this.kw)
			},
			// 获取搜索建议函数
			async getSearchList() {
				if (this.kw.length === 0) {
					this.searchList = []
					return
				}
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query: this.kw})
				if (res.meta.status !==200) return uni.$showMsg()
				this.searchList = res.message
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		background-color: #5980a3;
	}
	.sug-list {
		.sug-list-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			height: 30px;
			border-bottom: 1px solid #ccc;
			.sug-list-item-name {
				font-size: 12px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
	.his-list {
		.his-list-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			height: 40px;
			border-bottom: 1px solid #ccc;
			text {
				font-size: 14px;
			}
		}
		.his-list-item {
			display: flex;
			flex-wrap: wrap;
			margin: 10px 0;
			.uni-tag {
				margin: 0 10px;
			}
		}
		
	}
</style>
