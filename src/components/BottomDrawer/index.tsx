import { BorderRadius, Colors, Shadows } from '@/constants';
import { deviceHeight } from '@/utils';
import React, { ReactNode, useRef } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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
  height = deviceHeight * 0.5,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingBottom: 34,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    drawer: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: BorderRadius.lg,
      borderTopRightRadius: BorderRadius.lg,
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      ...Shadows.lg,
    },
    handle: {
      alignSelf: 'center',
      backgroundColor: Colors.gray,
      borderRadius: 2,
      height: 4,
      marginTop: 8,
      width: 40,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Colors.overlay,
    },
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        slideAnim.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > height * 0.3) {
        closeDrawer();
      } else {
        openDrawer();
      }
    },
  });

  const openDrawer = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      onClose();
    });
  };

  React.useEffect(() => {
    if (visible) {
      slideAnim.setValue(height);
      overlayOpacity.setValue(0);
      requestAnimationFrame(() => {
        openDrawer();
      });
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType='none'
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: overlayOpacity,
              },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.drawer,
            {
              height,
              transform: [{ translateY: slideAnim }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.handle} />

          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomDrawer;
