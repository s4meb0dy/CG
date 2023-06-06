import { Color } from "./Color";

export class AmbientLight {
    color: Color;
    intensity: number;
  
    constructor(color: Color, intensity: number) {
      this.color = color;
      this.intensity = intensity;
    }
  }
  