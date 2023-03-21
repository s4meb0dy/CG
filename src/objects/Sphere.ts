import { Traceable } from "../types/Traceable"
import Point3D from "./Point3D"
import Ray from "./Ray"
import Normal3D from "./Normal"
import { Hit } from "../types/Hit"

export class Sphere implements Traceable {
    public readonly center: Point3D
    public readonly radius: number

    constructor(center: Point3D, radius: number) {
        this.center = center
        this.radius = radius
    }

    public getIntersection(ray: Ray): Hit | null {
        const a = ray.vector.dotProduct(ray.vector)

        const ocVector = ray.position
            .toVector()
            .subtract(this.center.toVector())
        const b = 2 * ray.vector.dotProduct(ocVector)
        const c = ocVector.dotProduct(ocVector) - this.radius ** 2
        const D = b * b - 4 * a * c

        if (D < 0) {
            return null
        }
        const t1 = (-b + Math.sqrt(D)) / (2 * a)
        const t2 = (-b - Math.sqrt(D)) / (2 * a)

        if (t2 < 0) {
            return null
        }
        const t = Math.min(t1, t2)
        const pHit = ray.position.toVector().add(ray.vector.multiply(t))
        return {
            normal: new Normal3D(pHit.subtract(this.center.toVector())),
            point: pHit.toPoint3D(),
            t,
        }
    }
}
