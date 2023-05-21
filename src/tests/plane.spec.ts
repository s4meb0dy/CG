import Normal3D from "../lab1/objects/Normal"
import Plane from "../lab1/objects/Plane"
import Point3D from "../lab1/objects/Point3D"
import Ray from "../lab1/objects/Ray"
import Vector3D from "../lab1/objects/Vector3D"

describe("Plane", () => {
    const normal = new Vector3D(0, 0, 1)
    const point = new Point3D(0, 0, 0)
    const plane = new Plane(point, normal)

    test("constructor initializes vector and point", () => {
        expect(plane.normal.vector).toEqual(new Vector3D(0, 0, 1))
        expect(plane.point).toEqual(point)
    })

    describe("getIntersection", () => {
        it("should return null if the ray is parallel to the plane", () => {
            const ray = new Ray(new Point3D(1, 1, 1), new Vector3D(1, 0, 0))
            expect(plane.getIntersection(ray)).toBeNull()
        })

        it("should return null if the ray is pointing away from the plane", () => {
            const ray = new Ray(new Point3D(0, 0, 1), new Vector3D(0, 0, 1))
            expect(plane.getIntersection(ray)).toBeNull()
        })

        it("should return the correct intersection point and normal", () => {
            const ray = new Ray(new Point3D(0, 0, 1), new Vector3D(0, 0, -1))
            const intersection = plane.getIntersection(ray)
            expect(intersection).not.toBeNull()
            expect(intersection?.point).toEqual(new Point3D(0, 0, 0))
            expect(intersection?.normal).toEqual(new Normal3D(normal))
        })
    })
})
