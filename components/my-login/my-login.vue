<template>
	<view>
		<view class="login-container">
			<!-- 图标 -->
			<uni-icons type="person" size="100" color="#7e7e7e"></uni-icons>
			<!-- 按钮 -->
			<button type="default" size="mini" class="btns" @click="getUserInfo">一键登录</button>
			<!-- 提示文本 -->
			<view class="tip-txt">登录之后尽享更多权益</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
			};
		},
		computed: {
			...mapState('my_user',['redirectInfo'])
		},
		methods: {
			...mapMutations('my_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			navigateBack() {
				let that = this
				// 进行判断
				if (this.redirectInfo || this.redirectInfo.openType === 'switchTab') {
					// 进行跳转
					uni.switchTab({
						url: this.redirectInfo.from,
						complete() {
							that.updateRedirectInfo(null)
						}
					})
				}
			},
			getUserInfo() {
				let that = this
				uni.getUserProfile({
					desc: "获取用户信息",
					success(res) {
						// console.log(res);
						that.updateUserInfo(res.userInfo)
						that.getToken(res)
						
					},
					fail(res) {
						uni.$showMsg('授权取消')
					}
				})
			},
			async getToken(info) {
				// console.log(info);
				// 获取code的值
				const [err,res] = await uni.login().catch(err => err)
				// console.log(res);
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				
				// 准备需要的参数
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// 发起数据请求
				const {data: loginResualt} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				if (loginResualt.meta.status !== 200)
				// return uni.$showMsg('登录失败')
				// uni.$showMsg('登录成功')
				// this.updateToken(res.code)
				this.updateToken(this.token)
				// 调用返回的方法
				this.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 150px 10px;
		.btns {
			width: 100%;
			height: 50px;
			text-align: center;
			line-height: 50px;
			font-size: 20px;
			background-color: #c00000;
			color: #fff;
			border-radius: 15px;
		}
		.tip-txt {
			margin-top: 10px;
			font-size: 12px;
			color: #b5b5b5;
		}
	}
</style>