import Reader from "../../lab3/Reader";
import Camera from "./Camera";
import { DirectionalLight } from "./Light";
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
        const lightDirection = new DirectionalLight(
            new Vector3D(0, -0.5, -0.5)
        );
        return {
            objects,
            light: lightDirection,
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
        const lightDirection = new DirectionalLight(
            new Vector3D(0, -0.5, -0.5)
        );
        return {
            objects,
            light: lightDirection,
            camera,
        };
    }
    static _scene2(rootPath: string) {
        const cov = Reader.readObjFile(`${rootPath}/cow.obj`);
        const sphere = new Sphere(new Vector3D(0, 400, -3000), 100);

        const camera = new Camera(
            new Point3D(0, 0, -5000),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            100
        );
        const lightDirection = new DirectionalLight(
            new Vector3D(0, -0.5, -0.5)
        );
        return {
            objects: [...cov, sphere],
            light: lightDirection,
            camera,
        };
    }

    static _scene3(rootPath: string) {
        const cov = Reader.readObjFile(`${rootPath}/cow.obj`);
        const dolphine = Reader.readObjFile(`${rootPath}/dolphine.obj`);

        const camera = new Camera(
            new Point3D(0, 0, -5000),
            new Vector3D(0, 0, 1),
            1,
            Math.PI / 3,
            100
        );
        const lightDirection = new DirectionalLight(
            new Vector3D(0, -0.5, -0.5)
        );
        return {
            objects: [...cov, ...dolphine],
            light: lightDirection,
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
        else if (data.sceneName === "cow-sphere-scene") {
            return this._scene2(data.rootPath);
        } else if (data.sceneName === "custom-scene") {
            return this._scene3(data.rootPath);
        } else {
            throw new Error("The specified scene does not exist");
        }
    }
}
