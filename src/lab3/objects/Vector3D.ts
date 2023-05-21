import Point3D from "./Point3D"
import Point from "./Point3D"

class Vector3D {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    public add(vector: Vector3D): Vector3D {
        return new Vector3D(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        )
    }

    public subtract(vector: Vector3D): Vector3D {
        return new Vector3D(
            this.x - vector.x,
            this.y - vector.y,
            this.z - vector.z
        )
    }

    public multiply(number: number): Vector3D {
        return new Vector3D(this.x * number, this.y * number, this.z * number)
    }

    public dotProduct(vector: Vector3D): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    public angleBetweenRads(vector: Vector3D): number {
        return Math.acos(
            this.dotProduct(vector) / (this.length * vector.length)
        )
    }

    public crossProduct(vector: Vector3D): Vector3D {
        return new Vector3D(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        )
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    public toPoint3D(): Point3D {
        return new Point3D(this.x, this.y, this.z)
    }

    public normalize(): Vector3D {
        return this.multiply(1 / this.length)
    }
}

export default Vector3D
