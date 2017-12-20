<template>
	<div class="DAside" :class="className">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'DAside',

		props: {
			className: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	@aside-bg: #36414f;

	.DAside{
		position: relative;
		width: 235px;
		flex: 0 0 235px;
		background-color: @aside-bg;
	}
</style>