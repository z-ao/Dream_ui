<template>
    <div class="c-datepicker__wrapper" ref="datepicker">
        <input type="text"
               name="datepicker"
               class="c-datepicker__input"
               v-model="inputVal"
               @focus="showPanelEvent">
        <transition name="c-datepicker-transition">
            <div class="c-datepicker__container" v-show="isShowPanel" ref="datepickerPanel">
                <div class="c-datepicker__header">
                    <a href="javascript:;" class="c-datepicker__arrow c-datepicker__arrow--left" @click="viewYear--">
                        <svg viewBox="0 0 448 512" style="fill: currentColor;">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ArrrowLeftDouble"></use>
                        </svg>
                    </a>
                    <a href="javascript:;"
                       v-if="type === 'date'"
                       class="c-datepicker__arrow c-datepicker__arrow--left"
                       @click="turnOnPrevMonth">
                        <svg viewBox="0 0 256 512" style="fill: currentColor;">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ArrrowLeft"></use>
                        </svg>
                    </a>
                    <span class="c-datepicker__label">{{viewYear}}年</span>
                    <span class="c-datepicker__label" v-if="type === 'date'">{{viewMonth + 1}}月</span>
                    <a href="javascript:;" class="c-datepicker__arrow c-datepicker__arrow--right"  @click="viewYear++">
                        <svg viewBox="0 0 448 512" style="fill: currentColor;">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ArrrowRightDouble"></use>
                        </svg>
                    </a>
                    <a href="javascript:;"
                        v-if="type === 'date'"
                        class="c-datepicker__arrow c-datepicker__arrow--right"
                        @click="turnOnNextMonth">
                        <svg viewBox="0 0 256 512" style="fill: currentColor;">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ArrrowRight"></use>
                        </svg>
                    </a>
                </div>

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

                <div class="c-datepicker__footer" v-if="other">
                    <a href="javascript:;"
                       class="c-datepicker__btn"
                       v-for="(item, index) in other"
                       :key="index"
                       @click="otherClickEvent(item.value)"
                       v-text="item.text"></a>
                </div>
            </div>
        </transition>
        <!-- 选择器的icon -->
        <svg width="0" height="0">
            <def>
                <path id="ArrrowLeftDouble" d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"/>
                <path id="ArrrowLeft" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/>
                <path id="ArrrowRightDouble" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"/>
                <path id="ArrrowRight" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>
            </def>
        </svg>
    </div>
</template>

<script>
    import { pattern } from '@/utils/date'
    import { on, off } from '@/utils/dom'
    import datePanel from './panel/DatePanel'
    import monthPanel from './panel/monthPanel'
    export default{
        name: 'cDatePicker',

        model: {
            prop: 'datepickerVal',
            event: 'dateChange'
        },

        props: {
            datepickerVal: {
                type: [Date, String],
                required: true
            },
            type: {
                type: String,
                default: 'date'
            },
            format: {
                type: String,
                default: ''
            },
            disabledDate: {
                type: Function
            },
            other: {
                type: Array,
                default: false
            }
        },

        data() {
            return {
                viewYear: 1990,
                viewMonth: 0,
                viewDate: 1,
                viewChooseDate: '',

                inputVal: '',
                isShowPanel: false
            }
        },
        created() {
            if (!this.datepickerVal) {
                const NowDate = new Date();
                this.viewYear = NowDate.getFullYear();
                this.viewMonth = NowDate.getMonth();
                this.viewDate = NowDate.getDate();
                this.viewChooseDate = NowDate
            }
        },
        mounted() {
            on(document.body, 'click', this.outsideClick)
        },
        destroyed() {
            off(document.body, 'click', this.outsideClick)
        },
        methods: {
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
            },
            otherClickEvent(val) {
                this.inputVal = val;
                this.$emit('dateChange', val);
                this.isShowPanel = false;
            },
            //选择日期事件
            chooseDateEvent(date) {
                if (!date instanceof Date) return;

                const dateStr = this._format(date);
                this.$emit('dateChange', dateStr);

                this.inputVal = dateStr;
                this.viewChooseDate = date;
                this.isShowPanel = false;
            },
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
            },
            //外层点击事件
            outsideClick(evt) {
                let $target = evt.target;

                if (!this.$refs['datepicker'].contains($target)) {//点击外层事件
                    this.isShowPanel = false;
                }
            },
            //根据开发者传入的format或type输出对应的格式
            _format(date) {
                if (this.format) {
                    return pattern(date, this.format);
                }

                let format;
                switch(this.type) {
                    case 'date':
                        format = 'yyyy-MM-dd';
                        break;
                    case 'month':
                        format = 'yyyy-MM';
                        break;
                    default:
                        format = 'yyyy-MM-dd';
                }
                return pattern(date, format);
            }
        },
        components: {
            'date-panel': datePanel,
            'month-panel': monthPanel
        }
    }
</script>

<style lang="less">
    .c-datepicker__wrapper{
        position: relative;

        .c-datepicker__input{
            height: 40px;
            width: 100%;
            line-height: 40px;
            padding: 0 15px;
            font-size: 14px;
            background-color: #fff;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);

            &:focus{
                border-color: #409EFF;
            }
        }

        .c-datepicker__container{
            position: absolute;
            left: 0;
            width: 280px;
            text-align: left;
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,.15);
            transition: opacity .2s;
            z-index: 99;

            .c-datepicker__header{
                height: 41px;
                line-height: 40px;
                text-align: center;
                padding: 0 7px;
                border-bottom: 1px solid #e8e8e8;

                .c-datepicker__arrow{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    padding: 0 5px ;
                    font-size: 14px;
                    color: rgba(0,0,0,.45);
                    box-sizing: border-box;

                    svg{
                        height: 15px;
                    }

                    &:hover{
                        color: #1890ff;
                    }
                }

                .c-datepicker__arrow--left{
                    float: left;
                }

                .c-datepicker__arrow--right{
                    float: right;
                }

                .c-datepicker__label{
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 2px;
                    color: rgba(0,0,0,.85);
                    font-size: 14px;
                    font-weight: 600;
                }
            }

            .c-datepicker__footer{
                height: 39px;
                line-height: 38px;
                padding: 0 12px;
                border-top: 1px solid #e8e8e8;
                clear: both;

                .c-datepicker__btn{
                    float: right;
                    margin-left: 8px;
                    color: #1890ff;
                }
            }
        }
    }

    .c-datepicker-transition-enter, .c-datepicker-transition-leave-to{
        opacity : 0;
    }
</style>
