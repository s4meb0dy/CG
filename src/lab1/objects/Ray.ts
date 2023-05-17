import Vector3D from './Vector3D';
import Point3D from './Point3D';


export default class Ray {
  public readonly position: Point3D;
  public readonly vector: Vector3D;

  constructor(position: Point3D, vector: Vector3D) {
    this.position = position;
    this.vector = vector.normalize();
  }

  public hasInside(point: Point3D): boolean {
    const t =
      point
        .toVector()
        .subtract(this.position.toVector())
        .dotProduct(this.vector) / this.vector.dotProduct(this.vector);

    return t >= 0;
  }

  public angleBetweenRads(ray: Ray): number {
    return this.vector.angleBetweenRads(ray.vector);
  }
}
