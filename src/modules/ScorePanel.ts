// 定义表示记分牌
class ScorePanel {
    score = 0
    level = 0

    // 分数和等级所在的元素，在构造函数中初始化
    scoreEle: HTMLElement
    levelEle: HTMLElement

    // 设置一格变量限制等级
    maxLevel: number
    // 设置一个变量表示多少分时升级
    upScore: number

    constructor(maxLevel: number = 10, upScore: number = 2) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    // 设置一个加分的方法
    addScore() {
        this.score++
        this.scoreEle.innerHTML = this.score + ''
        // 判断分数是多少
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    // 提升等级的方法
    levelUp() {
        if (this.level < this.maxLevel) {
            this.level++
            this.levelEle.innerHTML = this.level + ''
        }
    }
}

export default ScorePanel