<template>
	<view @click="serachHandler">
		<view class="my-serach-box" :style="{'background-color': bgcolor}">
			<!-- 使用view组件模拟搜索框 -->
			<view class="my-serach-item" :style="{'border-radius': radius + 'px' }">
				<uni-icons type="search" size="17"></uni-icons>
				<text class="placeholder">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-serach",
		props: {
			bgcolor: {
				type: String,
				default: '#5980a3'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			serachHandler() {
				// 调用自定义搜索组件绑定的点击事件
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-serach-box {
		display: flex;
		align-items: center;
		padding: 0 10px;
		height: 50px;
		// background-color: #5980a3;
		.my-serach-item {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 36px;
			// border-radius: 15px;
			background-color: #fff;
			
		}
	}
	.placeholder {
		margin-left: 10rpx;
		font-size: 14px;
	}
</style>