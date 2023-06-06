import ConsoleRenderer from "../lab1/ConsoleRenderer"
import Camera from "../lab1/objects/Camera"
import { DirectionalLight } from "../lab1/objects/DirectionalLight"
import Point3D from "../lab1/objects/Point3D"
import { Sphere } from "../lab1/objects/Sphere"
import Vector3D from "../lab1/objects/Vector3D"
import { Scene } from "../lab1/types/Scene"
import { Traceable } from "../lab1/types/Traceable"

describe("ConsoleRenderer", () => {
    let scene: Scene
    let renderer: ConsoleRenderer
    let camera: Camera

    beforeEach(() => {
        const objects: Traceable[] = [new Sphere(new Point3D(0, 0, 0), 1)]
        camera = new Camera(
            new Point3D(0, 0, -2),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            50
        )
        const light = new DirectionalLight(new Vector3D(1, 0, 0))
        scene = { objects, camera, light }
        renderer = new ConsoleRenderer(scene)
    })

    it("should render the scene to the console", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => void 0)
        renderer.render()
        expect(spy).toHaveBeenCalled()
    })

    it("should render a pixel for each screen pixel", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => void 0)
        renderer.render()
        expect(spy).toHaveBeenCalledTimes(camera.vResolution * 2)
        expect(spy.mock.calls[0][0].length).toEqual(camera.hResolution)
    })

    it("should output different shades", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => void 0)
        renderer.render()
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("#"))
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("O"))
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("."))
        expect(spy).toHaveBeenCalledWith(expect.stringContaining(" "))
    })
})
