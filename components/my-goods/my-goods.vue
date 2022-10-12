<template>
	<view>
		<view class="goods-list-item">
			<!-- 商品左侧图片区域 -->
			<view class="goods-list-item-left">
				<image :src="goods.goods_small_logo || defaultPic" mode="widthFix" class="itempic"></image>
			</view>
			<!-- 右侧文本区域 -->
			<view class="goods-list-item-right">
				<!-- 标题文本 -->
				<view class="goods-list-item-right-name">{{goods.goods_name}}</view>
				<!-- 价格区域 -->
				<view class="goods-list-item-right-price">￥{{changePrice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		name:"my-goods",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		computed: {
			// 商品价格保留两位小数
			changePrice() {
				// return this.goods.goods_price + '.' + '00'
				return Number(this.goods.goods_price).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-list-item {
		display: flex;
		margin: 10px 10px;
		border: 1px solid #ccc;
		box-shadow: 5px 5px 5px #ccc;
		
		.goods-list-item-left {
			margin-right: 20px;
			
			.itempic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-list-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 5px 10px;
			.goods-list-item-right-name {
				font-size: 13px;
			}
			.goods-list-item-right-price {
				font-size: 16px;
				color: #C00000;
			}
		}
	}
</style>