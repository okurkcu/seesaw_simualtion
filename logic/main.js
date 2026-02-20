import { Selectors } from "./selectors.js";
import { State } from "./state.js";
import { calculateAngle } from "./physics.js";
import Weight from "./weight.js";
import { addLog } from "./log.js";
import { getRandomWeight, getRandomColor, getRelativeX, getMiddlePoint } from "./utils.js";

const state = new State();

// Temp local next weight variable
let nextWeight = null;

// Generating new Weight object
const generateNextWeight = () => {
    const randomWeight = getRandomWeight();
    const randomColor = getRandomColor();

    nextWeight = new Weight(0, randomWeight, randomColor);
    console.log('Next weight generated: ', nextWeight);
    Selectors.nextWeight.innerHTML = (nextWeight.weight);

    const size = nextWeight.getSize();

    Selectors.previewBall.style.width = `${size}px`;
    Selectors.previewBall.style.height = `${size}px`;
    Selectors.previewBall.style.backgroundColor = randomColor;
    Selectors.previewBall.textContent = `${randomWeight}kg`;

    Selectors.previewLine.style.backgroundColor = randomColor;
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

    Selectors.previewBall.style.left = `${relativeX}px`;
    Selectors.previewLine.style.left = `${relativeX}px`;

    Selectors.previewBall.style.display = "flex";
    Selectors.previewLine.style.display = "flex";

    console.log('Preview X: ', nextWeight.x);
    console.log('Preview weight: ', nextWeight);

    console.log("Ball Location: ", Selectors.previewBall.style.left);
    console.log("Line Location and Display: ", Selectors.previewLine.style.left, Selectors.previewLine.style.display);

});

// Event Listener for when mouse leaves the clickable area
Selectors.seesawClickableArea.addEventListener("mouseleave", () => {
    Selectors.previewBall.style.display = "none";
    Selectors.previewLine.style.display = "none";
});

var middlePoint = getMiddlePoint();
console.log("Middle Point: ", middlePoint);

// Event Listener for click and drop weight
Selectors.seesawClickableArea.addEventListener("click", (e) => {
    if(!nextWeight){
        return;
    }

    const relativeX = getRelativeX(e);
    const plankRect = Selectors.plank.getBoundingClientRect();

    const localX = e.clientX - plankRect.left;

    nextWeight.x = relativeX;

    // Add weight to the state
    state.addWeight(nextWeight);

    // Cloning preview ball and giving style to make it real weight
    const droppedBall = Selectors.previewBall.cloneNode(true);
    droppedBall.style.position = "absolute";
    droppedBall.style.left = `${localX}px`;
    droppedBall.style.opacity = "1";
    droppedBall.style.display = "flex";
    droppedBall.style.top = "-500px";
    droppedBall.style.transition = "top 0.5s ease";

    setTimeout(() => {
        droppedBall.style.top = "0px";
    }, 10);

    Selectors.plank.appendChild(droppedBall);

    // Calculate angle and tilt plank
    const angle = calculateAngle(state.weights, middlePoint);

    Selectors.plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    Selectors.tiltAngle.innerHTML = `${angle.toFixed(1)}°`;

    // Add weights to the left or right
    const leftTotal = state.getLeftTotal(middlePoint);
    const rightTotal = state.getRightTotal(middlePoint);

    console.log('Left: ', leftTotal);
    console.log('Right: ', rightTotal);

    Selectors.leftWeight.innerHTML = `${leftTotal}.0 kg`;
    Selectors.rightWeight.innerHTML = `${rightTotal}.0 kg`;

    // Deciding on direction and distance from middle point
    const direction = nextWeight.x < middlePoint ? "left" : "right";
    const distance = Math.abs(nextWeight.x - middlePoint);

    // Adding log on every weight drop
    addLog(nextWeight.weight, direction, distance);

    console.log('Dropped Weight: ', nextWeight);

    // Generate the next weight after the first time
    generateNextWeight();
});