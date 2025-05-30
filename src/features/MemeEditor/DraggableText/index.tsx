import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { Colors, Layout } from '@/constants';
import { CanvasTextElement } from '@/types/editor';
import { FC, useEffect } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { styles } from './style';

// Snap configuration
const SNAP_THRESHOLD = 15; // Distance in pixels to trigger snap
// const SNAP_ZONES = {
//   CENTER_X: 'centerX',
//   CENTER_Y: 'centerY',
//   LEFT_EDGE: 'leftEdge',
//   RIGHT_EDGE: 'rightEdge',
//   TOP_EDGE: 'topEdge',
//   BOTTOM_EDGE: 'bottomEdge',
// } as const;

interface Props {
  element: CanvasTextElement;
  onUpdate: (updates: Partial<CanvasTextElement>) => void;
  onDelete: () => void;
  onDuplicate: ({ x, y }: Pick<CanvasTextElement, 'x' | 'y'>) => void;
  isSelected?: boolean;
  isEditing: boolean;

  selectedElement?: CanvasTextElement | null;
  onSelectElement: (element: CanvasTextElement | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  canvasWidth?: number;
  canvasHeight?: number;
}

const DraggableText: FC<Props> = props => {
  const {
    element,
    onUpdate,
    onDelete,
    onDuplicate,
    onSelectElement,
    isEditing,
    setIsEditing,
    canvasWidth = 0,
    canvasHeight = 0,
  } = props;

  const startX = useSharedValue(element.x);
  const startY = useSharedValue(element.y);
  const startWidth = useSharedValue(element.x);
  const startHeight = useSharedValue(element.y);

  const translateX = useSharedValue(element.x);
  const translateY = useSharedValue(element.y);
  const boxWidth = useSharedValue(element.width);
  const boxHeight = useSharedValue(element.height);

  const showSnapGuideX = useSharedValue(false);
  const showSnapGuideY = useSharedValue(false);
  const snapLineX = useSharedValue(0); // Position of vertical snap line
  const snapLineY = useSharedValue(0); // Position of horizontal snap line

  const isElementSelected = props.selectedElement?.id === element.id;

  useEffect(() => {
    translateX.value = element.x;
    translateY.value = element.y;
    boxWidth.value = element.width;
    boxHeight.value = element.height;
  }, [element, boxHeight, boxWidth, translateX, translateY]);

  useEffect(() => {
    if (!isElementSelected) {
      setIsEditing(false);
    }
  }, [isElementSelected, setIsEditing]);

  const handleSingleTap = () => {
    onSelectElement(element);

    if (isElementSelected) {
      setIsEditing(true);
    }
  };

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate(e => {
      if (!isElementSelected) {
        onSelectElement(null);
      }

      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;

      // Calculate snap positions for visual feedback
      const elementWidth = Number(element.width);
      const elementHeight = Number(element.height);

      const centerX = (canvasWidth - elementWidth) / 2;
      const centerY = (canvasHeight - elementHeight) / 2;
      const leftEdge = 0;
      const rightEdge = canvasWidth - elementWidth;
      const topEdge = 0;
      const bottomEdge = canvasHeight - elementHeight;

      // Check horizontal snapping
      const nearCenterX = Math.abs(translateX.value - centerX) < SNAP_THRESHOLD;
      const nearLeftEdge = Math.abs(translateX.value - leftEdge) < SNAP_THRESHOLD;
      const nearRightEdge = Math.abs(translateX.value - rightEdge) < SNAP_THRESHOLD;

      if (nearCenterX) {
        showSnapGuideX.value = true;
        snapLineX.value = canvasWidth / 2;
      } else if (nearLeftEdge) {
        showSnapGuideX.value = true;
        snapLineX.value = 0;
      } else if (nearRightEdge) {
        showSnapGuideX.value = true;
        snapLineX.value = canvasWidth;
      } else {
        showSnapGuideX.value = false;
      }

      // Check vertical snapping
      const nearCenterY = Math.abs(translateY.value - centerY) < SNAP_THRESHOLD;
      const nearTopEdge = Math.abs(translateY.value - topEdge) < SNAP_THRESHOLD;
      const nearBottomEdge = Math.abs(translateY.value - bottomEdge) < SNAP_THRESHOLD;

      if (nearCenterY) {
        showSnapGuideY.value = true;
        snapLineY.value = canvasHeight / 2;
      } else if (nearTopEdge) {
        showSnapGuideY.value = true;
        snapLineY.value = 0;
      } else if (nearBottomEdge) {
        showSnapGuideY.value = true;
        snapLineY.value = canvasHeight;
      } else {
        showSnapGuideY.value = false;
      }
    })
    .onEnd(() => {
      // Calculate snap positions
      const elementWidth = Number(element.width);
      const elementHeight = Number(element.height);

      const centerX = (canvasWidth - elementWidth) / 2;
      const centerY = (canvasHeight - elementHeight) / 2;
      const leftEdge = 0;
      const rightEdge = canvasWidth - elementWidth;
      const topEdge = 0;
      const bottomEdge = canvasHeight - elementHeight;

      let finalX = translateX.value;
      let finalY = translateY.value;

      // Check for horizontal snapping
      if (Math.abs(translateX.value - centerX) < SNAP_THRESHOLD) {
        finalX = centerX;
      } else if (Math.abs(translateX.value - leftEdge) < SNAP_THRESHOLD) {
        finalX = leftEdge;
      } else if (Math.abs(translateX.value - rightEdge) < SNAP_THRESHOLD) {
        finalX = rightEdge;
      }

      // Check for vertical snapping
      if (Math.abs(translateY.value - centerY) < SNAP_THRESHOLD) {
        finalY = centerY;
      } else if (Math.abs(translateY.value - topEdge) < SNAP_THRESHOLD) {
        finalY = topEdge;
      } else if (Math.abs(translateY.value - bottomEdge) < SNAP_THRESHOLD) {
        finalY = bottomEdge;
      }

      // Hide snap guides
      showSnapGuideX.value = false;
      showSnapGuideY.value = false;

      // Apply snap with smooth animation
      translateX.value = withSpring(finalX, { damping: 20 });
      translateY.value = withSpring(finalY, { damping: 20 });

      onUpdate({
        x: finalX,
        y: finalY,
      });
    })
    .runOnJS(true);

  const resizeGesture = Gesture.Pan()
    .onStart(() => {
      startWidth.value = Number(boxWidth.value);
      startHeight.value = Number(boxHeight.value);
    })
    .onUpdate(e => {
      boxWidth.value = Math.max(Layout.textBox.minWidth, startWidth.value + e.translationX);
      boxHeight.value = Math.max(Layout.textBox.minHeight, startHeight.value + e.translationY);
    })
    .onEnd(() => {
      onUpdate({
        width: boxWidth.value,
        height: boxHeight.value,
      });
    })
    .runOnJS(true);

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      handleSingleTap();
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    width: Number(boxWidth.value),
    height: Number(boxHeight.value),
  }));

  const snapGuideXStyle = useAnimatedStyle(() => ({
    opacity: showSnapGuideX.value ? 0.8 : 0,
    position: 'absolute',
    left: snapLineX.value - 0.5,
    top: 0,
    width: 1,
    height: canvasHeight,
    backgroundColor: '#FF006E',
    zIndex: 1000,
    shadowColor: '#FF006E',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  }));

  const snapGuideYStyle = useAnimatedStyle(() => ({
    opacity: showSnapGuideY.value ? 0.8 : 0,
    position: 'absolute',
    left: 0,
    top: snapLineY.value - 0.5,
    width: canvasWidth,
    height: 1,
    backgroundColor: '#FF006E',
    zIndex: 1000,
    shadowColor: '#FF006E',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  }));

  const getBoxStyle = () => {
    if (isElementSelected) {
      return [styles.box, styles.editableBox];
    }

    return [styles.box, styles.idleBox];
  };

  const handleDuplocate = () => {
    onDuplicate({ x: translateX.value + 20, y: translateY.value + 20 });
  };

  const combinedGesture = Gesture.Simultaneous(dragGesture, tapGesture);

  const customSyle: TextStyle = {
    color: element.color || Colors.black,
    fontSize: element.fontSize,
    fontWeight: element.fontWeight,
    fontStyle: element.fontStyle,
    textTransform: element.textTransform,
    textAlign: element.textAlign,
    textDecorationLine: ([element.textDecorationUnderline, element.textDecorationLineThrough]
      .filter(Boolean)
      .join(' ') || 'none') as TextStyle['textDecorationLine'],
  };

  return (
    <>
      {isElementSelected && (
        <>
          <Animated.View style={snapGuideXStyle} />
          <Animated.View style={snapGuideYStyle} />
        </>
      )}

      <TouchableWithoutFeedback>
        <GestureDetector gesture={combinedGesture}>
          <Animated.View style={[getBoxStyle(), animatedStyle]}>
            {!isElementSelected && (
              <Pressable onPress={handleSingleTap} style={styles.textContainer}>
                <Text style={[styles.textDisplay, customSyle]}>
                  {element.text || 'Tap to edit'}
                </Text>
              </Pressable>
            )}

            {isElementSelected && isEditing && (
              <TextInput
                multiline
                style={[styles.textInput, customSyle]}
                value={element.text}
                onChangeText={text => onUpdate({ text })}
                autoFocus
                autoComplete='off'
              />
            )}

            {isElementSelected && !isEditing && (
              <>
                <View style={styles.actions}>
                  <Button
                    icon={<Icon library='Feather' name='copy' size={16} color={Colors.primary} />}
                    size='small'
                    variant='ghost'
                    onPress={handleDuplocate}
                  />
                  <Button
                    icon={<Icon library='Feather' name='trash' size={16} color={Colors.error} />}
                    size='small'
                    variant='ghost'
                    onPress={onDelete}
                  />
                </View>

                <Pressable onPress={handleSingleTap} style={styles.textContainer}>
                  <Text style={[styles.textDisplay, customSyle]}>
                    {element.text || 'Tap to edit'}
                  </Text>
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

export default DraggableText;
