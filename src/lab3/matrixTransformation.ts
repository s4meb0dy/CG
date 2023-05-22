import Matrix from './../lab1/objects/matrix';
import Vector from './../lab1/objects/Vector3D';

export enum MatrixTransformationEnum {
  TRANSLATE = 'TRANSLATE',
  SCALE = 'SCALE',
  ROTATE = 'ROTATE',
}

export type MatrixTransformations =
  | {
      type: MatrixTransformationEnum.SCALE;
      scaleVector: Vector;
    }
  | {
      type: MatrixTransformationEnum.TRANSLATE;
      translation: Vector;
    }
  | {
      type: MatrixTransformationEnum.ROTATE;
      degrees: number;
      axis: Vector;
    };

export const transformationFactory = (
  transformations: MatrixTransformations[],
  vector: Vector
) => {
  return transformations.reduce((transformedVector, transformation) => {
    switch (transformation.type) {
      case MatrixTransformationEnum.SCALE:
        return Matrix.scale(transformedVector, transformation.scaleVector);
      case MatrixTransformationEnum.ROTATE:
        return Matrix.rotateAroundAxis(
          transformedVector,
          transformation.axis,
          transformation.degrees
        );
      case MatrixTransformationEnum.TRANSLATE:
        return Matrix.translate(transformedVector, transformation.translation);
      default:
        return transformedVector;
    }
  }, vector);
};