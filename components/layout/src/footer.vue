<template>
	<footer class="DFooter" :class="className">
		<slot></slot>
	</footer>
</template>

<script>
	export default {
		name: 'DFooter',

		props: {
			className: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	.DFooter{
		position: relative;
		height: 30px;
	}
</style>