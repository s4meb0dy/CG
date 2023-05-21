import Vector3D from './Vector3D';

export default class Normal3D {
  public readonly vector: Vector3D;
  constructor(vector: Vector3D) {
    this.vector = vector.normalize();
  }
}
