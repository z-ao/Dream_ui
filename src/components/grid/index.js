import Vue from 'vue'
import DRow from './row'
import DCol from './col'
import './row.less'
import './col.less'

let grad = {}
grad.install = function (vue) {
	vue.component(DRow.name, DRow)
	vue.component(DCol.name, DCol)
}

export default grad