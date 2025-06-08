import { CANVAS_SNAP_SCALE_FACTOR } from '@/constants/templates';
import type { CanvasElementItem } from '@/types/editor';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import type { SnapBounds, SnapResult } from './useSnapGuide';

export interface DragElementOptions<T extends CanvasElementItem = CanvasElementItem> {
  initialX: number;
  initialY: number;
  canvasWidth: number;
  canvasHeight: number;
  elementWidth: number;
  elementHeight: number;
  isElementSelected: boolean;
  canvasScale?: number; // Optional scale factor for the canvas
  onSelectElement: (element: T | null) => void;
  onUpdate: (updates: Partial<T>) => void;
  updateSnapGuides: (x: number, y: number, bounds: SnapBounds) => void;
  calculateSnapPosition: (x: number, y: number, bounds: SnapBounds) => SnapResult;
  hideSnapGuides: () => void;
}

/**
 * Custom hook for handling draggable elements with snap guides and boundaries
 *
 * This hook provides drag functionality for elements within a canvas, including:
 * - Drag gesture handling with smooth animations
 * - Snap guides for alignment assistance
 * - Boundary constraints within canvas
 * - Element selection management
 * - Spring animations for smooth position updates
 *
 * @param options - Configuration options for drag behavior
 * @returns Object containing drag gesture, translation values, and utility functions
 *
 * @example
 * ```typescript
 * const { dragGesture, translateX, translateY, updatePosition } = useDragElement({
 *   initialX: 100,
 *   initialY: 100,
 *   canvasWidth: 400,
 *   canvasHeight: 600,
 *   elementWidth: 80,
 *   elementHeight: 80,
 *   isElementSelected: true,
 *   canvasScale: 1,
 *   onSelectElement: (element) => setSelectedElement(element),
 *   onUpdate: (updates) => handleElementUpdate(updates),
 *   updateSnapGuides: (x, y, bounds) => showSnapGuides(x, y, bounds),
 *   calculateSnapPosition: (x, y, bounds) => getSnapPosition(x, y, bounds),
 *   hideSnapGuides: () => hideGuides(),
 * });
 *
 * // Use with Animated.View
 * <Animated.View style={[{ transform: [{ translateX }, { translateY }] }]}>
 *   <GestureDetector gesture={dragGesture}>
 *     <YourDraggableElement />
 *   </GestureDetector>
 * </Animated.View>
 * ```
 */
export const useDragElement = <T extends CanvasElementItem = CanvasElementItem>(
  options: DragElementOptions<T>
) => {
  const {
    initialX,
    initialY,
    canvasWidth,
    canvasHeight,
    elementWidth,
    elementHeight,
    isElementSelected,
    canvasScale = 1,
    onSelectElement,
    onUpdate,
    updateSnapGuides,
    calculateSnapPosition,
    hideSnapGuides,
  } = options;

  const startX = useSharedValue(initialX);
  const startY = useSharedValue(initialY);

  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);

  const adjustForSnapScale = (value: number) => {
    return value - (value === 0 ? 0 : CANVAS_SNAP_SCALE_FACTOR);
  };

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate(e => {
      if (!isElementSelected) {
        onSelectElement(null);
      }

      const safeCanvasScale = canvasScale ?? 1;
      translateX.value = startX.value + e.translationX / safeCanvasScale;
      translateY.value = startY.value + e.translationY / safeCanvasScale;

      updateSnapGuides(translateX.value, translateY.value, {
        canvasWidth,
        canvasHeight,
        elementWidth,
        elementHeight,
      });
    })
    .onEnd(() => {
      const { finalX, finalY } = calculateSnapPosition(translateX.value, translateY.value, {
        canvasWidth,
        canvasHeight,
        elementWidth,
        elementHeight,
      });

      hideSnapGuides();

      const finalSnapX = adjustForSnapScale(finalX);
      const finalSnapY = adjustForSnapScale(finalY);

      translateX.value = withSpring(finalSnapX, { damping: 20 });
      translateY.value = withSpring(finalSnapY, { damping: 20 });

      onUpdate({ x: finalSnapX, y: finalSnapY } as Partial<T>);
    })
    .runOnJS(true);

  return {
    dragGesture,
    translateX,
    translateY,
    updatePosition: (x: number, y: number) => {
      translateX.value = x;
      translateY.value = y;
    },
  };
};
