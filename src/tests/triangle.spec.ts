import Vector3D from "../lab1/objects/Vector3D";
import Point3D from "../lab1/objects/Point3D";
import Triangle from "../lab1/objects/Triangle";
import Ray from "../lab1/objects/Ray";

describe("Triangle", () => {
  const triangle = new Triangle(
    new Vector3D(0, 0, 0),
    new Vector3D(1, 0, 0),
    new Vector3D(0, 1, 0)
  );

  describe("#intersect", () => {
    it("should return intersection point if ray intersects triangle", () => {
      const ray = new Ray(new Point3D(0.5, 0.5, 1), new Vector3D(0, 0, -1));
      const intersection = triangle.getIntersection(ray);
      expect(intersection).toEqual(new Vector3D(0.5, 0.5, 0));
    });

    it("should return null if ray is parallel to triangle", () => {
      const ray = new Ray(new Point3D(0.5, 0.5, 1), new Vector3D(0, 1, 0));
      const intersection = triangle.getIntersection(ray);
      expect(intersection).toBeNull();
    });

    it("should return null if intersection point is outside the triangle", () => {
      const ray = new Ray(new Point3D(2, 2, 1), new Vector3D(0, 0, -1));
      const intersection = triangle.getIntersection(ray);
      expect(intersection).toBeNull();
    });

    it("should return null if ray starts behind the triangle", () => {
      const ray = new Ray(new Point3D(0.5, 0.5, 1), new Vector3D(0, 0, 1));
      const intersection = triangle.getIntersection(ray);
      expect(intersection).toBeNull();
    });
  });
});