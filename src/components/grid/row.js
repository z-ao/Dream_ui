export default {
	name: 'DRow',

	props: {
		tag: {
			type: String,
			default: 'div'
		},
		justify: {
			type: String,
			default: 'start'
		},
		align: {
			type: String,
			default: 'top'
		},
		gutter: {
			type: Number,
			default: 0
		}
	},

	computed: {
		rowClass() {
			const DEFAULT_CLASS = ['d-row']

			const PROP_CLASS = ['justify', 'align'].reduce((res, prop) => {
				if (this[prop]) {
					res.push(`d-${prop}__${this[prop]}`)
				}

				return res
			}, [])
			return DEFAULT_CLASS.concat(PROP_CLASS);
		},
		rowStyle() {

			return{
				marginLeft: '-' + this.gutter + 'px',
				marginRight: '-' + this.gutter + 'px',
			}
		}
	},
	render(h) {

		return h(this.tag, {
			class: this.rowClass,
			style: this.rowStyle
		}, this.$slots.default)
	}
}