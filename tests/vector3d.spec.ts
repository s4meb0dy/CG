import Vector3D from "../src/objects/Vector3D"

describe("Vector3D", () => {
    describe("add", () => {
        it("should return a new vector with the sum of the input vectors", () => {
            const v1 = new Vector3D(1, 2, 3)
            const v2 = new Vector3D(4, 5, 6)
            const v3 = v1.add(v2)
            expect(v3.x).toBe(5)
            expect(v3.y).toBe(7)
            expect(v3.z).toBe(9)
        })
    })

    describe("subtract", () => {
        it("should return a new vector with the difference of the input vectors", () => {
            const v1 = new Vector3D(4, 5, 6)
            const v2 = new Vector3D(1, 2, 3)
            const v3 = v1.subtract(v2)
            expect(v3.x).toBe(3)
            expect(v3.y).toBe(3)
            expect(v3.z).toBe(3)
        })
    })

    describe("multiply", () => {
        it("should return a new vector with each component multiplied by the input number", () => {
            const v1 = new Vector3D(1, 2, 3)
            const v2 = v1.multiply(2)
            expect(v2.x).toBe(2)
            expect(v2.y).toBe(4)
            expect(v2.z).toBe(6)
        })
    })

    describe("dotProduct", () => {
        it("should return the dot product of the input vectors", () => {
            const v1 = new Vector3D(1, 2, 3)
            const v2 = new Vector3D(4, 5, 6)
            const result = v1.dotProduct(v2)
            expect(result).toBe(32)
        })

        it("should return a correct angle between another vector", () => {
            const v1 = new Vector3D(1, 0, 0)
            const v2 = new Vector3D(1, 1, 0)
            expect(v1.angleBetweenRads(v2)).toBeCloseTo(Math.PI / 4)
        })
    })

    
})
