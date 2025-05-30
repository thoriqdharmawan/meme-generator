import { Spacing } from '@/constants';
import { FC, useMemo } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { canvasItemStyles } from './style';

interface CanvasItemProps {
  label: string;
  onPress?: () => void;
  aspectRatio?: '1:1' | '9:16' | '4:5' | '2:3';
}

const CanvasItem: FC<CanvasItemProps> = ({ label, onPress, aspectRatio = '1:1' }) => {
  const containerStyle = useMemo(() => {
    const baseWidth = Spacing.xxl * 1.5;

    const getAspectRatioDimensions = (ratio: string) => {
      switch (ratio) {
        case '1:1':
          return { width: baseWidth, height: baseWidth };
        case '9:16':
          return { width: baseWidth, height: (baseWidth * 16) / 9 };
        case '4:5':
          return { width: baseWidth, height: (baseWidth * 5) / 4 };
        case '2:3':
          return { width: baseWidth, height: (baseWidth * 3) / 2 };
        default:
          return { width: baseWidth, height: baseWidth };
      }
    };

    const dimensions = getAspectRatioDimensions(aspectRatio);

    return [
      canvasItemStyles.canvasItemContainer,
      {
        width: dimensions.width,
        height: dimensions.height,
      },
    ];
  }, [aspectRatio]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={canvasItemStyles.container}>
        <View style={containerStyle}>
          <Text style={canvasItemStyles.canvasItemLabel}>{label}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CanvasItem;
