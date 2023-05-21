import Point3D from "../lab1/objects/Point3D"
import Ray from "../lab1/objects/Ray"
import { Sphere } from "../lab1/objects/Sphere"
import Vector3D from "../lab1/objects/Vector3D"

describe("Sphere", () => {
    const center = new Point3D(0, 0, 0)
    const radius = 1
    const sphere = new Sphere(center, radius)

    describe("constructor", () => {
        it("should set the center and radius properties", () => {
            expect(sphere.center).toEqual(center)
            expect(sphere.radius).toEqual(radius)
        })
    })

    describe("isIntersecting", () => {
        it("should return a correct inersection point, t and normal when the ray intersects the sphere", () => {
            const ray = new Ray(new Point3D(0, 0, -2), new Vector3D(0, 0, 1))
            const intersecion = sphere.getIntersection(ray)
            expect(intersecion?.point).toEqual(new Point3D(0, 0, -1))
            expect(intersecion?.normal.vector).toEqual(new Vector3D(0, 0, -1))
            expect(intersecion?.t).toBe(1)
        })

        it("should return null when the ray does not intersect the sphere", () => {
            const ray = new Ray(new Point3D(0, 0, -2), new Vector3D(1, 1, 1))
            expect(sphere.getIntersection(ray)).toBe(null)
        })

        it("should return null when the ray intersects the sphere but only behind", () => {
            const ray = new Ray(new Point3D(0, 0, 2), new Vector3D(0, 0, 1))
            expect(sphere.getIntersection(ray)).toBe(null)
        })

        it("should return a correct intersection point, t and normal when the ray is tangent to the sphere", () => {
            const ray = new Ray(new Point3D(0, 1, 0), new Vector3D(1, 0, 0))
            const intersecion = sphere.getIntersection(ray)
            expect(intersecion?.point).toEqual(new Point3D(0, 1, 0))
            expect(intersecion?.normal.vector).toEqual(new Vector3D(0, 1, 0))
            expect(intersecion?.t).toBeCloseTo(0)
        })

        it("should return correct intersection when the ray starts outside the sphere and goes through the center", () => {
            const ray = new Ray(new Point3D(0, 0, -2), new Vector3D(0, 0, 2))
            const intersecion = sphere.getIntersection(ray)
            expect(intersecion?.point).toEqual(new Point3D(0, 0, -1))
            expect(intersecion?.normal.vector).toEqual(new Vector3D(0, 0, -1))
            expect(intersecion?.t).toBe(1)
        })
        it("should return null intersection when the ray starts inside the sphere", () => {
            const ray = new Ray(new Point3D(0, 0, 0), new Vector3D(0, 0, 1))
            const intersecion = sphere.getIntersection(ray)
            expect(intersecion).toBeNull()
        })
    })
})
