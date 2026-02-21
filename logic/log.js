import { Selectors } from "./selectors.js";

export const addLog = (weight, direction, distance) => {
    const logDiv = document.createElement('div');
    logDiv.textContent = `📦 ${weight}kg dropped on ${direction} side at ${distance.toFixed(0)}px from center`;
    
    logDiv.classList.add("logDiv");
    
    Selectors.logContainer.prepend(logDiv);
        
    setTimeout(() => {
        logDiv.style.opacity = '1';
        logDiv.style.transform = 'translateX(0)';
    }, 10);
        
    // Keeping only the last 10 logs
    if (Selectors.logContainer.children.length > 9) {
        Selectors.logContainer.removeChild(Selectors.logContainer.lastChild);
    }
}