import Reader from "../../lab3/Reader";
import { PointLight } from "../PointLights";
import { AmbientLight } from "./AmbientLight";
import Camera from "./Camera";
import { Color } from "./Color";
import { DirectionalLight } from "./DirectionalLight";
import Point3D from "./Point3D";
import { Sphere } from "./Sphere";
import Vector3D from "./Vector3D";

export default class Scene {
    static _defaultScene(path: string) {
        const objects = Reader.readObjFile(path);

        const camera = new Camera(
            new Point3D(0, 0, -5000),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            100
        );
        const directionalLight = new DirectionalLight(new Vector3D(0, -0.5, -0.5), new Color(255, 255, 0), 1);
        return {
            objects,
            light: directionalLight,
            camera,
        };
    }

    static _scene1(rootPath: string) {
        const objects = Reader.readObjFile(`${rootPath}/cow.obj`);

        const camera = new Camera(
            new Point3D(0, 0, -5000),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            100
        );
        const pointLight = new PointLight(new Vector3D(0, -0.5, -0.5), new Color(255, 255, 255), 1.0);
        return {
            objects,
            light: pointLight,
            camera,
        };
    }
    static _scene2(rootPath: string) {
        const rooster = Reader.readObjFile(`${rootPath}/rooster.obj`);
        const sphere = new Sphere(new Vector3D(400, -650, 600), 100);


        const camera = new Camera(
            new Point3D(0, 0, -1600),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            100
        );
        const directionalLight = new DirectionalLight(new Vector3D(0, -0.5, -0.5), new Color(255, 255, 0), 1);
        return {
            objects: [...rooster,sphere],
            light: directionalLight,
            camera,
        };
    }

    static _scene3(rootPath: string) {
        const sphere = new Sphere(new Vector3D(0, -500, -1500), 400);

        const camera = new Camera(
            new Point3D(0, 0, -5000),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            100
        );
        const ambientLight = new AmbientLight(new Color(255, 255, 255), 0.8);
        return {
            objects: [sphere],
            light: ambientLight,
            camera,
        };
    }

    static getScene(data: {
        sceneName?: string;
        rootPath?: string;
        path?: string;
    }) {
        if (data.path) return this._defaultScene(data.path);

        if (!data.rootPath) throw new Error("Occurred some error");

        if (data.sceneName === "cow-scene") return this._scene1(data.rootPath);
        else if (data.sceneName === "rooster-sphere-scene") {
            return this._scene2(data.rootPath);
        } else if (data.sceneName === "sphere-scene") {
            return this._scene3(data.rootPath);
        } else {
            throw new Error("The specified scene does not exist");
        }
    }
}
