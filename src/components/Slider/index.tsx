import { Colors } from '@/constants';
import SliderLib from '@react-native-community/slider';
import { FC } from 'react';
import { styles } from './style';

interface SliderProps {
  value?: number;
  minimumValue?: number;
  maximumValue?: number;
  onValueChange?: (value: number) => void;
}

const Slider: FC<SliderProps> = ({ value, maximumValue, minimumValue, onValueChange }) => {
  return (
    <SliderLib
      style={styles.container}
      value={value}
      minimumValue={minimumValue ?? 0}
      maximumValue={maximumValue ?? 1}
      minimumTrackTintColor={Colors.primary}
      maximumTrackTintColor={Colors.primary}
      thumbTintColor={Colors.primary}
      onValueChange={onValueChange}
      step={1}
    />
  );
};

export default Slider;
