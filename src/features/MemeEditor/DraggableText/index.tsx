import { FC, useEffect, useState } from 'react';
import { Pressable, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import { Colors, Layout } from '../../../constants';
import { CanvasTextElement } from '../../../types/text';
import { styles } from './style';

interface Props {
  element: CanvasTextElement;
  onUpdate: (updates: Partial<CanvasTextElement>) => void;
  onDelete: () => void;
  onDuplicate: ({ x, y }: Pick<CanvasTextElement, 'x' | 'y'>) => void;
  isSelected?: boolean;

  selectedElement?: CanvasTextElement | null;
  onSelectElement: (element: CanvasTextElement) => void;
}

const DraggableText: FC<Props> = props => {
  const { element, onUpdate, onDelete, onDuplicate, onSelectElement } = props;

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startWidth = useSharedValue(0);
  const startHeight = useSharedValue(0);

  const translateX = useSharedValue(element.x);
  const translateY = useSharedValue(element.y);
  const boxWidth = useSharedValue(element.width);
  const boxHeight = useSharedValue(element.height);

  const [isEditing, setIsEditing] = useState(false);

  const isElementSelected = props.selectedElement?.id === element.id;

  useEffect(() => {
    translateX.value = element.x;
    translateY.value = element.y;
    boxWidth.value = element.width;
    boxHeight.value = element.height;
  }, [element]);

  useEffect(() => {
    if (!isElementSelected) {
      setIsEditing(false);
    }
  }, [isElementSelected]);

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
      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      onUpdate({
        x: translateX.value,
        y: translateY.value,
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

  return (
    <TouchableWithoutFeedback>
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[getBoxStyle(), animatedStyle]}>
          {!isElementSelected && (
            <Pressable onPress={handleSingleTap} style={styles.textContainer}>
              <Text style={styles.textDisplay}>{element.text || 'Tap to edit'}</Text>
            </Pressable>
          )}

          {isElementSelected && isEditing && (
            <TextInput
              multiline
              style={styles.textInput}
              value={element.text}
              onChangeText={text => onUpdate({ text })}
              autoFocus
              // selectTextOnFocus
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
                <Text style={styles.textDisplay}>{element.text || 'Tap to edit'}</Text>
              </Pressable>

              <GestureDetector gesture={resizeGesture}>
                <Animated.View style={styles.resizeHandle} />
              </GestureDetector>
            </>
          )}
        </Animated.View>
      </GestureDetector>
    </TouchableWithoutFeedback>
  );
};

export default DraggableText;
