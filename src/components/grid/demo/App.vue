<template>
	<div class="container">
		<DRow justify="space-between" :gutter="10">
			<DCol :span="12" :offset="1" :xs="{span: 10, offset: 0}">asdfsad</DCol>
			<DCol :push="1">saf</DCol>
		</DRow>
		<DRow>b</DRow>
		<DRow>c</DRow>
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