import BottomDrawer from '@/components/BottomDrawer';
import Slider from '@/components/Slider';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { ImageElement } from '@/types/editor';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { drawerOpacityStyles } from './style';

interface DrawerOpacityProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerOpacity: FC<DrawerOpacityProps> = ({ visible, onClose }) => {
  const { selectedElement, updateElement } = useMemeEditor();

  const currentOpacity = (selectedElement as ImageElement)?.opacity || 1;

  const handleOpacityChange = (opacity: number) => {
    if (selectedElement) {
      updateElement(selectedElement.id, { opacity });
    }
  };

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={200}>
      <Text style={drawerOpacityStyles.title}>Image Opacity</Text>
      <View style={drawerOpacityStyles.sliderContainer}>
        <Text style={drawerOpacityStyles.label}>0%</Text>
        <Slider
          value={currentOpacity}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          onValueChange={handleOpacityChange}
          style={drawerOpacityStyles.slider}
        />
        <Text style={drawerOpacityStyles.label}>100%</Text>
      </View>
      <Text style={drawerOpacityStyles.valueLabel}>{Math.round(currentOpacity * 100)}%</Text>
    </BottomDrawer>
  );
};

export default DrawerOpacity;
