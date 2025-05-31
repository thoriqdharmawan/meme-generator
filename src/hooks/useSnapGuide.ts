import { type SharedValue, useSharedValue } from 'react-native-reanimated';

export interface SnapBounds {
  canvasWidth: number;
  canvasHeight: number;
  elementWidth: number;
  elementHeight: number;
}

export interface SnapGuides {
  showSnapGuideX: boolean;
  showSnapGuideY: boolean;
  snapLineX: number;
  snapLineY: number;
}

export interface SnapResult {
  finalX: number;
  finalY: number;
  shouldSnap: boolean;
}

export interface UseSnapGuideReturn {
  showSnapGuideX: SharedValue<boolean>;
  showSnapGuideY: SharedValue<boolean>;
  snapLineX: SharedValue<number>;
  snapLineY: SharedValue<number>;

  updateSnapGuides: (
    currentX: number,
    currentY: number,
    bounds: SnapBounds,
    threshold?: number
  ) => void;
  calculateSnapPosition: (
    currentX: number,
    currentY: number,
    bounds: SnapBounds,
    threshold?: number
  ) => SnapResult;
  hideSnapGuides: () => void;
}

/**
 * Custom hook for handling snap-to-grid functionality
 * @param initialSnapThreshold - The distance threshold for snapping (default: 15 pixels)
 */
export const useSnapGuide = (initialSnapThreshold: number = 15): UseSnapGuideReturn => {
  const showSnapGuideX = useSharedValue(false);
  const showSnapGuideY = useSharedValue(false);
  const snapLineX = useSharedValue(0);
  const snapLineY = useSharedValue(0);

  const calculateSnapPositions = (bounds: SnapBounds) => {
    const { canvasWidth, canvasHeight, elementWidth, elementHeight } = bounds;

    return {
      centerX: (canvasWidth - elementWidth) / 2,
      centerY: (canvasHeight - elementHeight) / 2,
      leftEdge: 0,
      rightEdge: canvasWidth - elementWidth,
      topEdge: 0,
      bottomEdge: canvasHeight - elementHeight,
    };
  };

  const updateSnapGuides = (
    currentX: number,
    currentY: number,
    bounds: SnapBounds,
    threshold: number = initialSnapThreshold
  ) => {
    const { canvasWidth, canvasHeight } = bounds;
    const snapPositions = calculateSnapPositions(bounds);

    // Check horizontal snapping
    const nearCenterX = Math.abs(currentX - snapPositions.centerX) < threshold;
    const nearLeftEdge = Math.abs(currentX - snapPositions.leftEdge) < threshold;
    const nearRightEdge = Math.abs(currentX - snapPositions.rightEdge) < threshold;

    if (nearCenterX) {
      showSnapGuideX.value = true;
      snapLineX.value = canvasWidth / 2;
    } else if (nearLeftEdge) {
      showSnapGuideX.value = true;
      snapLineX.value = 0;
    } else if (nearRightEdge) {
      showSnapGuideX.value = true;
      snapLineX.value = canvasWidth;
    } else {
      showSnapGuideX.value = false;
    }

    // Check vertical snapping
    const nearCenterY = Math.abs(currentY - snapPositions.centerY) < threshold;
    const nearTopEdge = Math.abs(currentY - snapPositions.topEdge) < threshold;
    const nearBottomEdge = Math.abs(currentY - snapPositions.bottomEdge) < threshold;

    if (nearCenterY) {
      showSnapGuideY.value = true;
      snapLineY.value = canvasHeight / 2;
    } else if (nearTopEdge) {
      showSnapGuideY.value = true;
      snapLineY.value = 0;
    } else if (nearBottomEdge) {
      showSnapGuideY.value = true;
      snapLineY.value = canvasHeight;
    } else {
      showSnapGuideY.value = false;
    }
  };

  const calculateSnapPosition = (
    currentX: number,
    currentY: number,
    bounds: SnapBounds,
    threshold: number = initialSnapThreshold
  ): SnapResult => {
    const snapPositions = calculateSnapPositions(bounds);

    let finalX = currentX;
    let finalY = currentY;
    let shouldSnap = false;

    // Check for horizontal snapping
    if (Math.abs(currentX - snapPositions.centerX) < threshold) {
      finalX = snapPositions.centerX;
      shouldSnap = true;
    } else if (Math.abs(currentX - snapPositions.leftEdge) < threshold) {
      finalX = snapPositions.leftEdge;
      shouldSnap = true;
    } else if (Math.abs(currentX - snapPositions.rightEdge) < threshold) {
      finalX = snapPositions.rightEdge;
      shouldSnap = true;
    }

    // Check for vertical snapping
    if (Math.abs(currentY - snapPositions.centerY) < threshold) {
      finalY = snapPositions.centerY;
      shouldSnap = true;
    } else if (Math.abs(currentY - snapPositions.topEdge) < threshold) {
      finalY = snapPositions.topEdge;
      shouldSnap = true;
    } else if (Math.abs(currentY - snapPositions.bottomEdge) < threshold) {
      finalY = snapPositions.bottomEdge;
      shouldSnap = true;
    }

    return { finalX, finalY, shouldSnap };
  };

  const hideSnapGuides = () => {
    showSnapGuideX.value = false;
    showSnapGuideY.value = false;
  };

  return {
    showSnapGuideX,
    showSnapGuideY,
    snapLineX,
    snapLineY,
    updateSnapGuides,
    calculateSnapPosition,
    hideSnapGuides,
  };
};
