import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export interface CanvasPanOptions {
  screenWidth: number;
  screenHeight: number;
}

export const useCanvasPan = (options: CanvasPanOptions) => {
  const { screenWidth, screenHeight } = options;

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      const maxTranslateX = screenWidth / 2 - 50;
      const maxTranslateY = screenHeight / 2 - 50;

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
    resetPosition: () => {
      translationX.value = 0;
      translationY.value = 0;
      prevTranslationX.value = 0;
      prevTranslationY.value = 0;
    },
  };
};
