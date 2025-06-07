import { SnapGuides } from '@/components';
import Button from '@/components/Button';
import Icon from '@/components/icon';
import { Colors, Layout } from '@/constants';
import { Spacing, Typography } from '@/constants/theme';
import {
  useDragElement,
  useResizeElement,
  useRotationElement,
  useSnapGuide,
  useTapElement,
} from '@/hooks';
import type { TextElement } from '@/types/editor';
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
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { styles } from './style';

interface Props {
  element: TextElement;
  onUpdate: (updates: Partial<TextElement>) => void;
  onDelete: () => void;
  onDuplicate: ({ x, y }: Pick<TextElement, 'x' | 'y'>) => void;
  isSelected?: boolean;
  isEditing: boolean;

  selectedElement?: TextElement | null;
  onSelectElement: (element: TextElement | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  canvasWidth?: number;
  canvasHeight?: number;
  canvasScale: number;
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
    canvasScale = 1,
  } = props;

  const [layoutElement, setLayoutElement] = useState<LayoutRectangle | null>(null);

  const elWidth = layoutElement?.width || element.width;
  const elHeight = layoutElement?.height || Number(element.height);

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

  const { dragGesture, translateX, translateY, updatePosition } = useDragElement({
    initialX: element.x,
    initialY: element.y,
    canvasWidth,
    canvasHeight,
    elementWidth: Number(elWidth),
    elementHeight: Number(elHeight),
    isElementSelected,
    canvasScale,
    onSelectElement,
    onUpdate,
    updateSnapGuides,
    calculateSnapPosition,
    hideSnapGuides,
  });

  const { resizeGesture, boxWidth, boxHeight } = useResizeElement({
    initialWidth: elWidth,
    initialHeight: elHeight,
    minWidth: Layout.textBox.minWidth,
    minHeight: Layout.textBox.minHeight,
    onUpdate: updates => {
      onUpdate({
        width: updates.width,
        height: updates.height,
      });
    },
  });

  const { rotationGesture, angle, updateAngle } = useRotationElement({
    initialAngle: element.rotate || 0,
    onUpdate: updates => {
      onUpdate({
        rotate: updates.rotate,
      });
    },
  });

  const { tapGesture, handleTap } = useTapElement({
    isElementSelected,
    element,
    onSelectElement,
    onTapAction: () => setIsEditing(true),
  });

  useEffect(() => {
    updatePosition(element.x, element.y);
    updateAngle(element.rotate || 0);
  }, [element]);

  useEffect(() => {
    if (!isElementSelected) {
      setIsEditing(false);
    }
  }, [isElementSelected, setIsEditing]);

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

  const combinedGesture = Gesture.Simultaneous(dragGesture, tapGesture, rotationGesture);

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
      opacity: element.opacity ?? 1,
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
      element.opacity,
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
              <Pressable onPress={handleTap}>
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
                  onPress={handleTap}
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
