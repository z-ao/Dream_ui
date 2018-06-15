<template>
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
                <td class="c-datepicker__td" v-for="date in rows">
                    <a href="javascript:;"
                       class="c-datepicker__text"
                       :class="isChooseDate(chooseDate, new Date(viewYear, viewMonth, date)) ? 'c-datepicker__text--active' : '' "
                       v-if="date"
                       @click="clickDateEvent(date)">{{date}}</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    //判断是否同一天
    const isEqualDate = function(dateA, dateB) {
        if (!dateA instanceof Date || !dateB instanceof Date) return false;

        const dateAYear = dateA.getFullYear();
        const dateAMonth = dateA.getMonth();
        const dateADate = dateA.getDate();

        const dateBYear = dateB.getFullYear();
        const dateBMonth = dateB.getMonth();
        const dateBDate = dateB.getDate();

        if (dateAYear === dateBYear && dateAMonth === dateBMonth && dateADate === dateBDate) {
            return true;
        } else {
            return false;
        }
    }
    export default{
        props: {
            dateArr: {
                type: Array,
                required: true
            },
            viewYear: {
                type: Number,
                required: true
            },
            viewMonth: {
                type: Number,
                required: true
            },
            chooseDate: {
                type: [Date, String],
                required: true
            }
        },

        methods: {
            //是否选中日期
            isChooseDate(chooseDate, viewDate) {
                return isEqualDate(chooseDate, viewDate);
            },
            clickDateEvent(date) {
                const chooseDate = new Date(this.viewYear, this.viewMonth, date);
                this.$emit('choose-date', chooseDate);
            }
        }
    }
</script>

<style lang="scss">
    .c-datepicker__body{
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

                    .c-datepicker__text--disable{
                        color: rgba(0,0,0,.25);
                    }

                    .c-datepicker__text--active{
                        background-color: #1890ff;
                        color: #fff;

                        &:hover{
                            background-color: #1890ff;
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
