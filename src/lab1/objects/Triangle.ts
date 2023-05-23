import Vector from '../objects/Vector3D';
import Ray from '../objects/Ray';

export default class Triangle {
  public vertex1: Vector;
  public vertex2: Vector;
  public vertex3: Vector;

  constructor(v1: Vector, v2: Vector, v3: Vector) {
    this.vertex1 = v1;
    this.vertex2 = v2;
    this.vertex3 = v3;
  }

  public getIntersection(ray: Ray): Vector | null {
    const EPSILON = 0.000001;

    const edge1 = this.vertex2.subtract(this.vertex1);
    const edge2 = this.vertex3.subtract(this.vertex1);

    const h = ray.vector.crossProduct(edge2);
    const a = edge1.dotProduct(h);

    if (a > -EPSILON && a < EPSILON) {
      return null;
    }

    const f = 1 / a;
    const s = ray.position.toVector().subtract(this.vertex1);
    const u = f * s.dotProduct(h);
    if (u < 0 || u > 1) {
      return null;
    }
    const q = s.crossProduct(edge1);
    const v = f * ray.vector.dotProduct(q);
    if (v < 0 || u + v > 1) {
      return null;
    }
    const t = f * edge2.dotProduct(q);
    if (t > EPSILON) {
      return ray.position.toVector().add(ray.vector.multiply(t));
    }
    return null;
  }

  getNormal(cameraPosition: Vector): Vector {
    const edge1 = this.vertex2.subtract(this.vertex1);
    const edge2 = this.vertex3.subtract(this.vertex1);
    const normal = edge1.crossProduct(edge2).normalize();

    const toCamera = cameraPosition.subtract(this.getCenter());
    const dotProduct = normal.dotProduct(toCamera);

    if (dotProduct < 0) {
      return normal.multiply(-1);
    } else {
      return normal;
    }
  }

  getCenter(): Vector {
    const sum = this.vertex1.add(this.vertex2).add(this.vertex3);
    return new Vector(sum.x / 3, sum.y / 3, sum.z / 3);
  }
}
