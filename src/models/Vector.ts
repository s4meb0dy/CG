import Point from "./Point";

class Vector {
    x: number
    y: number
    z: number

    constructor(
        coordinates?: { x: number; y: number; z: number },
        difference?: { start: Point; end: Point }
    ) {
        if (coordinates) {
            this.x = coordinates.x
            this.y = coordinates.y
            this.z = coordinates.z
        } else if (difference) {
            this.x = difference.end.x - difference.start.x
            this.y = difference.end.y - difference.start.y
            this.z = difference.end.z - difference.start.z
        } else {
            throw new Error("Vector should has initial value")
        }
    }

    module(): number {
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
        )
    }

    Normalize(): Vector {
        var module = this.module()

        const coordinates = {
            x: this.x / module,
            y: this.y / module,
            z: this.z / module,
        }

        return new Vector(coordinates)
    }

    Cross(left: Vector, right: Vector): Vector {
        var i = Math.abs(left.y * right.z - left.z * right.y)
        var j = Math.abs(left.x * right.z - left.z * right.x)
        var k = Math.abs(left.x * right.y - left.y * right.x)

        return new Vector({ x: i, y: -j, z: k })
    }

    dot(left: Vector, right: Vector): number {
        return left.x * right.x + left.y * right.y + left.z * right.z
    }

    Add(vector: Vector): Vector {
        return new Vector({
            x: this.x + vector.x,
            y: this.y + vector.y,
            z: this.z + vector.z,
        })
    }

    Subtract(vector: Vector): Vector {
        return new Vector({
            x: this.x - vector.x,
            y: this.y - vector.y,
            z: this.z - vector.z,
        })
    }
}

export default Vector
