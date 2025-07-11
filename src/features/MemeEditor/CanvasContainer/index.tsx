import Button from '@/components/Button';
import Icon from '@/components/icon';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { useCanvasPan, usePinchGesture } from '@/hooks';
import { screenHeight, screenWidth } from '@/utils';
import { FC, useMemo, useState } from 'react';
import { ImageBackground, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import DrawerAddCanvas from './DrawerAddCanvas';
import DrawerUseTemplate from './DrawerUseTemplate';
import { styles } from './style';

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
  const { hasCanvas, selectedCanvas, canvases, setSelectedCanvas, updateCanvas } = useMemeEditor();

  const [drawer, setDrawer] = useState<DrawerState>(DEFAULT_DRAWER_STATE);

  const { pan, translationX, translationY } = useCanvasPan();

  const { pinch, scale } = usePinchGesture({
    selectedId: selectedCanvas?.id,
    initialScale: (selectedCanvas || canvases[0])?.scale || 1,
    minScale: 0.5,
    maxScale: Math.min(screenWidth / 100, screenHeight / 100),
    onEnd: finalScale => {
      const canvas = selectedCanvas || canvases[0];

      if (canvas) {
        updateCanvas(canvas.id, { scale: finalScale });
      }
    },
  });

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));

  const combinedGesture = Gesture.Simultaneous(pan, pinch);

  const currentCanvas = selectedCanvas || canvases[0];

  const canvasStyle = useMemo(
    () => ({
      width: currentCanvas?.width,
      height: currentCanvas?.height,
    }),
    [currentCanvas?.width, currentCanvas?.height]
  );

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
