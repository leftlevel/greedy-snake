import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

class GameControl {
    // 定义三个属性
    snake: Snake
    food: Food
    scorePanel: ScorePanel

    direction: string = ''
    // 创建一个属性用来记录游戏是否结束
    isLive: boolean = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()

        this.init()
    }

    init() {
        // 绑定键盘按下的事件
        document.addEventListener('keydown', this.keydownHandler)
        this.run()
    }

    // 创建一个键盘按下的响应函数
    keydownHandler = (event: KeyboardEvent) => {
        // 检查 event.key 的值是否合法

        // 修改 direction 属性
        this.direction = event.key
    }
    /**
     * ArrowUp
     * ArrowLeft
     * ArrowRight
     * ArrowDown
     */

    run() {
        /**
         * 根据方向 (this.direction) 来使蛇的位置改变
         *      向上 top 减少
         *      向下 top 增加
         *      向左 left 减少
         *      向右 left 增加
         */

        // 获取蛇现在坐标
        let X = this.snake.X
        let Y = this.snake.Y

        switch (this.direction) {
            case 'ArrowUp':
                Y -= 10
                break;
            case 'ArrowDown':
                Y += 10
                break;
            case 'ArrowLeft':
                X -= 10
                break;
            case 'ArrowRight':
                X += 10
                break;
        }

        // 用来检查蛇是否迟到食物
        this.chackEat(X, Y)

        try {
            // 修改蛇的 X 和 Y值
            this.snake.X = X
            this.snake.Y = Y
        } catch (error) {
            alert(error.message)
            this.isLive = false
        }

        this.isLive && setTimeout(() => {
            this.run()
        }, 300 - (this.scorePanel.level - 1) * 10);
    }

    // 检查蛇是否吃到食物
    chackEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物位置改变
            this.food.change()
            // 分数增加
            this.scorePanel.addScore()
            // 身体增加
            this.snake.addBody()
        }
    }
}

export default GameControl