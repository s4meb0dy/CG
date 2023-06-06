import Camera from '../objects/Camera';
import { DirectionalLight } from '../objects/DirectionalLight';
import { Traceable } from './Traceable';

export interface Scene {
  objects: Traceable[];
  camera: Camera;
  light: DirectionalLight;
}
