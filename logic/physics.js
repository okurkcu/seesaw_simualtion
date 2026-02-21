import { Constants } from "./constants.js";

export const calculateAngle = (weights, middlePoint) => {
    let totalTorque = 0;

    weights.forEach(weight => {
        const distance = weight.x - middlePoint;
        const torque = weight.weight * distance;

        totalTorque += torque;
    });

    const normalizedTorque = totalTorque / 20;

    return Math.max(-Constants.MAX_ANGLE, Math.min(Constants.MAX_ANGLE, normalizedTorque));
}