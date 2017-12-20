<template>
	<DContainer>
		<DHeader></DHeader>
		<DContainer :direction="'row'">
			<DAside></DAside>
			<DMain></DMain>
		</DContainer>
		<DFooter></DFooter>
	</DContainer>
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

<style type="text/less" lang="less">
	*{
		margin: 0;
		padding: 0;
	}
	.container{
		position: relative;
	}
</style>