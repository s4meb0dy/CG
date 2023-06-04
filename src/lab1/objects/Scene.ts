import Reader from "../../lab3/Reader";
import { Sphere } from "./Sphere";
import Vector3D from "./Vector3D";

export default class Scene {
    static _scene1(rootPath: string) {
        const objects = Reader.readObjFile(`${rootPath}/cow.obj`);
        return objects;
    }
    static _scene2(rootPath: string) {
        const cov = Reader.readObjFile(`${rootPath}/cow.obj`);
        const sphere = new Sphere(new Vector3D(0, 400, -3000), 100);
        return [...cov, sphere];
    }

    static _scene3(rootPath: string) {
        const cov = Reader.readObjFile(`${rootPath}/cow.obj`);
        const dolphine = Reader.readObjFile(`${rootPath}/dolphine.obj`);
        return [...cov, ...dolphine];
    }

    static getScene(sceneName: string, rootPath: string) {
        if (sceneName === "cow-scene") return this._scene1(rootPath);
        else if (sceneName === "cow-sphere-scene") {
            return this._scene2(rootPath);
        } else if (sceneName === "custom-scene") {
            return this._scene3(rootPath);
        } else {
            throw new Error("The specified scene does not exist");
        }
    }
}
