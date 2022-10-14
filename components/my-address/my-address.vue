<template>
	<view>
		<!-- 添加收货地址按钮 -->
		<view class="address-addbox" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="choseAddress">请选择收货地址+</button>
			
		</view>
		<!-- 收货地址盒子 -->
		<view class="address-box" v-else @click="choseAddress">
			<!-- 第一行 -->
			<view class="row1">
				<view class="name">姓名:{{address.userName}}</view>
				<view class="tel-box">
					<view class="tel">电话:{{address.telNumber}}</view>
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
			<!-- 第二行 -->
			<view class="row2">
				<view class="address">收货地址:</view>
				<view class="address-title">{{addressInfo}}</view>
			</view>
			
		</view>
		<!-- 底部边框线 -->
		<image src="../../static/cart_border@2x.png" mode="widthFix" class="border-line"></image>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address: {}
			};
		},
		computed: {
			...mapState('my_user',['address']),
			...mapGetters('my_user',['addressInfo'])
		},
		methods: {
			...mapMutations('my_user',['updateAddress']),
			async choseAddress() {
				// 调用uni.chooseAddress返回地址数据
				const [err,res] = await uni.chooseAddress().catch(err => err)
				// console.log(res);
				
				if (res.errMsg === 'chooseAddress:ok')
				// this.address = res
				// // console.log(this.address);
				this.updateAddress(res)
				
			}
		}
	}
</script>

<style lang="scss">
	.address-addbox {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-box {
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.border-line {
		display: block;
		height: 5px;
		width: 100%;
	}
	.address-box {
		padding: 5px;
		font-size: 14px;
		.row1 {
			display: flex;
			justify-content: space-between;
			.tel-box {
				display: flex;
				justify-content: space-around;
			}
		}
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;
			.address {
				white-space: nowrap;
			}
		}
	}
</style>