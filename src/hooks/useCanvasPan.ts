import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { useEffect } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

/**
 * Custom hook for handling canvas pan gestures without boundaries
 *
 * This hook provides pan gesture functionality for a canvas element, allowing users
 * to drag and move content freely without any constraints. The pan movement
 * can extend infinitely in any direction.
 *
 * @returns Object containing pan gesture and translation values
 *
 * @example
 * ```typescript
 * const { pan, translationX, translationY } = useCanvasPan();
 *
 * // Use with Animated.View
 * <Animated.View style={[{ transform: [{ translateX: translationX }, { translateY: translationY }] }]}>
 *   <GestureDetector gesture={pan}>
 *     <YourCanvasContent />
 *   </GestureDetector>
 * </Animated.View>
 * ```
 */
export const useCanvasPan = () => {
  const { canvases } = useMemeEditor();

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  useEffect(() => {
    if (canvases.length === 0) {
      translationX.value = 0;
      translationY.value = 0;
    }
  }, [canvases]);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      translationX.value = prevTranslationX.value + event.translationX;
      translationY.value = prevTranslationY.value + event.translationY;
    })
    .runOnJS(true);

  return {
    pan,
    translationX,
    translationY,
  };
};
