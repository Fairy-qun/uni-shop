<template>
	<view class="container">
		<!-- 登录组件 -->
		<my-login v-if="!token"></my-login>
		<!-- 用户信息组件 -->
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import my_minx from '../../mixins/tabbar-badge.js'
	export default {
		mixins: [my_minx],
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('my_user',['token'])
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100%;
	}

</style>
