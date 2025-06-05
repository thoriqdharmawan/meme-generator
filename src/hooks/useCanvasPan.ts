import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { clamp } from '@/utils';
import { useEffect } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

export interface CanvasPanOptions {
  windowWidth: number;
  windowHeight: number;
}

/**
 * Custom hook for handling canvas pan gestures with boundary constraints
 *
 * This hook provides pan gesture functionality for a canvas element, allowing users
 * to drag and move content while respecting screen boundaries. The pan movement
 * is constrained to prevent content from moving too far off-screen.
 *
 * @param options - Configuration options including screen dimensions
 * @returns Object containing pan gesture, translation values, and reset function
 *
 * @example
 * ```typescript
 * const { pan, translationX, translationY, resetPosition } = useCanvasPan({
 *   windowWidth: Dimensions.get('window').width,
 *   windowHeight: Dimensions.get('window').height,
 * });
 *
 * // Use with Animated.View
 * <Animated.View style={[{ transform: [{ translateX: translationX }, { translateY: translationY }] }]}>
 *   <GestureDetector gesture={pan}>
 *     <YourCanvasContent />
 *   </GestureDetector>
 * </Animated.View>
 * ```
 */
export const useCanvasPan = (options: CanvasPanOptions) => {
  const { windowWidth, windowHeight } = options;

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
      // Calculate maximum translation boundaries (50px margin from screen edges)
      const maxTranslateX = windowWidth / 2 - 50;
      const maxTranslateY = windowHeight / 2 - 50;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    })
    .runOnJS(true);

  return {
    pan,
    translationX,
    translationY,
  };
};
