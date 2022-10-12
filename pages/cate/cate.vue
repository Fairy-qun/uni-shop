<template>
	<view>
		<!-- 自定义搜索区域 -->
		<my-serach @click="gotoSerach"></my-serach>
		<view class="scroolbox">
			<!-- 左侧滑动区域 -->
			<scroll-view class="leftscroll" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item',i === active ? 'active' : '']" @click="activeChange(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<!-- 二级分类列表区域 -->
				<view class="cate-lv2-list" v-for="(item2,i2) in cateLv2List" :key="i2">
					<view class="cate-lv2-title">
						/{{item2.cat_name}}/
					</view>
					<!-- 动态渲染三级分类的列表数据 -->
					    <view class="cate-lv3-list">
					      <!-- 三级分类 Item 项 -->
					      <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoods_list(item3)">
					        <!-- 图片 -->
					        <image :src="item3.cat_icon.replace('dev','web')"></image>
					        <!-- 文本 -->
					        <text>{{item3.cat_name}}</text>
					      </view>
					    </view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				// 获取分类数据
				cateList: [],
				active: 0,
				// 存储二级分类列表
				cateLv2List: [],
				// 滚动条距离顶部的距离
				scrollTop: 0
			};
		},
		onLoad() {
			const data = uni.getSystemInfoSync()
			this.wh = data.windowHeight - 50
			this.getCateList()
		},
		methods: {
			// 获取分类列表
			async getCateList() {
				const {data: res} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.cateList = res.message
				// 存储二级分类列表
				this.cateLv2List = res.message[0].children
			},
			// 更改激活的当前项
			activeChange(val) {
				this.active = val
				this.cateLv2List = this.cateList[val].children
				// 将滚动条重新置零
				this.scrollTop = this.scrollTop ? 0 : 1
			},
			// 跳转到商品列表页
			gotoGoods_list(val) {
				console.log(val);
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + val.cat_id
				})
			},
			// 点击搜索组件跳转到搜索页面
			gotoSerach() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroolbox {
		display: flex;
	}
	.leftscroll {
		width: 120px;
	}
	.left-scroll-view-item {
		background-color: #eaeaea;
		text-align: center;
		line-height: 60px;
		font-size: 12px;
		
		&.active {
			background-color: #fff;
			position: relative;
			
			&::before {
				content: '';
				display: block;
				width: 3px;
				height: 30px;
				background-color: #c00000;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
	}
	.cate-lv2-title {
		font-size: 12px;
		font-weight: 700;
		text-align: center;
		margin: 20px 0;
	}
	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			image {
				width: 60px;
				height: 60px;
			}
			text {
				font-size: 12px;
			}
		}
	}
</style>
