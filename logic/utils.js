import { Selectors } from "./selectors.js";

// Function for random weight (1-10)
export const getRandomWeight = () => {
    let weight = Math.floor(Math.random() * 10) + 1;
    return weight;
}

// Function for random color
export const getRandomColor = () => {
    const colors = ["#E74C3C", "#3598DB", "#F39C12", "#34495E", "#2FCC71", "#9B59B6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Getting relative X-Axis value for preview weight
export const getRelativeX = (e) => {
    const rect = Selectors.seesawClickableArea.getBoundingClientRect();
    return e.clientX - rect.left;
}

// Calculating middle point of the plank for weight direction (left / right)
export const getMiddlePoint = () => {
    const clickableAreaRect = Selectors.seesawClickableArea.getBoundingClientRect();
    const pivotRect = Selectors.pivot.getBoundingClientRect();

    // Equilizing Clickable Area and Pivot's reference point
    const middlePoint =
        (pivotRect.left - clickableAreaRect.left) +
        pivotRect.width / 2;

    return middlePoint;
}

export const playDropSound = () => {
    const audio = new Audio("./assets/dropSound.mp3");
    audio.play().catch(err => {
        console.warn("Unable to play drop sound:", err);
    });
}
