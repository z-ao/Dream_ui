<template>
	<div class="DMain" :class="className">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'DMain',

		props: {
			className: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	@main-bg: #fff;
	.DMain{
		position: relative;
		display: flex;
		flex: 1;
		justify-content: space-between;
		text-align: left;
		background-color: @main-bg;
	}
</style>