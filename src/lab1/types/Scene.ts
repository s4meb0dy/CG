import Camera from '../objects/Camera';
import { DirectionalLight } from '../objects/Light';
import { Traceable } from './Traceable';

export interface Scene {
  objects: Traceable[];
  camera: Camera;
  light: DirectionalLight;
}
