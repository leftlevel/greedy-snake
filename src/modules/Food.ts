// 定义食物类
class Food {
    element: HTMLElement

    constructor() {
        // 获取页面中的 food 元素并将其值赋给 element
        this.element = document.getElementById('food')!
    }

    // 定义一个获取食物 x 轴坐标轴的方法
    get X() {
        return this.element.offsetLeft
    }

    // 定义一个获取食物 Y 轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }

    // 修改食物位置
    change() {
        // 生成一个随机的位置
        // 食物位置最小是0，最大是290
        // 蛇移动一次就是一格，一格的大小就是10，所以要求食物的坐标是整10

        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = top + 'px'
        this.element.style.top = left + 'px'
    }
}

export default Food