import Vector3D from "./Vector3D";

export default class Matrix {
  public matrix: number[][];

  constructor(matrix: number[][]) {
    this.matrix = matrix;
  }

  static translate(vector: Vector3D, translation: Vector3D): Vector3D {
    const translatedVector = new Vector3D(
      vector.x + translation.x,
      vector.y + translation.y,
      vector.z + translation.z
    );

    return translatedVector;
  }

  static scale(vector: Vector3D, scale: Vector3D): Vector3D {
    return new Vector3D(
      vector.x * scale.x,
      vector.y * scale.y,
      vector.z * scale.z
    );
  }

  static rotateAroundAxis(vector: Vector3D, axis: Vector3D, angle: number): Vector3D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const oneMinusCos = 1 - cos;

    const rotationMatrix = [
      [
        cos + axis.x * axis.x * oneMinusCos,
        axis.x * axis.y * oneMinusCos - axis.z * sin,
        axis.x * axis.z * oneMinusCos + axis.y * sin,
      ],

      [
        axis.y * axis.x * oneMinusCos + axis.z * sin,
        cos + axis.y * axis.y * oneMinusCos,
        axis.y * axis.z * oneMinusCos - axis.x * sin,
      ],

      [
        axis.z * axis.x * oneMinusCos - axis.y * sin,
        axis.z * axis.y * oneMinusCos + axis.x * sin,
        cos + axis.z * axis.z * oneMinusCos,
      ],
    ];

    const rotatedVector = new Vector3D(
      vector.x * rotationMatrix[0][0] +
        vector.y * rotationMatrix[1][0] +
        vector.z * rotationMatrix[2][0],
      vector.x * rotationMatrix[0][1] +
        vector.y * rotationMatrix[1][1] +
        vector.z * rotationMatrix[2][1],
      vector.x * rotationMatrix[0][2] +
        vector.y * rotationMatrix[1][2] +
        vector.z * rotationMatrix[2][2]
    );

    return rotatedVector;
  }
}