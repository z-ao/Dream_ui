# 栅格

## 使用
引入目录的index.js文件   
使用VUE.use(grid);   
在项目使用**<d-row></d-row>**和**<d-col></d-col>**即可

## 参数

### row
|属性名        |      含义              | 类型           | 默认值          | 选项              |
| ----------- |:--------------------- |:-------------:|:---------------:|:------------------|
|tag         | 标签名          | String        | div          |  | 
|justify       | 水平对齐      | String        |  start   | ['start', 'center', 'end', 'space-between', 'space-around']    |
|gutter | 间隔            | Number|                 |              |

### col
|属性名  |      含义              | 类型           | 默认值          | 选项              |
| ----- |:--------------------- |:-------------:|:---------------:|:------------------|
|tag    | 标签名        | String        | div             |         |  
|span   | 格子宽度      | Number        |                  | 1-24    |
|offset | 向左间隔      | Number|       |     1-24         |         |
|push   | 向右移动      | Number|       |     1-24         |         |
|pull   | 向左移动      | Number|       |     1-24         |         |
|xs     |**<768px**响应式栅格，可为栅格数或一个包含其他属性的对象| Number\\{span, push...}|           |
|sm     |**>=768px**响应式栅格，可为栅格数或一个包含其他属性的对象| Number\\{span, push...}|           |
|md     |**>=992px**响应式栅格，可为栅格数或一个包含其他属性的对象| Number\\{span, push...}|           |
|lg     |**>=1200px**响应式栅格，可为栅格数或一个包含其他属性的对象| Number\\{span, push...}|           |
|xl     |**>=1920px**响应式栅格，可为栅格数或一个包含其他属性的对象| Number\\{span, push...}|           |

## 制作思路
组件的主要实现栅栏布局,有开发者通过数据给容器添加相应的class,   
并由样式实现容器的定位和不同宽度的相应.   
因为组件的节点结构简单,所以使用的render函数.   
把栅栏组件拆分为**row**和**col**.   
row控制一行栅格的布局.   
col控制栅格的定位.

### row与col的共性
**实现自定义标签名**   
通过给tag属性一个默认值,    
调用**render**函数第一个参数传入tag值,

```
props: {
	tag: {
		type: String,
		default: 'div'
	}
	...
	...
},
...
...
render(h) {

	return h(this.tag, {
		class: this.rowClass,
		style: this.rowStyle
	}, this.$slots.default)
}
```
**计算属性**   
因为组件的主要功能是通过样式实现的,    
所以定义两个计算属性,通过传入不同的**prop**,计算正确的**class**和**style**.

### 栅栏间隔
栅栏的间隔是通过**row**组件的**gutter**的属性实现的,   
但同时需要**col**组件配合.   

通过在设置**col**的内边距,控制栅格之间的间隔   
设置**row**两端的外边距为**负值**,   
扩大两端的宽度,从而抵消最左右边col多余的内边距.    

**row**   

```
computed: {
	...
	...
	rowStyle() {

		return{
			marginLeft: '-' + this.gutter + 'px',
			marginRight: '-' + this.gutter + 'px',
		}
	}
},
```

**col**

```
computed: {
	...
	...
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
}
```

### 栅格的宽度和定位
宽度和定位是通过添加class名控制的.    
class名的格式为[固定前缀]__[类型]-[值].     

根据**prop**设置class名,   
通过reduce实现map和filter功能.

```
const PROP_CLASS = ['span', 'push', 'pull', 'offset'].reduce((res, prop) => {
	if (this[prop]) {
		res.push(`d-col__${prop}-${this[prop]}`)
	}
	return res
}, [])
```

样式生成,**less**为例   
通过less的循环方法和运算,生成24组对应比例的值.    
通过传入不同参数,生成24组不同样式属性和class名的对应比例的值.

```
@ALL_COL: 24; //一共24拦

.col-loop (@prefix, @property) when (@i <= @ALL_COL) {
	@val: @i / @ALL_COL * 100;
    .d-col__@{prefix}-@{i} {
        @{property}: ~"@{val}%";
    }
    .col-loop(@prefix, @property, @i + 1);
}
.col-loop(@prefix: span, @property: width);
.col-loop(@prefix: push, @property: left);
.col-loop(@prefix: pull, @property: right);
.col-loop(@prefix: offset, @property: margin-left);
```

### 栅格的响应式
class名的格式为[固定前缀]__[响应类型]--[类型]-[值],设置class名和宽度和定位的class方式相同.   
因为**prop**可以传入Number或Object类型,所以需要判断.

```
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
```

样式生成

```
@media only screen and (max-width: 768px) {
	.col-loop(@prefix: xs--span, @property: width);
	.col-loop(@prefix: xs--push, @property: left);
	.col-loop(@prefix: xs--pull, @property: right);
	.col-loop(@prefix: xs--offset, @property: margin-left);
}

@media only screen and (min-width: 768px) {
	.col-loop(@prefix: sm--span, @property: width);
	.col-loop(@prefix: sm--push, @property: left);
	...
	...
}

...
...
```
