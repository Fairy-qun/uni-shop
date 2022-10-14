<template>
	<view>
		<view class="goods-list-item">
			<!-- 商品左侧图片区域 -->
			<view class="goods-list-item-left">
				<radio :checked="goods.goods_state" color="#C00000" v-if="showRadius" @click="radioClickChange"></radio>
				<image :src="goods.goods_small_logo || defaultPic" mode="widthFix" class="itempic"></image>
			</view>
			<!-- 右侧文本区域 -->
			<view class="goods-list-item-right">
				<!-- 标题文本 -->
				<view class="goods-list-item-right-name">{{goods.goods_name}}</view>
				<!-- 价格区域 -->
				<view class="right-price">
					<view class="goods-list-item-right-price">￥{{changePrice}}</view>
					<uni-number-box :min="1" class="uni-num" :value="goods.goods_count" v-if="showNum" @change="changeNum"></uni-number-box>
				</view>
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
			},
			showRadius: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
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
		},
		methods: {
			radioClickChange() {
				this.$emit('radioChange',{
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			changeNum(val) {
				// console.log(val);
				this.$emit('changeNum',{
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
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
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-right: 5px;
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
			flex: 1;
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
	.right-price {
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.uni-num {
			border: 1px solid #ccc;
		}
	}
</style>