import { Dimensions, Image, ImageSourcePropType } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
        const maxAvailableWidth = screenWidth - horizontalMargin;
        const maxAvailableHeight = screenHeight - verticalMargin;

        const scaleWidth = maxAvailableWidth / imageWidth;
        const scaleHeight = maxAvailableHeight / imageHeight;
        const scale = Math.min(scaleWidth, scaleHeight);

        const canvasWidth = Math.round(imageWidth * scale);
        const canvasHeight = Math.round(imageHeight * scale);

        resolve({ width: canvasWidth, height: canvasHeight });
      },
      () => {
        const maxAvailableWidth = screenWidth - horizontalMargin;
        const maxAvailableHeight = screenHeight - verticalMargin;
        const squareSize = Math.min(maxAvailableWidth, maxAvailableHeight);

        resolve({
          width: Math.round(squareSize),
          height: Math.round(squareSize),
        });
      }
    );
  });
};

export { screenHeight, screenWidth };
