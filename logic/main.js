import { Selectors } from "./selectors.js";
import { State } from "./state.js";
import { calculateAngle } from "./physics.js";
import Weight from "./weight.js";
import { addLog } from "./log.js";
import { getRandomWeight, getRandomColor, getRelativeX, getMiddlePoint, playDropSound } from "./utils.js";

const state = new State();

let nextWeight = null;

var middlePoint = getMiddlePoint();

// Updating total weights and angle
const updateTotalsAndAngle = () => {

    // Add weights to the left or right
    const leftTotal = state.getLeftTotal(middlePoint);
    const rightTotal = state.getRightTotal(middlePoint);

    Selectors.leftWeight.innerHTML = `${leftTotal}.0 kg`;
    Selectors.rightWeight.innerHTML = `${rightTotal}.0 kg`;

    // Calculate angle and tilt of plank
    const angle = calculateAngle(state.weights, middlePoint);

    Selectors.plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    Selectors.tiltAngle.innerHTML = `${angle.toFixed(1)}°`;
}

// Function for restoring last instant of seesaw from localStorage
const restoreSimulation = () => {
    const savedWeights = state.loadFromStorage();

    if(!savedWeights || !savedWeights.length){
        return;
    }

    savedWeights.forEach(w => {
        const weightInstance = new Weight(w.x, w.weight, w.color);
        state.weights.push(weightInstance);
    });

    updateTotalsAndAngle();

    state.weights.forEach(weight => {
        weight.render();
    });
}

restoreSimulation();

// Function for weight styling
const loadWeight = (droppedBall, localX) => {
    
    droppedBall.style.position = "absolute";
    droppedBall.style.left = `${localX}px`;
    droppedBall.style.opacity = "1";
    droppedBall.style.display = "flex";
    droppedBall.style.top = "-100px";
    droppedBall.style.transition = "top 0.5s ease";
    droppedBall.classList.add("dropped-ball");

    setTimeout(() => {
        droppedBall.style.top = "0px";
    }, 10);
}

// Generating new Weight object
const generateNextWeight = () => {
    const randomWeight = getRandomWeight();
    const randomColor = getRandomColor();

    nextWeight = new Weight(0, randomWeight, randomColor);
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

});

// Event Listener for when mouse leaves the clickable area
Selectors.seesawClickableArea.addEventListener("mouseleave", () => {
    Selectors.previewBall.style.display = "none";
    Selectors.previewLine.style.display = "none";
});


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
    loadWeight(droppedBall, localX);

    Selectors.plank.appendChild(droppedBall);

    updateTotalsAndAngle();
    
    playDropSound();

    // Deciding on direction and distance from middle point
    const direction = nextWeight.x < middlePoint ? "left" : "right";
    const distance = Math.abs(nextWeight.x - middlePoint);

    // Adding log on every weight drop
    addLog(nextWeight.weight, direction, distance);

    // Generate the next weight after the first time
    generateNextWeight();

    state.saveToStorage();
});

// Highlight the clickable area for user when clicked outside
Selectors.seesawContainer.addEventListener("click", (e) => {
    if(Selectors.seesawClickableArea.contains(e.target)) {
        return;
    }

    Selectors.seesawClickableArea.classList.add("misclick-flash");

    setTimeout(() => {
        Selectors.seesawClickableArea.classList.remove("misclick-flash");
    }, 1000);
});

// Reset on button click
Selectors.resetBtn.addEventListener("click", (e) => {
    // Reset the state
    state.reset();

    // Make the plank flat
    Selectors.plank.style.transform = "translate(-50%, -50%) rotate(0deg)";

    // Reset the UI
    Selectors.leftWeight.innerHTML = "0.0kg";
    Selectors.rightWeight.innerHTML = "0.0kg";
    Selectors.tiltAngle.innerHTML = "0.0°";

    // Cleaning the log
    Selectors.logContainer.innerHTML = "";

    // Clean the dropped weight on the plank
    const droppedBalls = Selectors.plank.querySelectorAll(".dropped-ball");
    droppedBalls.forEach(ball => ball.remove());

    // Generating the next weight
    generateNextWeight();
})