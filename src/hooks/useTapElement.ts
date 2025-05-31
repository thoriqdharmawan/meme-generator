import { Gesture } from 'react-native-gesture-handler';

export interface TapElementOptions {
  isElementSelected: boolean;
  element: any;
  onSelectElement: (element: any) => void;
  onTapAction?: () => void;
  numberOfTaps?: number;
  maxDelayMs?: number;
}

/**
 * @param options - Configuration options for tap behavior
 * @returns Object containing tap gesture
 *
 * @example
 * ```typescript
 * const { tapGesture } = useTapElement({
 *   isElementSelected: selectedElement?.id === element.id,
 *   element: element,
 *   onSelectElement: (el) => setSelectedElement(el),
 *   onTapAction: () => setIsEditing(true),
 *   numberOfTaps: 1,
 * });
 *
 * // Use with GestureDetector
 * <GestureDetector gesture={tapGesture}>
 *   <YourTappableElement />
 * </GestureDetector>
 * ```
 */
export const useTapElement = (options: TapElementOptions) => {
  const {
    isElementSelected,
    element,
    onSelectElement,
    onTapAction,
    numberOfTaps = 1,
    maxDelayMs = 300,
  } = options;

  const handleTap = () => {
    onSelectElement(element);

    if (isElementSelected && onTapAction) {
      onTapAction();
    }
  };

  const tapGesture = Gesture.Tap()
    .numberOfTaps(numberOfTaps)
    .maxDelay(maxDelayMs)
    .onEnd(() => {
      handleTap();
    })
    .runOnJS(true);

  return {
    tapGesture,
    handleTap,
  };
};
