import Reader from "./Reader"
import Camera from "../lab1/objects/Camera"
import Vector3D from "../lab1/objects/Vector3D"
import Point3D from "../lab1/objects/Point3D"
import Raytracer from "./rayTracer"
import { DirectionalLight } from "../lab1/objects/Light"
import {
    MatrixTransformationEnum,
    MatrixTransformations,
    transformationFactory,
} from "./matrixTransformation"
import Writer from "../lab1/objects/Writer"
import { Sphere } from "../lab1/objects/Sphere"

const start = async () => {
    let src = ""

    try {
        const args = process.argv.slice(2)
        args.forEach((arg) => {
            if (arg.includes("--source=")) {
                const inputFile = arg.slice(9)

                src = `${__dirname}/${inputFile}`.replace(/\\/g, "/")
            } else throw new Error("obj file error")
        })

        const camera = new Camera(
            new Point3D(0, 0, -5000),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            100
        )
        const rayTracer = new Raytracer(camera, 100, 100)

        const triangles = Reader.readObjFile(src)
        const objects = [
            ...triangles,
            // new Sphere(new Vector3D(0, 400, -3000), 100),
        ]

        const lightDirection = new DirectionalLight(new Vector3D(0, -0.5, -0.5))

        const matrixTransformations: MatrixTransformations[] = [
            {
                type: MatrixTransformationEnum.ROTATE,
                degrees: Math.PI / 45,
                axis: new Vector3D(0, 0, 0),
            },
            {
                type: MatrixTransformationEnum.SCALE,
                scaleVector: new Vector3D(100, 150, 100),
            },
            {
                type: MatrixTransformationEnum.TRANSLATE,
                translation: new Vector3D(1, 2, 1),
            },
        ]

        const imageData = rayTracer.trace(
            objects,
            lightDirection.vector,
            matrixTransformations
        )

        const writer = new Writer(imageData)

        // writer.write('file', __dirname + '/output.ppm');
        writer.write("console")
    } catch (error: any) {
        console.log("Error", error?.message)
    }
}

start()
