import { Color } from "./objects/Color";
import Vector3D from "./objects/Vector3D";

export class PointLight {
    position: Vector3D;
    color: Color;
    intensity: number;
  
    constructor(position: Vector3D, color: Color, intensity: number) {
      this.position = position;
      this.color = color;
      this.intensity = intensity;
    }
  }