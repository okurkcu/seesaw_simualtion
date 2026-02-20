import { Selectors } from "./selectors.js";
import { State } from "./state.js";
import { calculateAngle } from "./physics.js";
import Weight from "./weight.js";
import Preview from "./preview.js";

// console.log(calculateAngle(1000));

// let angle = calculateAngle(5000);

// Selectors.plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

const state = new State();
const preview = new Preview(Selectors.seesawClickableArea);

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
let nextWeightBall = null;
let nextWeightLine = null;

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
    
    // Create ball visual for next weight
    preview.generate(nextWeight);
}

// Function for adding logs
const addLog = (weight, direction, distance) => {
    const logDiv = document.createElement('div');
    logDiv.textContent = `📦 ${weight}kg dropped on ${direction} side at ${distance.toFixed(0)}px from center`;

    // Giving Styling
    logDiv.style.backgroundColor = '#f4f4f9';
    logDiv.style.color = '#333';
    logDiv.style.padding = '10px 15px';
    logDiv.style.borderRadius = '5px';
    logDiv.style.borderLeft = '4px solid #007bff';
    logDiv.style.marginBottom = '8px';
    logDiv.style.opacity = '0';
    logDiv.style.transform = 'translateX(-20px)';
    logDiv.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    Selectors.logContainer.prepend(logDiv);
    
    // Log animation
    setTimeout(() => {
        logDiv.style.opacity = '1';
        logDiv.style.transform = 'translateX(0)';
    }, 10);
    
    // Keep only the last 10 logs
    if (Selectors.logContainer.children.length > 9) {
        Selectors.logContainer.removeChild(Selectors.logContainer.lastChild);
    }
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

    preview.updatePosX(relativeX);

    console.log('Preview X: ', nextWeight.x);
    console.log('Preview weight: ', nextWeight);

});

// Event Listener for when mouse leaves the clickable area
Selectors.seesawClickableArea.addEventListener("mouseleave", () => {
    preview.hide();
});

// Event Listener for when mouse enters the clickable area
Selectors.seesawClickableArea.addEventListener("mouseenter", () => {
    preview.show();
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

    // Deciding on direction and distance from middle point
    const direction = nextWeight.x < middlePoint ? "left" : "right";
    const distance = Math.abs(nextWeight.x - middlePoint);

    // Adding log on every weight drop
    addLog(nextWeight.weight, direction, distance);

    console.log('Dropped Weight: ', nextWeight);

    // Generate the next weight after the first time
    generateNextWeight();
    
    preview.updatePosX(relativeX);
    preview.show();
});