import Triangle from "./Triangle";
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
rotate(theta: number): this {
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const newmatrix = [
    [
      cosTheta * this.matrix[0][0] - sinTheta * this.matrix[0][1],
      sinTheta * this.matrix[0][0] + cosTheta * this.matrix[0][1],
    ],
    [
      cosTheta * this.matrix[1][0] - sinTheta * this.matrix[1][1],
      sinTheta * this.matrix[1][0] + cosTheta * this.matrix[1][1],
    ],
  ];
  this.matrix = newmatrix;
  return this;
}

toVector(): Vector3D {
  return new Vector3D(this.matrix[0][3], this.matrix[1][3], this.matrix[2][3]);
}


applyMatrixToPoint(point: Vector3D): Vector3D {
  const { x, y, z } = point; 
  const [a, b, c, d] = this.matrix[0];
  const [e, f, g, h] = this.matrix[1];
  const [i, j, k, l] = this.matrix[2];
  const [m, n, o, p] = this.matrix[3];
  const newX = a * x + b * y + c * z + d;
  const newY = e * x + f * y + g * z + h;
  const newZ = i * x + j * y + k * z + l;
  const newW = m * x + n * y + o * z + p;
  return new Vector3D(newX / newW, newY / newW, newZ / newW);
}

multiplyVector(vector: Vector3D): Vector3D {
  const x =
    this.matrix[0][0] * vector.x +
    this.matrix[0][1] * vector.y +
    this.matrix[0][2] * vector.z;
  const y =
    this.matrix[1][0] * vector.x +
    this.matrix[1][1] * vector.y +
    this.matrix[1][2] * vector.z;
  const z =
    this.matrix[2][0] * vector.x +
    this.matrix[2][1] * vector.y +
    this.matrix[2][2] * vector.z;
  return new Vector3D(x, y, z);
}

private multiply(other: number[][]): void {
  const newmatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      for (let i = 0; i < 3; i++) {
        newmatrix[row][col] += this.matrix[row][i] * other[i][col];
      }
    }
  }
  this.matrix = newmatrix;
}

applyMatrixToVector(vector: Vector3D): Vector3D {
  const { x, y, z } = vector;
  const [a, b, c] = this.matrix[0];
  const [e, f, g] = this.matrix[1];
  const [i, j, k] = this.matrix[2];
  const newX = a * x + b * y + c * z;
  const newY = e * x + f * y + g * z;
  const newZ = i * x + j * y + k * z;

  return new Vector3D(newX, newY, newZ);
}

applyMatrixToNormal(normal: Vector3D): Vector3D {

  const [a, e, i] = this.matrix[0];
  const [b, f, j] = this.matrix[1];
  const [c, g, k] = this.matrix[2];
  const { x, y, z } = normal;
  const newX = a * x + b * y + c * z;
  const newY = e * x + f * y + g * z;
  const newZ = i * x + j * y + k * z;
  return new Vector3D(newX, newY, newZ);
}

applyMatrixToTriangle(triangle: Triangle): Triangle {
  const { vertex1, vertex2, vertex3 } = triangle;
  return new Triangle(
    this.applyMatrixToPoint(vertex1),
    this.applyMatrixToPoint(vertex2),
    this.applyMatrixToPoint(vertex3)
  );
}

multiplyMatrix(matrix: Matrix): Matrix {
  const result: number[][] = [];
  for (let i = 0; i < 4; i++) {
    result[i] = [];
    for (let j = 0; j < 4; j++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) {
        sum += this.matrix[i][k] * matrix.matrix[k][j];
      }
      result[i][j] = sum;
    }
  }
  return new Matrix(result);
 }
}