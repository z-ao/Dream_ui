# 日期选择器

## 使用
引入目录的index.js文件   
使用VUE.use(datepicker);
在项目使用***<d-datepicker></d-datepicker>***即可

## 参数
|属性名        |      含义              | 类型           | 默认值          | 选项              |
| ----------- |:---------------------:|:-------------:|:---------------:|:------------------|
|type         | 日期选择器类型          | String        | 'date'          | ['date', 'month'] | 
|format       | 日期输入框显示的日期格式 | String        |  'yyyy-MM-dd'   | utils.date文件    |
|disabledDate | 日期是否禁止            | function(date)|                 |  可选            |
|footerBtn    | 底部按钮               | array[{value: 点击返回值, text: 文字}] |      | 可选 |

## 制作思路
该组件的主要作用是点击输入框选择对应的日期,   
可搭配定义日期格式、日期是否禁止选择、底部按钮使用.

### 组件v-model
组件因为可能有初始值和为保障开发体现,   
使用v-model实现双向绑定.

在vue组件中提供model属性
```
model: {
    prop: 'datepickerVal', //对应的props值
    event: 'dateChange' //改变该值对应的事件
},
props: {
	datepickerVal: { //model的配置
        required: true
    }
}
```
因为有些业务需要自定输入框的值,所有不做类型检测.

### 组件data

```
data() {
	const NowDate = new Date();
    return {
        viewYear: NowDate.getFullYear(), //显示的年份
        viewMonth: NowDate.getMonth(), //显示的月份
        viewDate: NowDate.getDate(), //显示的日
        viewChooseDate: NowDate, //选中的日期对象

        inputVal: '', //输入框的值
        isShowPanel: false //是否显示日期面板
    }
}
```
显示页面上的面板数据根据***^=view***开头的data属性控制    
在用户选中前或者初始化完,它相对独立于v-model的值.
> 面板的格子一般只有三种状态: 待选中, 选中, 禁止选择.
> 根据数据计算出来

### 初始化组件
在组件初始化时根据***v-model***和***format***设置输入框的值
```
created() {
    switch(true) {
        case this.datepickerVal instanceof Date: //如果是日期格式
            this.viewYear       = this.datepickerVal.getFullYear();
            this.viewMonth      = this.datepickerVal.getMonth();
            this.viewDate       = this.datepickerVal.getDate();
            this.viewChooseDate = this.datepickerVal;
            this.inputVal       = this._format(this.datepickerVal);
            break;
        case !!this.datepickerVal: //如果有值且是其他格式
            this.inputVal = this.datepickerVal;
            break;
        default:
            break;
    };
}
```

根据传入的***type***决定面板类型,并传入***^=view***的data值
```
<month-panel
    v-if="type === 'month'"
    :view-year="viewYear"
    :view-choose-date="viewChooseDate"
    :disabled-date="disabledDate"
    @pick="chooseDateEvent"></month-panel>

<date-panel
    v-if="type === 'date'"
    :view-year="viewYear"
    :view-month="viewMonth"
    :view-choose-date="viewChooseDate"
    :disabled-date="disabledDate"
    @pick="chooseDateEvent"></date-panel>
```

### 日期面板
根据dateArr的值来渲染具体的月份,   
因为具体月份数据要用props的***viewYear***和***viewMonth***计算出来,   
所以使用计算属性.
```
<div class="c-datepicker__body--date">
    <table class="c-datepicker__table">
        <thead class="c-datepicker__thead">
            <tr>
                <td>日</td>
                <td>一</td>
                <td>二</td>
                <td>三</td>
                <td>四</td>
                <td>五</td>
                <td>六</td>
            </tr>
        </thead>
        <tbody class="c-datepicker__tbody">
            <tr v-for="(rows, index) in dateArr" :key="index">
                <td class="c-datepicker__td" v-for="(row, rowIndex) in rows" :key="(index + 1) * rowIndex">
                    <a href="javascript:;"
                       v-if="row.date"
                       class="c-datepicker__text"
                       :class="[
                            row.isCurrent ? 'c-datepicker__text--active' : '',
                            row.isDisable ? 'c-datepicker__text--disable' : ''
                        ]"
                       @click="clickDateEvent(row)">{{row.date}}</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

#### 计算步骤dateArr
1. 获取当前月开始第一天的星期,从而得知第一行有多少个位置是上个月的(如果当月第一天是星期一,说明前面的星期天是上个月的,所以空一格)
2. 获取当月的最后一天的日期,从而知道那些位置是下个月的(如果当前最后一天的31日,第一行空一格,说明32格以后的是下个月的)
3. 因为有的月显示的4行有的显示6行,所以去最大值,显示6行7列
4. 并且循环6 * 7次,和根据是否禁止日期选择和选中日期高亮功能来计算出当月的数据,返回数组
```
computed: {
    dateArr() { //当前日期的面版数据
        let ret = [];

        const dateActiveFirst = new Date(this.viewYear, this.viewMonth, 1); //当前月的第一天
        const dateActiveLast = new Date(this.viewYear, this.viewMonth + 1, 0); //当前月的最后一天
        const EmtryCountOnRowFisrt = dateActiveFirst.getDay(); //第一行有多少个空格

        const col = 7, row = 6;//7列6行
        let retIndex = -1; //三维数组
        for (let i = 0; i < col * row; i++) {
            let date = '', isDisable, isCurrent;

            const isPrevMonth = i < EmtryCountOnRowFisrt;
            const isNextMonth = i >= dateActiveLast.getDate() + EmtryCountOnRowFisrt;

            if (!isPrevMonth && !isNextMonth) { //当月
                date = i - EmtryCountOnRowFisrt + 1;

                isDisable = this.disabledDate ?
                            this.disabledDate(new Date(this.viewYear, this.viewMonth, date)) :
                            false;

                isCurrent = isEqualDate(this.viewChooseDate, new Date(this.viewYear, this.viewMonth, date), 'date');
            }

            if (i % 7 === 0) {
                retIndex++;
                ret[retIndex] = [];
            }
            ret[retIndex].push({date, isDisable, isCurrent});
        }
        return ret;
    }
}
```

***背景知识***   
获取2017年1月第一天 new Date(2017, 0, 1);   
获取2017年1月最后一天 new Date(2017, 1, 0);如果日的传的是0,会返回上个月的日期对象

### 月份面板
月份面板显示的数据是固定的,只是格子的状态可能会不一样   
根据配置数组和props的***^=view***数据计算格子的状态   
并渲染数据
```
const MONTH_CONFIG = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
computed: {
    monthArr() {
        return MONTH_CONFIG.map((month, index) => {
            const text = month;
            const isCurrent = isEqualDate(this.viewChooseDate, new Date(this.viewYear, index, 1), 'month');
            const isDisable = this.disabledDate ? this.disabledDate(new Date(this.viewYear, index, 1)) : false;

            return {text, isCurrent, isDisable}
        })
    }
}

