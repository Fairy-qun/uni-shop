<template>
	<view>
		<!-- 自定义搜索区域 -->
		<view class="topstick">
			<my-serach @click="gotoSearch"></my-serach>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode="widthFix" class="swiperPic"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-itemlist" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" mode="widthFix" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="flooter-list">
			<view class="flooter-itemlist" v-for="(item,i1) in flooterList" :key="i1">
				<image :src="item.floor_title.image_src" mode="widthFix" class="floor-title"></image>
				<view class="flooter-imgbox">
					<!-- 左边大图片 -->
					<navigator class="left-pic" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					
					<!-- 右边边小图片 -->
					<view class="right-pic">
						<navigator class="right-picitem" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
							
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import my_minx from '../../mixins/tabbar-badge.js'
	export default {
		mixins: [my_minx],
		data() {
			return {
				swiperList: [],
				navList: [],
				// 存储楼层数据
				flooterList: []

			};
		},
		onLoad() {
			this.getSwiperList(),
			this.getNavList(),
			this.getFlooterList()
		},
		// created() {
		// 	this.getSwiperList()
		// },
		methods: {
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(res);
				if (res.meta.status !== 200) {
					// return uni.showToast({
					// 	title: '数据请求失败',
					// 	icon: 'none',
					// 	duration: 1500
					// })
					return uni.$showMsg()
				}
				this.swiperList = res.message
			},
			// 获取分类导航数据
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navList = res.message
			},
			// 分类导航点击跳转函数
			navClickHandler(val) {
				// console.log(val.name);
				if (val.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 获取楼层数据
			async getFlooterList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 为楼层数据挂载一个自定义属性
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.flooterList = res.message
			}
		}
	}
</script>

<style lang="scss">
	.swiperPic {
		width: 100%;
	}
	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0;
		
		.nav-img {
			width: 128rpx;
			height: 140rpm;
		}
	}
	.floor-title {
	  height: 60rpx;
	  width: 100%;
	  display: flex;
	}
	.flooter-imgbox {
		display: flex;
		padding: 10rpx 10rpx;
		.right-pic {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
	.topstick {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
