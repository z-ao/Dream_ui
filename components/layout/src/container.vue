<template>
	<div class="DContainer" :class="[className, isMian]" :style="[ThatStyle]">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'DContainer',

		data() {
			return {
				ThatStyle: {},
				isMian: ''
			}
		},
		props: {
			className: {
				type: String,
				default: ''
			},
			direction: {
				type: String,
				default: 'column'
			}
		},
		methods: {
			/* [IsHasNode]		判断子容器是否是相应的节点名
			**	@params 	dom 	 {object}	父容器
			**	@params 	nodeName {string}	节点名
			**	@return 	hasNode  {boolean}	如果有相应的节点就返回true,没有返回false
			*/
			IsHasNode(dom, nodeName) {
				let hasNode      = false;
				let _node        = nodeName.toUpperCase();
				let childElement = dom.children;

				for (let i = 0; i <= childElement.length - 1; i++) {
					if (childElement[i]['nodeName'] === _node) {
						hasNode = true;
					};
				}
				return hasNode;
			},

			/* [SetPadding]		如果兄弟容器是'header'或'footer'设置边距
			**	@return 	null
			*/
			SetPadding() {
				let parent = this.$el.parentElement;

				if (this.IsHasNode(parent, 'header')) {
					this.isMian = 'isMian';
					let node  = parent.querySelector('header');
					this.$set(this.ThatStyle, 'paddingTop', node.offsetHeight + 'px');
				}

				// if (this.IsHasNode(parent, 'footer')) {
				// 	let node  = parent.querySelector('footer');
				// 	this.$set(this.ThatStyle, 'paddingBottom', node.offsetHeight + 'px');
				// }
			}
		},
		created() {
			this.ThatStyle['flexDirection']  = this.direction;
		},
		mounted() {
			this.SetPadding();
		}
	}
</script>

<style type="text/less" lang="less" socped>
	@container-bg: #36414f;
	.DContainer{
		position: absolute;
		width: 100%;
		min-height: 100%;
		left: 0;
		top: 0;
		display: flex;
		flex-wrap: wrap;
		background-color: @container-bg;
	}

	.isMian{
		position: relative;
		flex: 1;
		z-index: 998;
	}
</style>