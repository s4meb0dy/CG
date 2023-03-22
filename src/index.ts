import ConsoleRenderer from './ConsoleRenderer';
import Camera from './objects/Camera';
import { DirectionalLight } from './objects/Light';
import { Sphere } from './objects/Sphere';
import Vector3D from './objects/Vector3D';
import Point3D from './objects/Point3D';
import { Scene } from './types/Scene';

const camera = new Camera(
  new Point3D(0, 0, -5),
  new Vector3D(0, 0, 1),
  1,
  Math.PI / 3,
  50
);

const sphere = new Sphere(new Point3D(0, 0, 0), 1);



const directionalLight = new DirectionalLight(new Vector3D(1, 0, 0));

const mainScene: Scene = {
  camera,
  objects: [sphere],
  light: directionalLight,
};

const consoleRenderer = new ConsoleRenderer(mainScene);

consoleRenderer.render();
