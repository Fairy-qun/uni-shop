<template>
	<view>
		<view class="userinfo-container">
			<!-- 顶部头像区域 -->
			<view class="userinfo-top">
				<!-- 头像 -->
				<image :src="userinfo.avatarUrl" mode="heightFix" class="avatar"></image>
				<!-- 用户名 -->
				<view class="nickname">Qun</view>
			</view>
			
			<!-- 底部面板区域 -->
			<view class="userinfo-button">
				<!-- 第一个面板 -->
				<view class="first-panel">
					<view class="one">
						<view class="sum">10</view>
						<view class="shopname">收藏的店铺</view>
					</view>
					<view class="one">
						<view class="sum">14</view>
						<view class="shopname">收藏的商品</view>
					</view>
					<view class="one">
						<view class="sum">18</view>
						<view class="shopname">关注的商品</view>
					</view>
					<view class="one">
						<view class="sum">86</view>
						<view class="shopname">足迹</view>
					</view>
				</view>
				
				<!-- 第二个面板 -->
				<view class="secound-panel">
					<!-- 标题 -->
					<view class="title">我的订单</view>
					<view class="item-list">
						<view class="one">
							<image src="../../static/my-icons/icon1.png" mode="widthFix"></image>
							<text>待付款</text>
						</view>
						<view class="one">
							<image src="../../static/my-icons/icon2.png" mode="widthFix"></image>
							<text>待收货</text>
						</view>
						<view class="one">
							<image src="../../static/my-icons/icon3.png" mode="widthFix"></image>
							<text>退款/退货</text>
						</view>
						<view class="one">
							<image src="../../static/my-icons/icon4.png" mode="widthFix"></image>
							<text>全部订单</text>
						</view>
					</view>
				</view>
				<!-- 第三个面板 -->
				<view class="third-panel">
					<view class="adress">
						<view class="txt">收货地址</view>
						<uni-icons type="right" size="18"></uni-icons>
					</view>
					<view class="support">
						<view class="txt">联系客户</view>
						<uni-icons type="right" size="18"></uni-icons>
					</view>
					<view class="logout" @click="logout">
						<view class="txt">退出登录</view>
						<uni-icons type="right" size="18"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('my_user',['userinfo'])
		},
		methods: {
			...mapMutations('my_user',['updateUserInfo','updateToken','updateAddress']),
			async logout() {
				const [err,res] = await uni.showModal({
					title: '提示',
					content: '确认退出登录?'
				}).catch(err => err)
				
				if (res,res.confirm) {
					// 用户点击了确认按钮
					// 清除用户信息
					this.updateUserInfo({})
					// 清除token
					this.updateToken('')
					// 清除用户收货地址
					this.updateAddress({})
				}
			}
		}
	}
</script>

<style lang="scss">
	.userinfo-container{
		height: 100%;
		background-color: #cfcfcf;
		.userinfo-top {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 200px;
			background-color: #730000;
			.avatar {
				width: 100px;
				height: 100px;
				border-radius: 50%;
				border: 2px solid white;
				box-shadow: 0 1px 5px #cfcfcf;
			}
			.nickname {
				font-size: 20px;
				color: #fff;
				margin-top: 10rpx;
			}
		}
	}

	.userinfo-button {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		.first-panel {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: -10px 10px;
			padding: 0 10px;
			background-color: #fff;
			height: 50px;
			box-shadow: 5px 5px 5px #cfcfcf;
			border-radius: 3px;
			font-size: 12px;
			
			.one {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-top: 5px;
			}
		}
		.secound-panel {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 140px;
			background-color: #fff;
			box-shadow: 5px 5px 5px #cfcfcf;
			border-radius: 3px;
			font-size: 12px;
			margin: 0 10px;
			margin-top: 20px;
			.title {
				font-size: 20px;
				margin-left: 10px;
			}
			.item-list {
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				.one {
					display: flex;
					flex-direction: column;
					justify-content: center;
					image {
						width: 50px;
						height: 50px;
					}
					text {
						margin-left: 5px;
					}
				}
			}
			
		}
		.third-panel {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			padding: 0 10px;
			height: 140px;
			background-color: #fff;
			box-shadow: 5px 5px 5px #cfcfcf;
			border-radius: 3px;
			font-size: 18px;
			margin: 10px 10px;
			
			.adress {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #ccc;
			}
			.support {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #ccc;
			}
			.logout {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #ccc;
			}
			.txt {}
		}
	}
</style>