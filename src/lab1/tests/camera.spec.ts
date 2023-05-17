import Camera from "../objects/Camera"
import Point3D from "../objects/Point3D"
import Vector3D from "../objects/Vector3D"


describe("Camera", () => {
    const ratio = 16 / 9
    const camera = new Camera(
        new Point3D(1, 1, 1),
        new Vector3D(1, 1, 1),
        ratio,
        Math.PI / 3,
        1920
    )
    it("should have a screen center", () => {
        expect(camera.screenCenter).toEqual(new Point3D(2, 2, 2))
    })

    it("should have a screen width", () => {
        expect(camera.screenWidth).toBeCloseTo(
            (2 * camera.viewVector.length) / Math.sqrt(3)
        )
    })

    it("should have a screen height", () => {
        expect(camera.screenHeight).toBeCloseTo(
            (2 * camera.viewVector.length) / Math.sqrt(3) / ratio
        )
    })

    it("should have correct vertical resolution", () => {
        expect(camera.vResolution).toEqual(1080)
    })

    const convenientCamera = new Camera(
        new Point3D(0, 0, 0),
        new Vector3D(1, 1, 0),
        1,
        Math.PI / 2,
        1920
    )

    it("should correctly translate pixel coordinates into 3d coordinates", () => {
        const coordBottomLeft = convenientCamera.getScreenPixelCoordinates(0, 0)
        expect(coordBottomLeft.x).toBeCloseTo(2)
        expect(coordBottomLeft.y).toBeCloseTo(0)
        expect(coordBottomLeft.z).toBeCloseTo(-Math.sqrt(2))
        const coordTopRight = convenientCamera.getScreenPixelCoordinates(
            1920,
            1920
        )
        expect(coordTopRight.x).toBeCloseTo(0)
        expect(coordTopRight.y).toBeCloseTo(2)
        expect(coordTopRight.z).toBeCloseTo(Math.sqrt(2))
        expect(
            convenientCamera.getScreenPixelCoordinates(1920 / 2, 1920 / 2)
        ).toEqual(new Point3D(1, 1, 0))
    })
})
