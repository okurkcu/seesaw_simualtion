import { Constants } from "./constants.js";

export class State {
    constructor() {
        this.weights = [];
    }

    addWeight(weightBall) {
        this.weights.push(weightBall);
    }

    reset() {
        this.weights = [];
        localStorage.removeItem(Constants.CACHE_KEY);
    }

    getLeftTotal(pivotX) {
        return this.weights
            .filter(weightBall => weightBall.x < pivotX)
            .reduce((sum, weightBall) => sum + weightBall.weight, 0);
    }

    getRightTotal(pivotX) {
        return this.weights.filter(weightBall => weightBall.x >= pivotX).reduce((sum, weightBall) => sum + weightBall.weight, 0);
    }

    saveToStorage() {
        localStorage.setItem(Constants.CACHE_KEY, JSON.stringify(this.weights));
        console.log("Saved: ", this.weights);
    }

    loadFromStorage() {
        const data = localStorage.getItem(Constants.CACHE_KEY);

        if(!data){
            return [];
        }

        return JSON.parse(data);
    }
}