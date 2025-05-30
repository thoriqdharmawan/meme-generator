import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { screenHeight, screenWidth } from '@/utils';
import { FC, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import DrawerAddCanvas from './DrawerAddCanvas';
import { styles } from './style';

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

interface CanvasContainerProps {
  children?: React.ReactNode;
}

const CanvasContainer: FC<CanvasContainerProps> = ({ children }) => {
  const { hasCanvas, selectedCanvas, canvases, setSelectedCanvas } = useMemeEditor();

  const [drawerCanvas, setDrawerCanvas] = useState(false);

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

  const canvasStyle = {
    width: selectedCanvas?.width || canvases[0]?.width,
    height: selectedCanvas?.height || canvases[0]?.height,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setSelectedCanvas(null)}>
        <View style={styles.container}>
          {!hasCanvas && (
            <Button
              title='Add Canvas'
              variant='ghost'
              textStyle={styles.addCanvasLabel}
              icon={<Icon library='MaterialIcons' name='add' />}
              onPress={() => setDrawerCanvas(true)}
            />
          )}

          {hasCanvas && (
            <View>
              {selectedCanvas && (
                <GestureDetector gesture={combinedGesture}>
                  <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                    <Animated.View
                      style={[boxAnimatedStyles, styles.box, canvasStyle, styles.boxActive]}
                    >
                      {children}
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </GestureDetector>
              )}

              {!selectedCanvas && (
                <TouchableWithoutFeedback onPress={() => setSelectedCanvas(canvases[0])}>
                  <Animated.View style={[boxAnimatedStyles, styles.box, canvasStyle]}>
                    {children}
                  </Animated.View>
                </TouchableWithoutFeedback>
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <DrawerAddCanvas visible={drawerCanvas} onClose={() => setDrawerCanvas(false)} />
    </>
  );
};

export default CanvasContainer;
