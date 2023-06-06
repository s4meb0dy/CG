import { Color } from "./Color";
import Vector3D from "./Vector3D";

export class DirectionalLight {
    direction: Vector3D;
    color: Color;
    intensity: number;
  
    constructor(direction: Vector3D, color: Color, intensity: number) {
      this.direction = direction;
      this.color = color;
      this.intensity = intensity;
    }
  }