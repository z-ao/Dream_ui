<template>
	<i class="fa" :class="'fa-' + IconName"></i>
</template>

<script>
/*	awesome address : http://fontawesome.io/icons
**	@params 	IconName	{string}	图标名称
*/
	export default{
		name: 'DIcon',
		props: {
			IconName: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style type="text/less" lang="less" scoped>
	@import '../fonts/font-awesome.css';
</style>