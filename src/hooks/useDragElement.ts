import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withSpring } from 'react-native-reanimated';

export interface DragElementOptions {
  initialX: number;
  initialY: number;
  canvasWidth: number;
  canvasHeight: number;
  elementWidth: number;
  elementHeight: number;
  isElementSelected: boolean;
  onSelectElement: (element: any) => void;
  onUpdate: (updates: any) => void;
  updateSnapGuides: (x: number, y: number, bounds: any) => void;
  calculateSnapPosition: (x: number, y: number, bounds: any) => { finalX: number; finalY: number };
  hideSnapGuides: () => void;
}

export const useDragElement = (options: DragElementOptions) => {
  const {
    initialX,
    initialY,
    canvasWidth,
    canvasHeight,
    elementWidth,
    elementHeight,
    isElementSelected,
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

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate(e => {
      if (!isElementSelected) {
        onSelectElement(null);
      }

      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;

      updateSnapGuides(translateX.value, translateY.value, {
        canvasWidth,
        canvasHeight,
        elementWidth,
        elementHeight,
      });
    })
    .onEnd(() => {
      const snapResult = calculateSnapPosition(translateX.value, translateY.value, {
        canvasWidth,
        canvasHeight,
        elementWidth,
        elementHeight,
      });

      hideSnapGuides();

      translateX.value = withSpring(snapResult.finalX, { damping: 20 });
      translateY.value = withSpring(snapResult.finalY, { damping: 20 });

      onUpdate({
        x: snapResult.finalX,
        y: snapResult.finalY,
      });
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
