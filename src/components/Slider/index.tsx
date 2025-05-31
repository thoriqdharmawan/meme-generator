import { Colors } from '@/constants';
import SliderLib from '@react-native-community/slider';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { styles } from './style';

interface SliderProps {
  value?: number;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  style?: StyleProp<ViewStyle> | undefined;
}

const Slider: FC<SliderProps> = props => {
  const { value, maximumValue, minimumValue, step, onValueChange, style } = props;

  return (
    <SliderLib
      style={[styles.container, style]}
      value={value}
      minimumValue={minimumValue ?? 0}
      maximumValue={maximumValue ?? 1}
      minimumTrackTintColor={Colors.primary}
      maximumTrackTintColor={Colors.primary}
      thumbTintColor={Colors.primary}
      onValueChange={onValueChange}
      step={step ?? 1}
    />
  );
};

export default Slider;
