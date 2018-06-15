<template>
	<div class="container">
		<DIcon :IconName="'times'"></DIcon>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				test: 'a'
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	.container{
		position: relative;
	}
</style>