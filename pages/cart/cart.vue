<template>
	<view>
	<view class="container" v-if="cart.length !== 0">
		<!-- 收货地址区域 -->
		<my-address></my-address>
		<!-- 购物车商品列表标题区域 -->
		<view class="cart-list-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text>购物车</text>
		</view>
		<!-- 商品列表区域 -->

		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="clickHandler(goods)">
					<my-goods :goods="goods" :showRadius="true" @radioChange="radioChangeHander" :showNum="true"
						@changeNum="changeNumClick"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 商品结算区域组件 -->
		<my-settle></my-settle>
	</view>
	<!-- 如果购物车中没有商品，则显示为空 -->
	<view class="isCartNull" v-else>
		<view class="isCartNull-item">
			<image src="../../static/cart_empty@2x.png" mode="widthFix"></image>
			<text>空空如也...</text>
		</view>
	</view>
	</view>
</template>

<script>
	import my_minx from '../../mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [my_minx],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		computed: {
			// 映射仓库中的数据进行使用
			...mapState('my_cart', ['cart'])
		},
		methods: {
			...mapMutations('my_cart', ['updateRadio', 'updateGoodsNum','deleteGoodsById']),
			radioChangeHander(e) {
				this.updateRadio(e)
			},
			changeNumClick(e) {
				// console.log(e);
				this.updateGoodsNum(e)
			},
			
			clickHandler(e) {
				// console.log(e);
				this.deleteGoodsById(e)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 50px;
	}
	.cart-list-title {
		padding: 10px 5px;
		height: 50rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;

		text {
			margin-left: 5px;
			font-size: 14px;
			color: #98e5b0;
		}
	}
	.isCartNull {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		.isCartNull-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image {
				width: 150px;
				height: 150px;
			}
			text {
				margin-top: 10px;
				font-size: 14px;
				color: #C00000;
				font-weight: 700;
			}
		}
	}
</style>
