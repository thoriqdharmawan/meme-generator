import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { screenHeight, screenWidth } from '@/utils';
import { FC } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { styles } from './style';

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

interface CanvasContainerProps {
  children?: React.ReactNode;
}

const CanvasContainer: FC<CanvasContainerProps> = ({ children }) => {
  const { hasCanvas, selectedCanvas } = useMemeEditor();

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);

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

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate(event => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.5,
        Math.min(screenWidth / 100, screenHeight / 100)
      );
    })
    .runOnJS(true);

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));

  const combinedGesture = Gesture.Simultaneous(pan, pinch);

  return (
    <View style={styles.container}>
      {!hasCanvas && (
        <Button
          title='Add Canvas'
          variant='ghost'
          textStyle={styles.addCanvasLabel}
          icon={<Icon library='MaterialIcons' name='add' />}
        />
      )}

      {hasCanvas && (
        <View>
          {selectedCanvas && (
            <GestureDetector gesture={combinedGesture}>
              <Animated.View style={[boxAnimatedStyles, styles.box]}>{children}</Animated.View>
            </GestureDetector>
          )}

          {!selectedCanvas && <View style={styles.box}>{children}</View>}
        </View>
      )}
    </View>
  );
};

export default CanvasContainer;
