import { SnapGuides } from '@/components';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { Colors, Layout } from '@/constants';
import { Spacing, Typography } from '@/constants/theme';
import { useSnapGuide } from '@/hooks';
import { CanvasTextElement } from '@/types/editor';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  LayoutRectangle,
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

  const [layoutElement, setLayoutElement] = useState<LayoutRectangle | null>(null);

  const elWidth = layoutElement?.width || element.width;
  const elHeight = layoutElement?.height || Number(element.height);

  const startX = useSharedValue(element.x);
  const startY = useSharedValue(element.y);
  const startWidth = useSharedValue(element.x);
  const startHeight = useSharedValue(element.y);

  const translateX = useSharedValue(element.x);
  const translateY = useSharedValue(element.y);
  const boxWidth = useSharedValue(elWidth);
  const boxHeight = useSharedValue(elHeight);

  const angle = useSharedValue(element.rotate || 0);
  const startAngle = useSharedValue(0);

  const {
    showSnapGuideX,
    showSnapGuideY,
    snapLineX,
    snapLineY,
    updateSnapGuides,
    calculateSnapPosition,
    hideSnapGuides,
  } = useSnapGuide();

  const isElementSelected = props.selectedElement?.id === element.id;

  useEffect(() => {
    translateX.value = element.x;
    translateY.value = element.y;
    boxWidth.value = element.width;
    boxHeight.value = Number(element.height);
    angle.value = element.rotate || 0;
  }, [element, boxHeight, boxWidth, translateX, translateY, angle]);

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

      updateSnapGuides(translateX.value, translateY.value, {
        canvasWidth,
        canvasHeight,
        elementWidth: Number(elWidth),
        elementHeight: Number(elHeight),
      });
    })
    .onEnd(() => {
      const snapResult = calculateSnapPosition(translateX.value, translateY.value, {
        canvasWidth,
        canvasHeight,
        elementWidth: Number(elWidth),
        elementHeight: Number(elHeight),
      });

      hideSnapGuides();

      translateX.value = withSpring(snapResult.finalX, { damping: 20 });
      translateY.value = withSpring(snapResult.finalY, { damping: 20 });

      onUpdate({
        x: snapResult.finalX,
        y: snapResult.finalY,
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

  const rotation = Gesture.Rotation()
    .onStart(() => {
      startAngle.value = angle.value;
    })
    .onUpdate(event => {
      angle.value = startAngle.value + event.rotation;
    })
    .onEnd(() => {
      onUpdate({
        rotate: angle.value,
      });
    })
    .runOnJS(true);

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      handleSingleTap();
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${angle.value || 0}rad` },
    ],
    width: Number(boxWidth.value),
    height: Number(boxHeight.value),
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

  const combinedGesture = Gesture.Simultaneous(dragGesture, tapGesture, rotation);

  const getTextDecorationLine = (): TextStyle['textDecorationLine'] => {
    const decorations: string[] = [];

    if (element.textDecorationUnderline) {
      decorations.push('underline');
    }

    if (element.textDecorationLineThrough) {
      decorations.push('line-through');
    }

    return decorations.length > 0
      ? (decorations.join(' ') as TextStyle['textDecorationLine'])
      : 'none';
  };

  const customStyle: TextStyle = useMemo(
    () => ({
      color: element.color || Colors.black,
      fontSize: element.fontSize,
      fontWeight: element.fontWeight,
      fontStyle: element.fontStyle,
      textTransform: element.textTransform,
      textAlign: element.textAlign,
      textDecorationLine: getTextDecorationLine(),
      backgroundColor: element.backgroundColor,
    }),
    [
      element.color,
      element.fontSize,
      element.fontWeight,
      element.fontStyle,
      element.textTransform,
      element.textAlign,
      element.textDecorationUnderline,
      element.textDecorationLineThrough,
      element.backgroundColor,
    ]
  );

  const handleChangeFontsize = (action: 'increase' | 'decrease') => {
    const defaultFontSize = Typography.fontSize.lg;

    const changes = Typography.fontSize.xs / 2;

    const newFontSize =
      action === 'increase'
        ? (element.fontSize || defaultFontSize) + changes
        : (element.fontSize || defaultFontSize) - changes;

    onUpdate({ fontSize: newFontSize });
  };

  const actionButtons = [
    {
      icon: 'format-font-size-decrease',
      color: Colors.primary,
      onPress: () => handleChangeFontsize('decrease'),
    },
    {
      icon: 'format-font-size-increase',
      color: Colors.primary,
      onPress: () => handleChangeFontsize('increase'),
    },
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
              <Pressable onPress={handleSingleTap}>
                <Text style={customStyle}>{element.text || 'Tap to edit'}</Text>
              </Pressable>
            )}

            {isElementSelected && isEditing && (
              <TextInput
                multiline
                style={[styles.textInput, customStyle]}
                value={element.text}
                onChangeText={text => onUpdate({ text })}
                autoFocus
                autoComplete='off'
              />
            )}

            {isElementSelected && !isEditing && (
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
                  onPress={handleSingleTap}
                >
                  <Text style={customStyle}>{element.text || 'Tap to edit'}</Text>
                </Pressable>

                <GestureDetector gesture={resizeGesture}>
                  <Animated.View
                    style={[
                      styles.resizeHandle,
                      { top: elHeight / 2 - Layout.textBox.resizeHandleSize / 2 },
                    ]}
                  />
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
