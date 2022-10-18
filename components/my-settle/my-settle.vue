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
			<view class="compute-amount" @click="settlement">结算({{checkCount}})</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				// 倒计时的秒数
				secound: 3,
				// 设置延迟器
				timer: null
			};
		},
		computed: {
			...mapState('my_user', ['token']),
			...mapGetters('my_cart', ['checkCount', 'total', 'updateGoodsAllCheckPrice']),
			...mapGetters('my_user', ['addressInfo']),
			...mapState('my_cart', ['cart']),
			// 用于判断已勾选的与总的是否相同
			isFullCheck() {
				return this.checkCount === this.total
			}
		},
		methods: {
			// 对商品进行判断选择
			...mapMutations('my_cart', ['updateGoodsAllCheck']),
			...mapMutations('my_user', ['updateRedirectInfo']),
			isCheck() {
				this.updateGoodsAllCheck(!this.isFullCheck)
			},
			// 用户点击结算按钮时做相关的判断
			settlement() {
				if (!this.checkCount) return uni.$showMsg('请勾选需要结算的商品')
				if (!this.addressInfo) return uni.$showMsg('请选择收货地址')
				// if (!this.token) uni.$showMsg('请先登录')
				// 执行提示信息
				if (!this.token) return this.delayNavigate()

				// 实现微信支付功能
				this.payOrder()
			},
			async payOrder() {
				// 1.创建订单
				// 1.2 组织订单的信息对象
				const orderInfo = {
					// 开发阶段，直接写死价格
					// order_price: this.updateGoodsAllCheckPrice
					order_price: 0.01,
					consignee_addr: this.addressInfo,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_count: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				// 1.2 发起请求创建订单
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200) return uni.$showMsg('创建订单失败')
				console.log(res);
				// 1.3 得到服务器响应的订单编号
				const orderNumber = res.message.order_number
				console.log(orderNumber);

				// 2.实现订单预支付
				// 2.1 发起请求获取订单的支付信息
				const {
					data: res2
				} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: orderNumber
				})
				if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
				// 2.3 得到订单支付相关的必要参数
				const payInfo = res2.message.pay


				// 发起微信支付
				const [err, succ] = uni.requestPayment(payInfo)
				// 未完成支付
				if (err) return uni.$showMsg('订单未支付')
				// 3.3 完成了支付，进一步查询支付的结果
				const {
					data: res3
				} = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
					order_number: orderNumber
				})
				// 3.4 检测到订单未支付
				if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
				// 3.5 检测到订单支付完成
				uni.showToast({
					title: '支付完成',
					icon: 'success'
				})
			},
			// 用户没有登录的提示框方法
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请先登录之后再结算!' + n + '秒之后进行跳转到登录页',
					duration: 1500,
					mask: true
				})
			},
			// 延迟导航函数
			delayNavigate() {
				let that = this
				this.secound = 3
				this.showTips(this.secound)

				this.timer = setInterval(() => {
					this.secound--
					// 判断秒数是否到达0，然后清除定时器
					if (this.secound <= 0) {
						clearInterval(this.timer)

						// 导航到my页面
						uni.switchTab({
							url: '/pages/my/my',
							// 跳转成功之后再返回
							success() {
								// 将跳转后的数据存储到vuex中
								that.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.secound)
				}, 1000)
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
