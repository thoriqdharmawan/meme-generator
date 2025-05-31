import { clamp } from '@/utils';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

export interface ResizeElementOptions {
  initialWidth: number;
  initialHeight: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  maintainAspectRatio?: boolean;
  onUpdate: (updates: { width: number; height: number }) => void;
}

/**
 * Custom hook for handling element resize gestures with constraints
 *
 * @param options - Configuration options for resize behavior
 * @returns Object containing resize gesture and dimension values
 *
 * @example
 * ```typescript
 * const { resizeGesture, boxWidth, boxHeight } = useResizeElement({
 *   initialWidth: 100,
 *   initialHeight: 50,
 *   minWidth: 50,
 *   minHeight: 25,
 *   maxWidth: 300,
 *   maxHeight: 200,
 *   maintainAspectRatio: false,
 *   onUpdate: (updates) => handleElementResize(updates),
 * });
 *
 * // Use with GestureDetector on resize handle
 * <GestureDetector gesture={resizeGesture}>
 *   <Animated.View style={styles.resizeHandle} />
 * </GestureDetector>
 * ```
 */
export const useResizeElement = (options: ResizeElementOptions) => {
  const {
    initialWidth,
    initialHeight,
    minWidth = 50,
    minHeight = 25,
    maxWidth = Infinity,
    maxHeight = Infinity,
    maintainAspectRatio = false,
    onUpdate,
  } = options;

  const boxWidth = useSharedValue(initialWidth);
  const boxHeight = useSharedValue(initialHeight);

  const startWidth = useSharedValue(initialWidth);
  const startHeight = useSharedValue(initialHeight);

  const aspectRatio = initialWidth / initialHeight;

  /**
   * Calculate new dimensions with constraints applied
   */
  const calculateConstrainedDimensions = (newWidth: number, newHeight: number) => {
    let constrainedWidth = clamp(newWidth, minWidth, maxWidth);
    let constrainedHeight = clamp(newHeight, minHeight, maxHeight);

    if (maintainAspectRatio) {
      const widthBasedHeight = constrainedWidth / aspectRatio;
      const heightBasedWidth = constrainedHeight * aspectRatio;

      if (widthBasedHeight <= maxHeight && widthBasedHeight >= minHeight) {
        constrainedHeight = widthBasedHeight;
      } else {
        constrainedWidth = clamp(heightBasedWidth, minWidth, maxWidth);
      }
    }

    return { width: constrainedWidth, height: constrainedHeight };
  };

  const resizeGesture = Gesture.Pan()
    .onStart(() => {
      startWidth.value = Number(boxWidth.value);
      startHeight.value = Number(boxHeight.value);
    })
    .onUpdate(event => {
      const newWidth = startWidth.value + event.translationX;
      const newHeight = startHeight.value + event.translationY;

      const constrainedDimensions = calculateConstrainedDimensions(newWidth, newHeight);
      boxWidth.value = constrainedDimensions.width;
      boxHeight.value = constrainedDimensions.height;
    })
    .onEnd(() => {
      onUpdate({
        width: boxWidth.value,
        height: boxHeight.value,
      });
    })
    .runOnJS(true);

  /**
   * Programmatically update element dimensions
   */
  const updateDimensions = (width: number, height: number) => {
    const constrainedDimensions = calculateConstrainedDimensions(width, height);
    boxWidth.value = constrainedDimensions.width;
    boxHeight.value = constrainedDimensions.height;
  };

  const resetDimensions = () => {
    boxWidth.value = initialWidth;
    boxHeight.value = initialHeight;
  };

  return {
    resizeGesture,
    boxWidth,
    boxHeight,
    updateDimensions,
    resetDimensions,
  };
};
