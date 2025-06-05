import { AspectRatio } from '@/types/editor';
import { Dimensions, Image, ImageSourcePropType } from 'react-native';

export const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export interface CanvasDimensions {
  width: number;
  height: number;
}

export interface ImageSizeCalculationOptions {
  horizontalMargin?: number;
  verticalMargin?: number;
}

/**
 * Calculates canvas dimensions based on image size and screen constraints
 * @param imageSource - The image source to calculate dimensions for
 * @param options - Configuration options for margins
 * @returns Promise that resolves to canvas dimensions
 */
export const calculateCanvasDimensions = (
  imageSource: ImageSourcePropType,
  options: ImageSizeCalculationOptions = {}
): Promise<CanvasDimensions> => {
  const { horizontalMargin = 64, verticalMargin = 200 } = options;

  return new Promise(resolve => {
    Image.getSize(
      Image.resolveAssetSource(imageSource).uri,
      (imageWidth, imageHeight) => {
        const maxAvailableWidth = windowWidth - horizontalMargin;
        const maxAvailableHeight = windowHeight - verticalMargin;

        const scaleWidth = maxAvailableWidth / imageWidth;
        const scaleHeight = maxAvailableHeight / imageHeight;
        const scale = Math.min(scaleWidth, scaleHeight);

        const canvasWidth = Math.round(imageWidth * scale);
        const canvasHeight = Math.round(imageHeight * scale);

        resolve({ width: canvasWidth, height: canvasHeight });
      },
      () => {
        const maxAvailableWidth = windowWidth - horizontalMargin;
        const maxAvailableHeight = windowHeight - verticalMargin;
        const squareSize = Math.min(maxAvailableWidth, maxAvailableHeight);

        resolve({
          width: Math.round(squareSize),
          height: Math.round(squareSize),
        });
      }
    );
  });
};

export interface AspectRatioCalculationOptions {
  horizontalMargin?: number;
  verticalMargin?: number;
}

/**
 * Calculates canvas dimensions based on aspect ratio and screen constraints
 * @param aspectRatio - The desired aspect ratio for the canvas
 * @param options - Configuration options for margins
 * @returns Canvas dimensions that fit within screen bounds
 */
export const calculateCanvasDimensionsForAspectRatio = (
  aspectRatio: AspectRatio,
  options: AspectRatioCalculationOptions = {}
): CanvasDimensions => {
  const { horizontalMargin = 64, verticalMargin = 200 } = options;

  const maxAvailableWidth = windowWidth - horizontalMargin;
  const maxAvailableHeight = windowHeight - verticalMargin;

  let width: number;
  let height: number;

  switch (aspectRatio) {
    case '1:1': {
      const squareSize = Math.min(maxAvailableWidth, maxAvailableHeight);
      width = squareSize;
      height = squareSize;
      break;
    }

    case '9:16': {
      width = maxAvailableWidth;
      height = (width * 16) / 9;

      if (height > maxAvailableHeight) {
        height = maxAvailableHeight;
        width = (height * 9) / 16;
      }
      break;
    }

    case '4:5': {
      width = maxAvailableWidth;
      height = (width * 5) / 4;

      if (height > maxAvailableHeight) {
        height = maxAvailableHeight;
        width = (height * 4) / 5;
      }
      break;
    }

    case '2:3': {
      width = maxAvailableWidth;
      height = (width * 3) / 2;

      if (height > maxAvailableHeight) {
        height = maxAvailableHeight;
        width = (height * 2) / 3;
      }
      break;
    }

    default: {
      width = maxAvailableWidth;
      height = maxAvailableWidth;
    }
  }

  return { width: Math.round(width), height: Math.round(height) };
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const getComparison = (value: number, device1: number, device2: number): number => {
  return (value * device2) / device1;
};