//dom
<div class="c-datepicker__body--month">
    <div class="c-datepicker__table">
        <div class="c-datepicker__cell" v-for="(month, index) in monthArr" :key="index">
            <a href="javascript:;"
                class="c-datepicker__text"
                :class="[
                    month.isDisable ? 'c-datepicker__text--disable' : '',
                    month.isCurrent ? 'c-datepicker__text--active' : '',
                    (!month.isDisable && !month.isCurrent) ? 'c-datepicker__text--normal' : ''
                ]"
                @click="clickMonthEvent(index, month.isDisable)">
                {{month.text}}
            </a>
        </div>
    </div>
</div>
```

### 选择日期
当格子被点击是统一触发pick事件,参数是选中的Date日期

```
//月份面板
clickMonthEvent(month, disable) {
    if (disable) return;

    this.$emit('pick', new Date(this.viewYear, month, 1));
}
```

在顶层组件监听***pick***事件,触发chooseDateEvent函数.
```
 <month-panel
    ...
    ...
    @pick="chooseDateEvent"></month-panel>

<date-panel
    ...
    ...
    @pick="chooseDateEvent"></date-panel>

//选择日期事件
chooseDateEvent(date) {
    if (!date instanceof Date) return;

    const dateStr = this._format(date);
    this.$emit('dateChange', dateStr);

    this.inputVal = dateStr;
    this.viewChooseDate = date;
    this.isShowPanel = false;
}
```
1. 根据定义format的值格式化日期数据,并更改***v-model***和输入框的值
2. 更改选择日期
3. 隐藏选择器

### 杂要
#### 月份切换
在切换月份要在当前年的   
第一个月切换上个月   
和最后一个月切换下一个月做判断更改相应的年和月
```
//打开上一月
turnOnPrevMonth() {
    if (this.viewMonth === 0) { //跳转上一年
        this.viewYear--;
        this.viewMonth = 11;
    } else {
        this.viewMonth--
    }
},
//打开下一月
turnOnNextMonth() {
    if (this.viewMonth === 11) { //跳转下一年
        this.viewYear++;
        this.viewMonth = 0;
    } else {
        this.viewMonth++;
    }
}
```

#### 面板的定位
在面板打开时   
根据输入框距离窗口的位置定位面板   
避免面板被遮盖
```
showPanelEvent(evt) {
    this.isShowPanel = true;
    const $input = evt.target;

    this.$nextTick(() => { //等待视图渲染完成后设置定位
        this.setDatepickerPosition($input);
    })
},

setDatepickerPosition($input) {
    const inputHeight = $input.offsetHeight;

    const $datepicker =this.$refs['datepicker'];
    const datepickerFixedTop = $datepicker.offsetTop - window.scrollY; //输入框顶点到窗口的距离

    const $datepickerPanel = this.$refs['datepickerPanel'];
    const datepickerPanelHeight = $datepickerPanel.offsetHeight;

    const windowHeight = document.documentElement.clientHeight;

    if (inputHeight + datepickerFixedTop + datepickerPanelHeight + 2 > windowHeight) {
        $datepickerPanel.style.bottom = inputHeight + 2 + 'px';
    } else {
        $datepickerPanel.style.top = inputHeight + 2 + 'px';
    }
}
```
#### 点击外层是隐藏面板
当面板在显示状态是,点击面板以外的dom,隐藏面板
```
mounted() {
    on(document.body, 'click', this.outsideClick)
},
destroyed() {
    off(document.body, 'click', this.outsideClick)
},
methods: {
    outsideClick(evt) {
        let $target = evt.target;

        if (!this.$refs['datepicker'].contains($target)) {//点击外层事件
            this.isShowPanel = false;
        }
    },
}
//dom
<transition name="c-datepicker-transition">
    <div class="c-datepicker__container" v-show="isShowPanel" ref="datepickerPanel">
        ...
    </div>
</transition>
```