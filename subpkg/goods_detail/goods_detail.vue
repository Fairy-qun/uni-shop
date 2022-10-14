<template>
	<view v-if="goodsInfo.goods_name" class="goodsInfoContainer">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goodsInfo.pics" :key="i">
				<image :src="item.pics_big" mode="widthFix" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info">
			<!-- 商品价格 -->
			<view class="goods-price">￥{{goodsInfo.goods_price}}</view>
			<!-- 商品主体 -->
			<view class="goods-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goodsInfo.goods_name}}</view>
				<!-- 商品收藏 -->
				<view class="goods-college">
					<uni-icons type="star" size="24"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 是否免运费区域 -->
			<view class="transport-price">
				<text>快递:免运费</text>	
			</view>
		</view>
		<!-- 商品介绍区域 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 商品导航区域 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				goodsInfo: {},
				 options: [{
							icon: 'shop',
							text: '店铺',
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 0
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
			};
		},
		computed: {
			...mapGetters('my_cart',['total'])
		},
		watch: {
			// 监听加入购物车的数量
			// total(newValue) {
			// 	const findResult = this.options.find((x) => x.text === '购物车')
			// 	if (findResult) {
			// 		// 动态为购物车数据赋新值
			// 		findResult.info = newValue
			// 	}
			// }
			total: {
				handler(newValue) {
					const findResult = this.options.find(x => x.text === '购物车')
					if (findResult) {
						findResult.info = newValue
					}
				},
				immediate: true
			}
		},
		onLoad(options) {
			// console.log(options);
			// 获取商品id
			const goodsId = options.goods_id
			// 获取数据
			this.getGoodsDetail(goodsId)
		},
		methods: {
			...mapMutations('my_cart',['addToCart']),
			buttonClick(e) {
				// console.log(e);
				if (e.content.text === '加入购物车') {
					// 包装一个商品对象
					const goods = {
						goods_id: this.goodsInfo.goods_id,
						goods_name: this.goodsInfo.goods_name,
						goods_price: this.goodsInfo.goods_price,
						goods_count: 1,
						goods_small_logo: this.goodsInfo.goods_small_logo,
						goods_state: true
					}
					// 调用映射过来的addToCart方法，将数据加入到购物车
					this.addToCart(goods)
				}
			},
			async getGoodsDetail(goodsId) {
				// console.log(goodsId);
				// 发起数据请求
				const {data: res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id:goodsId})
				// console.log(res);
				if (res.meta.status !== 200) return uni.$showMsg()
				// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题,为了解决能在iso设备上查看，讲webp格式转换为jpg格式
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;"').replace(/webp/g,'jpg')
				this.goodsInfo = res.message
			},
			// 轮播图预览
			preview(i) {
				// console.log(i);
				// 调用uni.previewImage方法预览图片
				uni.previewImage({
					current: i,
					urls: this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				// console.log(e);
				// 判断点击是否是购物车，然后跳转到购物车页面
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.goods-info {
		margin: 10px;
		margin-right: 0;
		.goods-price {
			color: #C00000;
		}
		.goods-body {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 12px;
			.goods-name {
				margin-right: 10px;
			}
			.goods-college {
				width: 120px;
				display: flex;
				flex-direction: column;
				align-items: center;
				border-left: 1px solid #ccc;
				color: gray;
			}
		}
		.transport-price {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}
	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.goodsInfoContainer {
		padding-bottom: 50px;
	}
</style>
