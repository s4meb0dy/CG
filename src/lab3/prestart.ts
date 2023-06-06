import { PointLight } from "../lab1/PointLights";
import { AmbientLight } from "../lab1/objects/AmbientLight";
import Camera from "../lab1/objects/Camera";
import { DirectionalLight } from "../lab1/objects/DirectionalLight";
import Scene from "../lab1/objects/Scene";
import { Sphere } from "../lab1/objects/Sphere";
import Triangle from "../lab1/objects/Triangle";
import Reader from "./Reader";

interface IData {
    scene: (Triangle | Sphere)[];
    light: AmbientLight | DirectionalLight | PointLight | null;
    camera: Camera | null;
    outputType: "console" | "file";
    outputFormat: "ppm" | "bmp" | null;
}

export const prestart = () => {
    const data: IData = {
        scene: [],
        outputType: "console",
        camera: null,
        light: null,
        outputFormat: null,
    };
    const args = process.argv.slice(2);
    args.forEach((arg) => {
        if (arg.includes("--source=")) {
            const inputFile = arg.slice(9);
            const path = `${__dirname}/${inputFile}`.replace(/\\/g, "/");
            const view = Scene.getScene({ path });
            data.camera = view.camera;
            data.scene = view.objects;
            data.light = view.light;
        } else if (arg.includes("--scene=")) {
            const sceneName = arg.slice(8);
            const view = Scene.getScene({ sceneName, rootPath: __dirname });
            data.camera = view.camera;
            data.scene = view.objects;
            data.light = view.light;
        } else if (arg.includes("--output=")) {
            const outputType = arg.slice(9);
            if (outputType !== "console" && outputType !== "file")
                throw new Error("Occurred some error");

            data.outputType = outputType;
        } else if (arg.includes("--format=")) {
            const outputFormat = arg.slice(9);
            if (outputFormat === "bmp" || outputFormat === "ppm") data.outputFormat = outputFormat;
        } else throw new Error("Occurred some error");
    });

    return data;
};
