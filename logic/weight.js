import { Selectors } from "./selectors.js";

export default class Weight {
    constructor(x, weight, color){
        this.x = x,
        this.weight = weight,
        this.color = color;
    }

    getSize() {
      // Base weight is 34kg. Every kg is adding 4 kg more.
      return 34 + (this.weight - 1) * 4;
    }

    // Creating loaded weight
    render() {
        const ball = document.createElement("div");

        ball.classList.add("dropped-ball");

        ball.style.position = "absolute";
        ball.style.left = `${this.x - 30}px`;
        ball.style.height = `${this.getSize()}px`;
        ball.style.width = `${this.getSize()}px`;
        ball.style.backgroundColor = this.color;
        ball.style.borderRadius = "50%";
        ball.style.display = "flex";
        ball.style.alignItems = "center";
        ball.style.justifyContent = "center";
        ball.style.color = "#fff";
        ball.style.fontWeight = "bold";
        ball.textContent = `${this.weight}kg`;

        const plankRect = Selectors.plank.getBoundingClientRect();

        const plankTopRelative = plankRect.top - containerRect.top;
        console.log("PlankTopRelative: ", plankTopRelative);
        console.log("plankRect.top: ", plankRect.top);
        console.log("containerRect.top: ", containerRect.top);
        console.log("Restored Weight X: ", this.x);
        ball.style.bottom = `${plankRect.height - 30}px`;

        this.element = ball;

        Selectors.plank.appendChild(ball);
    }
}