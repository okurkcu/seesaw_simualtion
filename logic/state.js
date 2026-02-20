export class State {
    constructor() {
        this.weights = [];
    }

    addWeight(weightBall) {
        this.weights.push(weightBall);
    }

    getLeftTotal(pivotX) {
        return this.weights
            .filter(weightBall => weightBall.x < pivotX)
            .reduce((sum, weightBall) => sum + weightBall.weight, 0);
    }

    getRightTotal(pivotX) {
        return this.weights.filter(weightBall => weightBall.x >= pivotX).reduce((sum, weightBall) => sum + weightBall.weight, 0);
    }
}