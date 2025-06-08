import { SnapGuides } from '@/components';
import Button from '@/components/Button';
import Icon from '@/components/icon';
import { Colors, Layout } from '@/constants';
import { Spacing } from '@/constants/theme';
import {
  useDragElement,
  useResizeElement,
  useRotationElement,
  useSnapGuide,
  useTapElement,
} from '@/hooks';
import type { ImageElement } from '@/types/editor';
import { FC, useEffect, useState } from 'react';
import { Image, LayoutRectangle, Pressable, TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { styles } from './style';

interface Props {
  element: ImageElement;
  onUpdate: (updates: Partial<ImageElement>) => void;
  onDelete: () => void;
  onDuplicate: ({ x, y }: Pick<ImageElement, 'x' | 'y'>) => void;
  selectedImageElement?: ImageElement | null;
  onSelectImageElement: (element: ImageElement | null) => void;
  canvasWidth?: number;
  canvasHeight?: number;
  canvasScale: number;
}

const DraggableImage: FC<Props> = props => {
  const {
    element,
    onUpdate,
    onDelete,
    onDuplicate,
    onSelectImageElement,
    canvasWidth = 0,
    canvasHeight = 0,
    canvasScale,
  } = props;

  const [layoutElement, setLayoutElement] = useState<LayoutRectangle | null>(null);

  const elWidth = layoutElement?.width || element.width;
  const elHeight = layoutElement?.height || element.height;

  const {
    showSnapGuideX,
    showSnapGuideY,
    snapLineX,
    snapLineY,
    updateSnapGuides,
    calculateSnapPosition,
    hideSnapGuides,
  } = useSnapGuide();

  const isElementSelected = props.selectedImageElement?.id === element.id;

  const { dragGesture, translateX, translateY, updatePosition } = useDragElement({
    initialX: element.x,
    initialY: element.y,
    canvasWidth,
    canvasHeight,
    elementWidth: Number(elWidth),
    elementHeight: Number(elHeight),
    isElementSelected,
    canvasScale,
    onSelectElement: onSelectImageElement,
    onUpdate,
    updateSnapGuides,
    calculateSnapPosition,
    hideSnapGuides,
  });

  const { resizeGesture, boxWidth, boxHeight } = useResizeElement({
    elementId: element.id,
    initialWidth: elWidth,
    initialHeight: Number(elHeight),
    minWidth: Layout.textBox.minWidth,
    minHeight: Layout.textBox.minHeight,
    onUpdate,
  });

  const { rotationGesture, angle, updateAngle } = useRotationElement({
    initialAngle: element.rotate || 0,
    onUpdate,
  });

  const { tapGesture, handleTap } = useTapElement({
    isElementSelected,
    element,
    onSelectElement: onSelectImageElement,
  });

  useEffect(() => {
    updatePosition(element.x, element.y);
    updateAngle(element.rotate || 0);
  }, [element]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${angle.value || 0}rad` },
    ],
    width: Number(boxWidth.value),
    height: Number(boxHeight.value),
    opacity: element.opacity ?? 1,
  }));

  const getBoxStyle = () => {
    if (isElementSelected) {
      return [styles.box, styles.editableBox];
    }

    return [styles.box, styles.idleBox];
  };

  const handleDuplicate = () => {
    onDuplicate({ x: translateX.value + Spacing.lg, y: translateY.value + Spacing.lg });
  };

  const combinedGesture = Gesture.Simultaneous(dragGesture, tapGesture, rotationGesture);

  const actionButtons = [
    {
      icon: 'content-copy',
      color: Colors.primary,
      onPress: handleDuplicate,
    },
    {
      icon: 'trash-can-outline',
      color: Colors.error,
      onPress: onDelete,
    },
  ];

  return (
    <>
      <SnapGuides
        showSnapGuideX={showSnapGuideX}
        showSnapGuideY={showSnapGuideY}
        snapLineX={snapLineX}
        snapLineY={snapLineY}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />

      <TouchableWithoutFeedback>
        <GestureDetector gesture={combinedGesture}>
          <Animated.View style={[getBoxStyle(), animatedStyle]}>
            {!isElementSelected && (
              <Pressable onPress={handleTap}>
                <Image source={element.source} style={styles.image} resizeMode='contain' />
              </Pressable>
            )}

            {isElementSelected && (
              <>
                <View style={styles.actions}>
                  {actionButtons.map((button, index) => (
                    <Button
                      key={index}
                      icon={
                        <Icon
                          library='MaterialCommunityIcons'
                          name={button.icon}
                          size={Spacing.md}
                          color={button.color}
                        />
                      }
                      size='small'
                      variant='ghost'
                      onPress={button.onPress}
                    />
                  ))}
                </View>

                <Pressable
                  onLayout={e => setLayoutElement(e.nativeEvent.layout)}
                  onPress={handleTap}
                >
                  <Image source={element.source} style={styles.image} resizeMode='contain' />
                </Pressable>

                <GestureDetector gesture={resizeGesture}>
                  <Animated.View style={styles.resizeHandle} />
                </GestureDetector>
              </>
            )}
          </Animated.View>
        </GestureDetector>
      </TouchableWithoutFeedback>
    </>
  );
};

export default DraggableImage;
