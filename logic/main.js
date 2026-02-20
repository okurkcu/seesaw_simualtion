import { Selectors } from "./selectors.js";
import './physics.js'
import { calculateAngle } from "./physics.js";

console.log('Left Weight:', Selectors.leftWeight);
console.log('Next Weight: ', Selectors.nextWeight);
console.log('Right Weight: ', Selectors.rightWeight);
console.log('Tilt Angle: ', Selectors.tiltAngle);
console.log('Clickable Area: ', Selectors.seesawClickableArea);
console.log('Preview Line: ', Selectors.linePreview);
console.log('Preview Object: ', Selectors.objectPreview);
console.log('Reset Button: ', Selectors.resetBtn);
console.log('Log Container: ', Selectors.logContainer);


console.log(calculateAngle(1000));

let angle = calculateAngle(5000);

Selectors.plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;