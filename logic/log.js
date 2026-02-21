import { Selectors } from "./selectors.js";

export const addLog = (weight, direction, distance) => {
    const logDiv = document.createElement('div');
    logDiv.textContent = `📦 ${weight}kg dropped on ${direction} side at ${distance.toFixed(0)}px from center`;
    
    // Giving Styling to logs
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
        
    setTimeout(() => {
        logDiv.style.opacity = '1';
        logDiv.style.transform = 'translateX(0)';
    }, 10);
        
    // Keeping only the last 10 logs
    if (Selectors.logContainer.children.length > 9) {
        Selectors.logContainer.removeChild(Selectors.logContainer.lastChild);
    }
}