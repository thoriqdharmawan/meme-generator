import { Animations } from '@/constants';
import { screenHeight } from '@/utils';
import { ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { styles } from './style';

interface BottomDrawerProps {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
  height?: number;
}

const DEFAULT_DRAWER_HEIGHT = screenHeight * 0.85;

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  visible,
  onClose,
  children,
  height = DEFAULT_DRAWER_HEIGHT,
}) => {
  const translateY = useSharedValue(height);
  const overlayOpacity = useSharedValue(0);

  const openDrawer = () => {
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 90,
    });
    overlayOpacity.value = withTiming(1, { duration: Animations.duration.normal });
  };

  const closeDrawer = () => {
    translateY.value = withTiming(height, { duration: Animations.duration.fast });
    overlayOpacity.value = withTiming(0, { duration: Animations.duration.fast }, finished => {
      if (finished) {
        runOnJS(onClose)();
      }
    });
  };

  const handleClose = () => {
    closeDrawer();
  };

  const handlePanGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      const shouldClose = event.translationY > height * 0.3 || event.velocityY > 500;

      if (shouldClose) {
        runOnJS(handleClose)();
      } else {
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 90,
        });
      }
    })
    .runOnJS(true);

  const overlayTapGesture = Gesture.Tap()
    .onEnd(() => {
      runOnJS(handleClose)();
    })
    .runOnJS(true);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (visible) {
      translateY.value = height;
      overlayOpacity.value = 0;
      requestAnimationFrame(() => {
        openDrawer();
      });
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <GestureDetector gesture={overlayTapGesture}>
        <Animated.View style={[styles.overlay, overlayAnimatedStyle]} />
      </GestureDetector>

      <Animated.View
        style={[
          styles.drawer,
          {
            height,
          },
          drawerAnimatedStyle,
        ]}
      >
        <GestureDetector gesture={handlePanGesture}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
        </GestureDetector>

        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
};

export default BottomDrawer;
