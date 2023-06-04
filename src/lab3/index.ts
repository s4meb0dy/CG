import Reader from "./Reader"
import Camera from "../lab1/objects/Camera"
import Vector3D from "../lab1/objects/Vector3D"
import Point3D from "../lab1/objects/Point3D"
import Raytracer from "./rayTracer"
import { DirectionalLight } from "../lab1/objects/Light"
import {
    MatrixTransformationEnum,
    MatrixTransformations,
} from "./matrixTransformation"
import Writer from "../lab1/objects/Writer"
import { Sphere } from "../lab1/objects/Sphere"
import { prestart } from "./prestart"

const start = async () => {
    try {
        const data = prestart()
    
        if(!data.light || !data.camera) throw new Error('Occurred some error')

        const camera = new Camera(
            new Point3D(0, 0, -5000),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            100
        )
        const rayTracer = new Raytracer(data.camera, 100, 100)

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

        const viewData = rayTracer.trace(
            data.scene,
            // lightDirection.vector,
            data.light.vector,
            matrixTransformations
        )

        const writer = new Writer(viewData)
        
        switch(data.outputType){
            case 'console':
                writer.write("console")
                break 
            case 'file':
                writer.write('file', __dirname + '/output.ppm');
                break     
        }
    } catch (error: any) {
        console.log("Error:", error?.message)
    }
}

start()
