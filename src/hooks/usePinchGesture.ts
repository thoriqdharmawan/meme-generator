import { clamp, screenHeight, screenWidth } from '@/utils';
import { useCallback, useEffect } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

export interface PinchGestureOptions {
  selectedId?: string;
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
  onStart?: () => void;
  onUpdate?: (scale: number) => void;
  onEnd?: (scale: number) => void;
}

/**
 * Custom hook for handling pinch gestures with scale constraints
 *
 * This hook provides pinch gesture functionality with configurable min/max scale limits.
 * It manages the scale state and provides smooth pinch-to-zoom functionality.
 *
 * @param options Configuration options for the pinch gesture
 * @returns Object containing pinch gesture, scale values, and reset function
 *
 * @example
 * ```typescript
 * const { pinch, scale, resetScale } = usePinchGesture({
 *   minScale: 0.5,
 *   maxScale: 3,
 *   onUpdate: (currentScale) => console.log('Scale:', currentScale)
 * });
 *
 * // Use with Animated.View
 * <GestureDetector gesture={pinch}>
 *   <Animated.View style={[{ transform: [{ scale: scale }] }]}>
 *     <YourContent />
 *   </Animated.View>
 * </GestureDetector>
 * ```
 */
export const usePinchGesture = (options: PinchGestureOptions = {}) => {
  const {
    initialScale = 1,
    minScale = 0.5,
    maxScale = Math.min(screenWidth / 100, screenHeight / 100),
    onStart,
    onUpdate,
    onEnd,
    selectedId,
  } = options;

  const scale = useSharedValue(initialScale);
  const startScale = useSharedValue(initialScale);

  useEffect(() => {
    scale.value = initialScale;
    startScale.value = initialScale;
  }, [initialScale, scale, startScale, selectedId]);

  const optimizedClamp = useCallback(clamp, []);

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
      onStart?.();
    })
    .onUpdate(event => {
      const newScale = optimizedClamp(startScale.value * event.scale, minScale, maxScale);
      scale.value = newScale;
      onUpdate?.(newScale);
    })
    .onEnd(() => {
      onEnd?.(scale.value);
    })
    .runOnJS(true);

  return {
    pinch,
    scale,
    startScale,
  };
};

export type UsePinchGestureReturn = ReturnType<typeof usePinchGesture>;
