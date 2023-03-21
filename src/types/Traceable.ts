import Ray from "../objects/Ray"
import { Hit } from "./Hit"

export interface Traceable {
    getIntersection: (ray: Ray) => Hit | null
}
