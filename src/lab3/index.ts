import Reader from "./Reader";
import Camera from "../lab1/objects/Camera";
import Vector3D from "../lab1/objects/Vector3D";
import Point3D from "../lab1/objects/Point3D";
import Raytracer from "./rayTracer";
import { DirectionalLight } from "../lab1/objects/DirectionalLight";
import {
    MatrixTransformationEnum,
    MatrixTransformations,
} from "./matrixTransformation";
import Writer from "../lab1/objects/Writer";
import { Sphere } from "../lab1/objects/Sphere";
import { prestart } from "./prestart";
import { Color } from "../lab1/objects/Color";

const start = async () => {
    try {
        const data = prestart();

        if (!data.light || !data.camera) throw new Error("Occurred some error");

        const camera = new Camera(
            new Point3D(0, 0, -5000),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            100
        );
        const rayTracer = new Raytracer(data.camera, 100, 100);

        const directionalLight = new DirectionalLight(
            new Vector3D(0, -0.5, -0.5),
            new Color(255, 255, 0),
            1
        );

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
        ];

        const viewData = rayTracer.trace(
            data.scene,
            directionalLight.direction,
            matrixTransformations
        );

        const writer = new Writer(viewData);

        switch (data.outputType) {
            case "console":
                writer.write("console");
                break;
            case "file":
                if (data.outputFormat)
                    writer.write(
                        "file",
                        __dirname + `/output.${data.outputFormat}`,
                        data.outputFormat
                    );
                break;
        }
    } catch (error: any) {
        console.log("Error:", error?.message);
    }
};

start();
