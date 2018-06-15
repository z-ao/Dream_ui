<template>
	<header class="DHeader" :class="className">
		<slot></slot>
	</header>
</template>

<script>
	export default {
		name: 'DHeader',

		props: {
			className: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	@Header-bg: #2b3642;

	.DHeader{
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 50px;
		padding-left: 15px;
		background-color: @Header-bg;
		z-index: 999;
	}
</style>