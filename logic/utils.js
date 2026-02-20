import { Selectors } from "./selectors.js";

// Function for random weight (1-10)
export function getRandomWeight() {
    let weight = Math.floor(Math.random() * 10) + 1;
    return weight;
}

// Function for random color
export function getRandomColor() {
    const colors = ["#E74C3C", "#3598DB", "#F39C12", "#34495E", "#2FCC71", "#9B59B6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Getting relative X-Axis value for preview weight
export function getRelativeX(e) {
    const rect = Selectors.seesawClickableArea.getBoundingClientRect();
    return e.clientX - rect.left;
}

// Calculating middle point of the plank for weight direction (left / right)
export function getMiddlePoint() {
    const clickableAreaRect = Selectors.seesawClickableArea.getBoundingClientRect();
    const pivotRect = Selectors.pivot.getBoundingClientRect();

    // Equilizing Clickable Area and Pivot's reference point
    const middlePoint =
        (pivotRect.left - clickableAreaRect.left) +
        pivotRect.width / 2;

    return middlePoint;
}