import Reader from "./Reader";
import Camera from "../lab1/objects/Camera";
import Vector3D from "../lab1/objects/Vector3D";
import Point3D from "../lab1/objects/Point3D";
import Raytracer from "./rayTracer";
import Triangle from "../lab1/objects/Triangle";
import { MatrixTransformationEnum, MatrixTransformations, transformationFactory } from "./matrixTransformation";
import WriterToConsole from "../lab1/objects/WriterToConsole";

const start = async () => {
  let src = "";

  try {
    const args = process.argv.slice(2);
    args.forEach((arg) => {
      if (arg.includes("--source=")) {
        const inputFile = arg.slice(9);

        src = `${__dirname}/${inputFile}`.replace(/\\/g, "/");

        
        // console.log(triangles)
      } else throw new Error("obj file error");
    });

    const triangles = Reader.readObjFile(src);

    const camera = new Camera(
        new Point3D(0, 0, -5),
        new Vector3D(0, 0, 1),
        1,
        Math.PI / 3,
        100
      );
      const rayTracer = new Raytracer(camera, 100, 100);

      const objects = [
        new Triangle(
          new Vector3D(0, -150, 10),
          new Vector3D(150, 150, 10),
          new Vector3D(-150, 150, 10)
        ),
      ];

    const lightDirection = new Vector3D(-0.5, -0.5, -1).normalize();

    const matrixTransformations: MatrixTransformations[] = [
        {
          type: MatrixTransformationEnum.ROTATE,
          degrees: Math.PI / 45,
          axis: new Vector3D(0, 0, 1),
        },
        {
          type: MatrixTransformationEnum.SCALE,
          scaleVector: new Vector3D(1, 1, 1.1),
        },
        {
          type: MatrixTransformationEnum.TRANSLATE,
          translation: new Vector3D(-0.5, 0.5, -1),
        },
      ];

      const imageData = rayTracer.trace(triangles, lightDirection);
      
      const writer = new WriterToConsole(imageData)

      writer.write();

  } catch (error: any) {
    console.log("Error", error?.message);
  }
};

start();
