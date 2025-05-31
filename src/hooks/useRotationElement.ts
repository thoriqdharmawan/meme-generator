import { clamp } from '@/utils';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

export interface RotationElementOptions {
  initialAngle?: number;
  minAngle?: number;
  maxAngle?: number;
  snapToAngles?: number[];
  snapThreshold?: number;
  onUpdate: (updates: { rotate: number }) => void;
}

/**
 * Custom hook for handling element rotation gestures with constraints
 *
 * This hook provides rotation functionality for elements with:
 * - Angle constraints (min/max rotation)
 * - Optional angle snapping (e.g., 15°, 30°, 45° increments)
 * - Smooth gesture handling
 * - Customizable update callbacks
 *
 * @param options - Configuration options for rotation behavior
 * @returns Object containing rotation gesture and angle value
 *
 * @example
 * ```typescript
 * const { rotationGesture, angle } = useRotationElement({
 *   initialAngle: 0,
 *   minAngle: -Math.PI, // -180 degrees
 *   maxAngle: Math.PI,  // 180 degrees
 *   snapToAngles: [0, Math.PI/4, Math.PI/2, (3*Math.PI)/4, Math.PI], // 0°, 45°, 90°, 135°, 180°
 *   snapThreshold: Math.PI / 12, // 15 degrees
 *   onUpdate: (updates) => handleElementRotation(updates),
 * });
 *
 * // Use with GestureDetector
 * <GestureDetector gesture={rotationGesture}>
 *   <Animated.View style={[{ transform: [{ rotate: `${angle.value}rad` }] }]}>
 *     <YourRotatableElement />
 *   </Animated.View>
 * </GestureDetector>
 * ```
 */
export const useRotationElement = (options: RotationElementOptions) => {
  const {
    initialAngle = 0,
    minAngle = -Infinity,
    maxAngle = Infinity,
    snapToAngles = [],
    snapThreshold = Math.PI / 24, // 7.5 degrees default
    onUpdate,
  } = options;

  const angle = useSharedValue(initialAngle);
  const startAngle = useSharedValue(0);

  const findSnapAngle = (currentAngle: number): number => {
    if (snapToAngles.length === 0) {
      return currentAngle;
    }

    const closestSnapAngle = snapToAngles.find(
      snapAngle => Math.abs(currentAngle - snapAngle) <= snapThreshold
    );

    return closestSnapAngle !== undefined ? closestSnapAngle : currentAngle;
  };

  /**
   * Normalize angle to be within -π to π range
   */
  const normalizeAngle = (angleRad: number): number => {
    let normalized = angleRad % (2 * Math.PI);
    if (normalized > Math.PI) {
      normalized -= 2 * Math.PI;
    } else if (normalized < -Math.PI) {
      normalized += 2 * Math.PI;
    }
    return normalized;
  };

  const rotationGesture = Gesture.Rotation()
    .onStart(() => {
      startAngle.value = angle.value;
    })
    .onUpdate(event => {
      let newAngle = startAngle.value + event.rotation;

      newAngle = normalizeAngle(newAngle);
      newAngle = clamp(newAngle, minAngle, maxAngle);
      newAngle = findSnapAngle(newAngle);

      angle.value = newAngle;
    })
    .onEnd(() => {
      onUpdate({
        rotate: angle.value,
      });
    })
    .runOnJS(true);

  /**
   * Programmatically update element rotation
   */
  const updateAngle = (newAngle: number) => {
    const normalizedAngle = normalizeAngle(newAngle);
    const clampedAngle = clamp(normalizedAngle, minAngle, maxAngle);
    const snappedAngle = findSnapAngle(clampedAngle);
    angle.value = snappedAngle;
  };
  const resetRotation = () => {
    angle.value = initialAngle;
  };

  const getAngleDegrees = (): number => {
    return (angle.value * 180) / Math.PI;
  };

  return {
    rotationGesture,
    angle,
    updateAngle,
    resetRotation,
    getAngleDegrees,
  };
};
