<template>
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
</template>

<script>
    import { isEqualDate } from '@/utils/date'

    export default{
        props: {
            viewYear: {
                type: Number,
                required: true
            },
            viewMonth: {
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
            clickDateEvent(row) {
                if (row.isDisable) return;

                this.$emit('pick', new Date(this.viewYear, this.viewMonth, row.date));
            }
        },

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
    }
</script>

<style lang="less" scoped>
    .c-datepicker__body--date{
        padding: 8px 12px;

        .c-datepicker__table{
            border-collapse: collapse;
            width: 100%;
            background-color: transparent;
            border: none;
            text-align: center;

            .c-datepicker__thead{
                color: rgba(0,0,0,.65);

                td{
                    width: 33px;
                    line-height: 18px;
                    padding: 6px 0;
                    font-size: 14px;
                }
            }

            .c-datepicker__tbody{
                color: rgba(0,0,0,.65);

                .c-datepicker__td{
                    width: 36px;
                    height: 30px;
                    font-size: 14px;

                    .c-datepicker__text{
                        width: 24px;
                        display: inline-block;
                        height: 24px;
                        line-height: 24px;
                        margin: 0 auto;
                        transition: background .3s ease;

                        &:hover{
                            background-color: #e6f7ff;
                        }
                    }

                    .c-datepicker__text--active{
                        background-color: #1890ff;
                        color: #fff;

                        &:hover{
                            background-color: #1890ff;
                        }
                    }

                    .c-datepicker__text--disable{
                        width: 100%;
                        color: #bcbcbc;
                        cursor: not-allowed;
                        background-color: #f5f5f5;

                        &:hover{
                            background-color: #f5f5f5;
                        }
                    }
                }
            }

            tr{
                height: 30px;
            }
        }
    }
</style>
