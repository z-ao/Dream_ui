export default {
	name: 'DCol',
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		span: [Number],
		offset: [Number], //向左间隔
		push: [Number], //向右移动 
		pull: [Number], //向左移动

		xs: [Number, Object],
		sm: [Number, Object],
		md: [Number, Object],
		lg: [Number, Object],
		xl: [Number, Object],
	},

	computed: {
		colStyle() {
			//计算gutter
			let parent = this.$parent
			while(parent && parent.$options._componentTag !== 'DRow') {
				parent = parent.$parent
			}
		 	const gutter = parent ? parent.gutter : 0

		 	return {
		 		paddingLeft: gutter + 'px',
				paddingRight: gutter + 'px'
		 	}
		},
		colClass() {
			const DEFAULT_CLASS = ['d-col']

			const PROP_CLASS = ['span', 'push', 'pull', 'offset'].reduce((res, prop) => {
				if (this[prop]) {
					res.push(`d-col__${prop}-${this[prop]}`)
				}
				return res
			}, [])

			const MEDIA_CLASS = ['xs', 'sm', 'md', 'lg', 'xl'].reduce((res, prop) => {
				if (typeof this[prop] === 'number') {
					res.push(`d-col__${prop}--span-${this[prop]}`)
				}

				if (typeof this[prop] === 'object') {
					for (let [key, val] of Object.entries(this[prop])) {
						res.push(`d-col__${prop}--${key}-${val}`)
					}
				}
				return res
			}, [])

			return DEFAULT_CLASS.concat(PROP_CLASS, MEDIA_CLASS)
		}
	},
	render(h) {

		return h(this.tag, {
			style: this.colStyle,
			class: this.colClass
		}, this.$slots.default)
	}
}