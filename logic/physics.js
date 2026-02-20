import { Constants } from "./constants.js";

export function calculateAngle(totalTorque){
    const normalized = totalTorque / 500;
    return Math.max(-Constants.MAX_ANGLE, Math.min(Constants.MAX_ANGLE, normalized));
}