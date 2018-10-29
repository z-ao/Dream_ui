<template>
    <div class="d-waterfall"
        ref="waterFall"
        :style="{margin: `0 -${gapX / 2}px`}">
        <div class="d-waterfall__content"
             :style="{ height: containerHeight + 'px' }">
            <div class="d-waterfall__item"
                v-for="(item, index) in waterFallPage"
                :style="[item._style, cellPadding]"
                :key="index">
                <slot :content="item" :index="index"></slot>
            </div>
        </div>

        <div class="d-waterfall__footer" :style="{padding:  `0 ${gapX / 2}px`}">
            <div class="d-waterfall__footer--loading" v-show="isLoad">
                <div class="spinner">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
            </div>

            <div class="d-waterfall__footer--no-more" v-show="isEnd">
                加载完毕~
            </div>
        </div>
    </div>
</template>

<script>
    import { throttle, on, off } from './utils/dom';
    import clone  from './utils/clone';
    import cellsClass from './cellsClass';

    // 如果不需要响应式的变量放出来
    const windowH  = window.innerHeight;
    let cellColTops = [], // 各列高度的数组

        orginTop = 0,      // 父容器距离顶部的高度
        ViewPort = [0, 0], // 视图顶部和底部最具页面顶点的距离

        transitionTimer = null,

        handleResize = null,
        handleScroll = null;

    export default {
        name: 'DWaterFall',
        props: {
            root: {
                default() {
                    return window;
                }
            },
            waterFall: {
                type: Array,
                required: true,
                validator: val => {
                    return val.every(item => item.height && !isNaN(item.height));
                }
            },
            width: {
                type: Number,
                default: 200,
                validator: val => val >= 0
            },
            col: {
                type: Number,
                validator: val => val >= 0
            },
            gap: {
                type: Array,
                default: [0, 0],
                validator: val => val.every(i => typeof i === 'number')
            },
        },

        data() {
            return{
                waterFallPage: [],

                containerHeight: 0,

                gapX: this.gap[0],
                gapY: this.gap[1],

                isLoad: false,
                isEnd: false,
                AutoSize: false,
            };
        },
        beforeCreate() {
            this.$_cellsInstance = new cellsClass();
        },
        mounted() {
            orginTop = this.$refs['waterFall'].offsetTop;
            this.bind();
            this.initWaterFall();
        },
        beforeDestory() {
            off(this.root, 'resize', handleResize, true);
            off(this.root, 'scroll', handleScroll, true);
        },
        methods: {
            bind() {
                handleResize = throttle(this.updateLayout, 200);
                handleScroll = throttle(this.updateViewPort, 200);

                on(this.root, 'resize', handleResize, true);
                on(this.root, 'scroll', handleScroll, true);
            },

            // 初始化瀑布流容器
            initWaterFall() {
                this.$_cellsInstance.initCells();

                cellColTops = new Array(this.CalculateColCount()).fill(0);

                const newCells = clone([], this.waterFall, true);
                this.pushWaterFallCells(newCells);

                this.updateViewPort();
            },

            pushWaterFallCells(newCells) {
                newCells.forEach((...args) => this.setCellStyle(...args));

                newCells.forEach(cell => {
                    this.$_cellsInstance.pushCell(cell, cell.pos[0], cell.pos[1]);
                });
            },

            // 设置单元样式
            setCellStyle(cell, index, orgin) {
                const cellWidth = this.CalculateWidth();
                const cellTop = Math.min.apply(null, cellColTops);

                const minIndex = cellColTops.indexOf(cellTop);
                const cellLeft = minIndex * cellWidth;

                cell._style = {
                    top: cellTop + 'px',
                    left: cellLeft + 'px',
                    width: cellWidth + 'px',
                    height: cell.height + 'px'
                };

                cell.pos = [cellTop + orginTop, cellTop + orginTop + cell.height];

                orgin[index] = cell;

                // 替换对应列的高度
                cellColTops[minIndex] = cellColTops[minIndex] + cell.height + this.gapY;
            },

            // 获取容器列数
            CalculateColCount() {
                if (!this.$el) return;

                return this.col ?
                    this.col :
                    Math.floor(this.$el.offsetWidth / (this.width + this.gapX));
            },

            // 设置容器单元共用的宽度
            CalculateWidth() {
                if (!this.$el) return;

                return this.col ?
                    Math.floor(this.$el.offsetWidth / this.col):
                    this.width + this.gapX;
            },

            // 更新视图
            updateViewPort() {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                ViewPort = [scrollTop, scrollTop + windowH];

                this.waterFallPage = this.$_cellsInstance.fetchViewPortCell(ViewPort[0], ViewPort[1]);
                this.containerHeight = Math.max.apply(null, cellColTops);
            },

            // 设置单元动画
            addCellTransition() {
                if (!this.$el) return;
                this.$el.classList.add('d-waterfall--transition');
            },

            // 移除单元动画
            removeCellTransition() {
                if (!this.$el) return;
                const transitionTime = parseFloat(window.getComputedStyle(document.querySelector('.d-waterfall__item')).transitionDuration) * 1000;

                clearTimeout(transitionTimer);
                transitionTimer = setTimeout(() => {
                    this.$el.classList.remove('d-waterfall--transition');
                }, transitionTime);
            },

            // 重新布局
            updateLayout() {
                this.AutoSize = true;
            }
        },
        computed: {
            cellPadding() {
                return { padding: `0 ${ this.gapX / 2 }px`};
            }
        },
        watch: {
            waterFall(newData) {
                const completeCount = this.$_cellsInstance.fetchCellSum();

                const newCells = clone([], newData.slice(completeCount));
                this.pushWaterFallCells(newCells);

                this.updateViewPort();
            },
            AutoSize(val) {
                if (val === false) return;

                this.$_cellsInstance.initCells();
                cellColTops = new Array(this.CalculateColCount()).fill(0);

                const newCells = clone([], this.waterFall, true);
                this.pushWaterFallCells(newCells);

                this.addCellTransition();
                this.updateViewPort();
                this.removeCellTransition();

                this.AutoSize = false;
            }
        }
    };
</script>

<style lang="scss">
    .d-waterfall{
        font-size: 0;

        &__content{
            position: relative;
        }

        &__item{
            position: absolute;
        }

        &__footer{
            position: relative;

            &--no-more{
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                color: #f4f4f4;
            }
        }
    }

    .d-waterfall--transition {
        position: relative;

        .d-waterfall__item{
            transition: all .5s;
        }
    }

    .spinner  {
        margin: 0 auto;
        width: 50px;
        height: 60px;
        text-align: center;
        font-size: 10px;

        >div {
            background-color: #67CF22;
            height: 100%;
            width: 6px;
            display: inline-block;
            animation: stretchdelay 1.2s infinite ease-in-out;
        }
        .rect2 {
            animation-delay: -1.1s;
        }

        .rect3 {
            animation-delay: -1.0s;
        }

        .rect4 {
            animation-delay: -0.9s;
        }
        .rect5 {
            animation-delay: -0.8s;
        }
    }

    @keyframes stretchdelay {
        0%, 40%, 100% {
            transform: scaleY(0.4);
        }  20% {
            transform: scaleY(1.0);
        }
    }
</style>
