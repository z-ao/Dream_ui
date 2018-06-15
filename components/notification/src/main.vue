<template>
    <transition 
        name="d-notification-fade"
        :appear="true"
        :enterClass="sideClass"
        :leave-active-class="sideClass"
        @after-leave="notificationAfterLeave">
        <div
            class="d-notification"
            v-show="visible"
            :style="OffsetStyle"
            :data-notification="tag"
            @mouseenter="clearTimer"
            @mouseleave="startTimer"
            @click="clickEvent"
            >
            <DIcon 
                v-if="!!type" 
                class="d-notification__icon" 
                :class="'d-icon-' + type" 
                :IconName="typeStyle[type]"
            ></DIcon>
            <div class="d-notification__group">
                <div class="d-notification__closeBtn d-icon-close" @click.stop="visible = !visible">
                    <DIcon :IconName="'times'"></DIcon>
                </div>
                <h2 class="d-notification__title">{{ title }} </h2>
                <p class="d-notification__content">{{ content }} </p>
            </div>
        </div>
    </transition>
</template>

<script type="text/javascript">
/*
**  params title            提示框标题           {string}
**  params content          提示内容              {string}
**  params type             类型                {string}      [success, warning, info, error]
**  params duration         延时关闭时间         {number}      @default    4000
**  params AutoGone         自动消失             {string}      @default    true
**  params position         出现的位置           {string}      @default    'top-left'
**  params click            点击提示框事件       {function}
**  params gone             提示框消失回调事件    {function}
*/
export default {
    data() {
        return {
            visible: true,
            tag: null,
            title: '',
            content: '',
            type: '',
            duration: 4000,
            AutoGone: 'true',
            position: 'top-left',
            offset: {},
            typeStyle: {
                'success': 'check-circle',
                'warning': 'exclamation-circle',
                'info'   : 'info-circle',
                'error'  : 'times-circle'
            },
            timer: null,
            closeEvent: null,
            click: null,  //点击回调函数
            gone: null    //移除时回调的函数
        }
    },
    created() {      
        //因为notification是直接插入body里的
        //如果调路由的话,notification消失
        if (window) {window.addEventListener('hashchange', () => { this.visible = false })};
    },
    mounted() {
        //开场动画
        this.startTimer();
    },
    methods: {
        startTimer() {
            if (this.AutoGone === 'false') return false;

            this.timer = setTimeout(() => {
                this.visible = false;
            }, this.duration);
        },
        clearTimer() {
            clearTimeout(this.timer);
        },
        clickEvent: function () {
            this.click && this.click();
        },
        notificationAfterLeave(el) {
            this.$el.parentNode.removeChild(this.$el);  //移除当前dom
            this.gone && this.gone();                   //移除时回调的函数
            this.closeEvent(this.tag); 
        }
    },
    computed: {
        OffsetStyle() {
            let Style = {};
            Object.keys(this.offset).forEach((key) => {
                Style[key] = this.offset[key] + 'px';
            });
            return Style;
        },
        sideClass() {
            let horizontal = this.position.indexOf('right') >= 0? 'right': 'left';
            return 'd-notification-' + horizontal + '-side-show';
        }
    }
} 
</script>

<style type="text/less" lang="less" scope>
    .d-notification{
        display: flex;
        position: fixed;
        width: 330px;
        padding: 14px 26px 14px 13px;
        border-radius: 8px;
        box-sizing: border-box;
        border: 1px solid #ebeef5;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
        overflow: hidden;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;

        .d-notification__icon{
            margin-right: 10px;
            font-size: 29px;
            transform: translateY(-1px);
        }

        .d-icon-success{
            color: #67c23a;
        }

        .d-icon-warning{
            color: #e6a23c;
        }

        .d-icon-info{
            color: #909399;
        }

        .d-icon-error{
            color: #f56c6c;
        }

        .d-notification__group{
            margin-left: 0;

            .d-notification__title{
                margin: 0;
                font-weight: 600;
                font-size: 16px;
                color: #303133;
            }

            .d-notification__content{
                line-height: 21px;
                text-align: justify;
                margin: 6px 0 0;
                color: #606266;
                font-size: 14px;
            }

            .d-notification__closeBtn{
                position: absolute;
                top: 11px;
                right: 11px;
                cursor: pointer;
                color: #909399;
                font-size: 16px;
            }

        }

    }
    .d-notification-right-side-show{
        opacity: 0;
        transform: translateX(100%);
    }

    .d-notification-left-side-show{
        opacity: 0;
        transform: translateX(-100%);
    }

</style>