import { Selectors } from "./selectors.js";
import { State } from "./state.js";
import { calculateAngle } from "./physics.js";
import Weight from "./weight.js";

// console.log(calculateAngle(1000));

// let angle = calculateAngle(5000);

// Selectors.plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

const state = new State();

// Generating random weight (1-10)
const getRandomWeight = () => {
    let weight = Math.floor(Math.random() * 10) + 1;
    return weight;
}

// Generating random color
const getRandomColor = () => {
    const colors = ["#E74C3C", "#3598DB", "#F39C12", "#34495E", "#2FCC71", "#9B59B6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Calculating exact middle point
const getMiddlePoint = () => {
    const clickableAreaRect = Selectors.seesawClickableArea.getBoundingClientRect();
    const pivotRect = Selectors.pivot.getBoundingClientRect();

    // Equilizing Clickable Area and Pivot's reference point
    const middlePoint =
        (pivotRect.left - clickableAreaRect.left) +
        pivotRect.width / 2;

    return middlePoint;
}

// Temp local next weight variable
let nextWeight = null;

// Getting the mouse X Position relative to the clickable area
const getRelativeX = (e) => {
    const rect = Selectors.seesawClickableArea.getBoundingClientRect();
    return e.clientX - rect.left;
}

// Generating new Weight object
const generateNextWeight = () => {
    const randomWeight = getRandomWeight();
    const randomColor = getRandomColor();

    nextWeight = new Weight(0, randomWeight, randomColor);
    console.log('Next weight generated: ', nextWeight);
    Selectors.nextWeight.innerHTML = (nextWeight.weight);
}

// Generate next weight for the first time
generateNextWeight();

// Event Listener for Preview
Selectors.seesawClickableArea.addEventListener("mousemove", (e) => {
    if(!nextWeight){
        return;
    }

    const relativeX = getRelativeX(e);

    nextWeight.x = relativeX;

    console.log('Preview X: ', nextWeight.x);
    console.log('Preview weight: ', nextWeight);

});

var middlePoint = getMiddlePoint();
console.log("Middle Point: ", middlePoint);

// Event Listener for click and drop weight
Selectors.seesawClickableArea.addEventListener("click", (e) => {
    if(!nextWeight){
        return;
    }

    const relativeX = getRelativeX(e);

    nextWeight.x = relativeX;

    // Add weight to the state
    state.addWeight(nextWeight);

    // Add weights to the left or right
    const leftTotal = state.getLeftTotal(middlePoint);
    const rightTotal = state.getRightTotal(middlePoint);

    console.log('Left: ', leftTotal);
    console.log('Right: ', rightTotal);

    Selectors.leftWeight.innerHTML = `${leftTotal}.0 kg`;
    Selectors.rightWeight.innerHTML = `${rightTotal}.0 kg`;

    console.log('Dropped Weight: ', nextWeight);

    // Generate the next weight after the first time
    generateNextWeight();
});