import { CANVAS_SNAP_WIDTH } from '@/constants/templates';
import { Colors, Opacity, zIndex } from '@/constants/theme';
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
    width: CANVAS_SNAP_WIDTH,
    height: canvasHeight,
    backgroundColor: Colors.snapColor,
    zIndex: zIndex.background,
  }));

  const snapGuideYStyle = useAnimatedStyle(() => ({
    opacity: showSnapGuideY.value ? Opacity.high : Opacity.none,
    position: 'absolute',
    left: 0,
    top: snapLineY.value - 0.5,
    width: canvasWidth,
    height: CANVAS_SNAP_WIDTH,
    backgroundColor: Colors.snapColor,
    zIndex: zIndex.background,
  }));

  return (
    <>
      <Animated.View style={snapGuideXStyle} />
      <Animated.View style={snapGuideYStyle} />
    </>
  );
};

export default SnapGuides;
