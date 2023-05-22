import Vector from "../lab1/objects/Vector3D";
import Ray from "../lab1/objects/Ray";
import Camera from "../lab1/objects/Camera";
import Triangle from "../lab1/objects/Triangle";
import {
  MatrixTransformations,
  transformationFactory,
} from "./matrixTransformation";

export default class Raytracer {
  private camera: Camera;

  private width: number;
  private height: number;

  constructor(camera: Camera, width: number, height: number) {
    this.camera = camera;

    this.width = width;
    this.height = height;
  }

  trace(
    objects: Triangle[],
    lightDirection: Vector,
    outputFile?: string,
    rayTransformationSequence?: MatrixTransformations[]
  ): number[][] {
    const imageData: number[][] = [];

    for (let y = 0; y < this.height; y++) {
      imageData[y] = [];

      for (let x = 0; x < this.width; x++) {
        const ray = this.calculateRay(x, y, rayTransformationSequence);

        let dotProduct = 0;
        let closestIntersection: Vector | null = null;
        let closestObject = null;

        for (const object of objects) {
          const intersectionPoint = object.getIntersection(ray);
          if (
            intersectionPoint &&
            (!closestIntersection ||
              intersectionPoint.getDistanceTo(this.camera.position.toVector()) <
                closestIntersection.getDistanceTo(
                  this.camera.position.toVector()
                ))
          ) {
            closestIntersection = intersectionPoint;
            closestObject = object;
          }
        }
        if (closestIntersection) {
          if (closestObject === null) {
            imageData[y][x] = 0;
          } else {
            const normal = closestObject.getNormal(
              this.camera.position.toVector()
            );
            dotProduct = normal.dotProduct(lightDirection);
            if (dotProduct < 0) {
              imageData[y][x] = 0;
            } else {
              const shadowRay = new Ray(
                closestIntersection.toPoint3D(),
                lightDirection
              );
              const inShadow = this.isInShadow(
                shadowRay,
                objects,
                closestObject
              );
              if (inShadow) {
                imageData[y][x] = 0;
              } else {
                imageData[y][x] = dotProduct;
              }
            }
          }
        } else {
          imageData[y][x] = 0;
        }
      }
    }
    return imageData;
  }

  private calculateRay(
    x: number,
    y: number,
    transformationSequence?: MatrixTransformations[]
  ): Ray {
    const halfScreenWidth = this.width / 2;
    const halfScreenHeight = this.height / 2;
    const fov = this.camera.hResolution;
    const aspectRatio = this.width / this.height;

    const screenX = x + 0.5 - halfScreenWidth;
    const screenY = y + 0.5 - halfScreenHeight;

    const cameraX =
      (screenX / halfScreenWidth) * aspectRatio * Math.tan(fov / 2);
    const cameraY = (-screenY / halfScreenHeight) * Math.tan(fov / 2);
    const cameraZ = 1;

    const rayDirection = new Vector(-cameraX, -cameraY, cameraZ);

    if (transformationSequence) {
      const transformedRay = transformationFactory(
        transformationSequence,
        rayDirection
      );
      return new Ray(this.camera.position, transformedRay);
    }

    return new Ray(this.camera.position, rayDirection);
  }

  private isInShadow(
    shadowRay: Ray,
    objects: Triangle[],
    closestObject: Triangle
  ): boolean {
    let inShadow = false;
    for (const object of objects) {
      if (object !== closestObject && object.getIntersection(shadowRay)) {
        inShadow = true;
        break;
      }
    }
    return inShadow;
  }
}
