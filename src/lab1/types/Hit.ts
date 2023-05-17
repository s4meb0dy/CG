import Normal3D from "../objects/Normal"
import Point3D from "../objects/Point3D"

export interface Hit {
    normal: Normal3D
    point: Point3D
    t: number
}
