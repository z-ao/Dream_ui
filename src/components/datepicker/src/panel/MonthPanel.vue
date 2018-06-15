<template>
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
</template>

<script>
    import { isEqualDate } from '@/utils/date'

    const MONTH_CONFIG = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    export default {
        props: {
            viewYear: {
                type: Number,
                required: true
            },
            viewChooseDate: {
                type: [String, Date],
                required: true
            },
            disabledDate: {
                type: Function
            }
        },

        methods: {
            clickMonthEvent(month, disable) {
                if (disable) return;

                this.$emit('pick', new Date(this.viewYear, month, 1));
            }
        },

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
    }
</script>

<style lang="less" scoped>
    .c-datepicker__table{
        width: 100%;
        background-color: #fff;
        overflow: hidden;
            text-align: center;
        clear: both;
        font-size: 0;

        .c-datepicker__cell{
            float: left;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 62px;
            width: 92px;
            color: rgba(0,0,0,.65);
            font-size: 14px;

            .c-datepicker__text{
                display: inline-block;
                height: 24px;
                line-height: 24px;
                padding: 0 8px;
                border-radius: 2px;
                transition: background .3s ease;
                cursor: pointer;
            }

            .c-datepicker__text--normal:hover{
                background-color: #e6f7ff;
                color: #40a9ff;
            }

            .c-datepicker__text--active{
                background-color: #1890ff;
                color: #fff;
            }

            .c-datepicker__text--disable{
                color: #bcbcbc;
                background-color: #f5f5f5;
                cursor: not-allowed;
            }
        }
    }
</style>
