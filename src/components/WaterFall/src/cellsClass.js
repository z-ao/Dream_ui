// 瀑布流单元类
class Cells {
    constructor(cellBucketLen = 100) {
        this.cellBucketLen = cellBucketLen;
        this.initCells();
    }

    initCells() {
        this.cells = [];

        this._addCellsItem();
    }

    _addCellsItem() {
        const newCell = {
            bucket: [],
            bottom: 0,
            top: 0
        };

        this.cells.push(newCell);
    }

    // 新增单元
    pushCell(cell, cellTop = 0, cellBottom = 0) {
        cell._pos = {
            top: cellTop,
            bottom: cellBottom
        };

        let lastItem = this.cells.slice(-1)[0];
        if (lastItem.bucket.length >= this.cellBucketLen) {
            this._addCellsItem();
            lastItem = this.cells.slice(-1)[0];
        }

        lastItem.bucket.push(cell);
        lastItem.top = lastItem.top > cellTop ? cellTop : lastItem.top;
        lastItem.bottom = lastItem.bottom < cellBottom ? cellBottom : lastItem.bottom;
    }

    fetchCellSum() {
        let count = 0;
        this.cells.forEach(item => {
            count += item.bucket.length;
        });

        return count;
    }

    fetchAllCell() {
        return this.cells.reduce((res, item) => {
            item.bucket.forEach(cell => {
                res.push(cell);
            });

            return res;
        }, []);
    }

    // 获取显示在页面的单元
    fetchViewPortCell(viewTop = 0, viewBottom = 0) {
        const currentCellItems = this.cells.filter(item => {
            return this._isOverlay(viewTop, viewBottom, item.top, item.bottom);
        });

        return currentCellItems.reduce((res, item) => {
            item.bucket.forEach(cell => {
                if (this._isOverlay(viewTop, viewBottom, cell._pos.top, cell._pos.bottom)) {
                    res.push(cell);
                }
            });

            return res;
        }, []);
    }

    // 是否有重叠的地方
    _isOverlay(viewTop, viewBottom, targetTop, targetBottom) {
        if ((targetTop >= viewTop && targetBottom <= viewBottom) ||
            (targetTop <= viewBottom && targetBottom >= viewBottom) ||
            (targetBottom >= viewTop && targetTop <= viewTop)) {
            return true;
        }

        return false;
    }
}

export default Cells;
