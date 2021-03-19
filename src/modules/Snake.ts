class Snake {
    // 表示蛇头的元素
    head: HTMLElement
    // 蛇的身体(包括蛇头)
    bodies: HTMLCollection
    // 获取蛇的容器
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div')!
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div')
    }

    // 获取蛇的坐标(蛇头坐标)
    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }

    set X(value: number) {
        // 如果新值和旧值相同，则直接返回，不需要再修改
        if (this.X === value) {
            return
        }

        // X 的值合法范围 0-290 之间
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了！')
        }

        if (this.bodies[1] &&  (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('水平方向掉头')
            // 如果发生了掉头，让蛇向反方向继续移动
            if (value > this.X) {
                // 如果 新值 value 大于 旧值 X，则说明蛇在向右走，此时发生掉头，继续向左走
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }

        // 移动身体
        this.moveBody()

        

        this.head.style.left = value + 'px'

        this.checkHeadBody()
    }

    set Y(value: number) {
        if (this.Y === value) {
            return
        }

        // Y 的值合法范围 0-290 之间
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了！')
        }

        if (this.bodies[1] &&  (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果发生了掉头，让蛇向反方向继续移动
            if (value > this.Y) {
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }

        // 移动身体
        this.moveBody()

        this.head.style.top = value + 'px'

        this.checkHeadBody()
    }

    // 蛇增加身体的方法
    addBody() {
        // 向 element 中添加一个 div
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    // 添加一个蛇身体移动的方法
    moveBody() {
        /**
         * 将后边的身体设置为前边身体的位置
         *      第四节 = 第三节的位置
         */

        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 将值设置到当前身体
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    checkHeadBody() {
        // 获取所有的身体，检查是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('撞倒了自己~~')
            }
        }
    }
}

export default Snake