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

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  visible,
  onClose,
  children,
  height = screenHeight * 0.5,
}) => {
  const translateY = useSharedValue(height);
  const overlayOpacity = useSharedValue(0);

  const openDrawer = () => {
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 90,
    });
    overlayOpacity.value = withTiming(1, { duration: 300 });
  };

  const closeDrawer = () => {
    translateY.value = withTiming(height, { duration: 250 });
    overlayOpacity.value = withTiming(0, { duration: 250 }, finished => {
      if (finished) {
        runOnJS(onClose)();
      }
    });
  };

  const handleClose = () => {
    closeDrawer();
  };

  const panGesture = Gesture.Pan()
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

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.drawer,
            {
              height,
            },
            drawerAnimatedStyle,
          ]}
        >
          <View style={styles.handle} />
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default BottomDrawer;
