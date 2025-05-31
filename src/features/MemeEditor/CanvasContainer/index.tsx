import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { useCanvasPan } from '@/hooks';
import { screenHeight, screenWidth } from '@/utils';
import { FC, useState } from 'react';
import { ImageBackground, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import DrawerAddCanvas from './DrawerAddCanvas';
import DrawerUseTemplate from './DrawerUseTemplate';
import { styles } from './style';

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

interface CanvasContainerProps {
  children?: React.ReactNode;
}

interface DrawerState {
  openCreate: boolean;
  openTemplate: boolean;
}

const DEFAULT_DRAWER_STATE: DrawerState = {
  openCreate: false,
  openTemplate: false,
};

const CanvasContainer: FC<CanvasContainerProps> = ({ children }) => {
  const { hasCanvas, selectedCanvas, canvases, setSelectedCanvas } = useMemeEditor();

  const [drawer, setDrawer] = useState<DrawerState>(DEFAULT_DRAWER_STATE);

  const { pan, translationX, translationY } = useCanvasPan({
    screenWidth,
    screenHeight,
  });

  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);

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

  const currentCanvas = selectedCanvas || canvases[0];
  const hasBackgroundImage = currentCanvas?.backgroundImage;

  const renderCanvasContent = () => {
    if (hasBackgroundImage) {
      return (
        <ImageBackground
          source={currentCanvas.backgroundImage}
          style={styles.canvasBackground}
          resizeMode='cover'
        >
          {children}
        </ImageBackground>
      );
    }
    return children;
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setSelectedCanvas(null)}>
        <View style={styles.container}>
          {!hasCanvas && (
            <View style={styles.emptyCanvas}>
              <Button
                title='Crete Meme'
                variant='ghost'
                textStyle={styles.addCanvasLabel}
                icon={<Icon library='MaterialIcons' name='add' />}
                onPress={() => setDrawer(prev => ({ ...prev, openCreate: true }))}
              />
              <Text style={styles.or}>Or</Text>
              <Button
                title='Use Template'
                variant='ghost'
                textStyle={styles.addCanvasLabel}
                icon={<Icon library='MaterialIcons' name='add' />}
                onPress={() => setDrawer(prev => ({ ...prev, openTemplate: true }))}
              />
            </View>
          )}

          {hasCanvas && (
            <View>
              {selectedCanvas && (
                <GestureDetector gesture={combinedGesture}>
                  <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                    <Animated.View
                      style={[boxAnimatedStyles, styles.box, canvasStyle, styles.boxActive]}
                    >
                      {renderCanvasContent()}
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </GestureDetector>
              )}

              {!selectedCanvas && (
                <TouchableWithoutFeedback onPress={() => setSelectedCanvas(canvases[0])}>
                  <Animated.View style={[boxAnimatedStyles, styles.box, canvasStyle]}>
                    {renderCanvasContent()}
                  </Animated.View>
                </TouchableWithoutFeedback>
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      <DrawerAddCanvas
        visible={drawer.openCreate}
        onClose={() => setDrawer(DEFAULT_DRAWER_STATE)}
      />

      <DrawerUseTemplate
        visible={drawer.openTemplate}
        onClose={() => setDrawer(DEFAULT_DRAWER_STATE)}
      />
    </>
  );
};

export default CanvasContainer;
