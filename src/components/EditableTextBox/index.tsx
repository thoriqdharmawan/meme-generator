import { FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { CanvasTextElement } from '../../types/text';

interface Props {
  element: CanvasTextElement;
  onUpdate: (updates: Partial<CanvasTextElement>) => void;
  onDelete: () => void;
  onDuplicate: ({ x, y }: Pick<CanvasTextElement, 'x' | 'y'>) => void;
  isSelected?: boolean;

  selectedElement?: CanvasTextElement | null;
  onSelectElement: (element: CanvasTextElement) => void;
}

const EditableTextBox: FC<Props> = props => {
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
      boxWidth.value = Math.max(60, startWidth.value + e.translationX);
      boxHeight.value = Math.max(40, startHeight.value + e.translationY);
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

  const combinedGesture = Gesture.Simultaneous(dragGesture, tapGesture);

  return (
    <TouchableWithoutFeedback>
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[getBoxStyle(), animatedStyle]}>
          {!isElementSelected && (
            <TouchableOpacity onPress={handleSingleTap} style={styles.textContainer}>
              <Text style={styles.textDisplay}>{element.text || 'Tap to edit'}</Text>
            </TouchableOpacity>
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
                <TouchableOpacity
                  onPress={() => {
                    onDuplicate({ x: translateX.value + 20, y: translateY.value + 20 });
                  }}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionText}>Duplicate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleSingleTap} style={styles.textContainer}>
                <Text style={styles.textDisplay}>{element.text || 'Tap to edit'}</Text>
              </TouchableOpacity>

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

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    marginHorizontal: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 'auto',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    flexDirection: 'row',
    height: 32,
    padding: 4,
    position: 'absolute',
    right: 0,
    top: -35,
  },
  box: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    padding: 4,
    position: 'absolute',
  },
  editableBox: {
    borderColor: 'blue',
    borderWidth: 1,
  },
  idleBox: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  resizeHandle: {
    backgroundColor: 'red',
    borderRadius: 2,
    height: 24,
    marginTop: -10,
    position: 'absolute',
    right: -4,
    top: '50%',
    width: 6,
  },
  textContainer: {
    justifyContent: 'center',
    minHeight: 30,
    padding: 4,
  },
  textDisplay: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 20,
    fontWeight: 'bold',
    minHeight: 30,
    padding: 4,
  },
});

export default EditableTextBox;
