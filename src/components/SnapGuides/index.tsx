import { Colors, Opacity, Spacing, zIndex } from '@/constants/theme';
import { FC } from 'react';
import Animated, { type SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface SnapGuidesProps {
  showSnapGuideX: SharedValue<boolean>;
  showSnapGuideY: SharedValue<boolean>;
  snapLineX: SharedValue<number>;
  snapLineY: SharedValue<number>;
  canvasWidth: number;
  canvasHeight: number;
}

const SnapGuides: FC<SnapGuidesProps> = ({
  showSnapGuideX,
  showSnapGuideY,
  snapLineX,
  snapLineY,
  canvasWidth,
  canvasHeight,
}) => {
  const snapGuideXStyle = useAnimatedStyle(() => ({
    opacity: showSnapGuideX.value ? Opacity.high : Opacity.none,
    position: 'absolute',
    left: snapLineX.value - 0.5,
    top: 0,
    width: Spacing.tiny,
    height: canvasHeight,
    backgroundColor: Colors.snapColor,
    zIndex: zIndex.modal,
  }));

  const snapGuideYStyle = useAnimatedStyle(() => ({
    opacity: showSnapGuideY.value ? Opacity.high : Opacity.none,
    position: 'absolute',
    left: 0,
    top: snapLineY.value - 0.5,
    width: canvasWidth,
    height: Spacing.tiny,
    backgroundColor: Colors.snapColor,
    zIndex: zIndex.modal,
  }));

  return (
    <>
      <Animated.View style={snapGuideXStyle} />
      <Animated.View style={snapGuideYStyle} />
    </>
  );
};

export default SnapGuides;
