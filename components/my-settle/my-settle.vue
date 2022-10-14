<template>
	<view>
	<view class="settle-box">
		<!-- 全选 -->
		<view class="select" @click="isCheck">
			<radio :checked="isFullCheck" color="#C00000"></radio>
			<text>全选</text>
		</view>
		<!-- 合计 -->
		<view class="amount">
			合计:<text>￥{{updateGoodsAllCheckPrice}}</text>
		</view>
		<!-- 结算 -->
		<view class="compute-amount">
			结算({{checkCount}})
		</view>
	</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('my_cart',['checkCount','total','updateGoodsAllCheckPrice']),
			// 用于判断已勾选的与总的是否相同
			isFullCheck() {
				return this.checkCount === this.total
			}
		},
		methods: {
			// 对商品进行判断选择
			...mapMutations('my_cart',['updateGoodsAllCheck']),
			isCheck() {
				this.updateGoodsAllCheck(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
	.settle-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 10px;
		width: 100%;
		height: 50px;
		background-color: #fff;
		font-size: 12px;
		
		.select {
			display: flex;
			align-items: center;
		}
		.amount {
			text {
				font-weight: 700;
				color: #c00000;
			}
		}
		.compute-amount {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: #fff;
			text-align: center;
			line-height: 50px;
		}
	}

</style>