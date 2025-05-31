import { BottomDrawer } from '@/components';
import Slider from '@/components/Slider';
import { Typography } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import type { TextElement } from '@/types/editor';
import { FC } from 'react';
import { Text } from 'react-native';
import { drawerFontSizeStyles } from './style';

interface DrawerFontSizeProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerFontSize: FC<DrawerFontSizeProps> = ({ onClose, visible }) => {
  const { selectedElement, updateElement } = useMemeEditor();

  const handleChangeFontSize = (value: number) => {
    if (selectedElement) {
      updateElement(selectedElement.id, { fontSize: value });
    }
  };

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={200}>
      <Text style={drawerFontSizeStyles.title}>Font Size</Text>
      <Slider
        value={(selectedElement as TextElement)?.fontSize}
        onValueChange={handleChangeFontSize}
        maximumValue={Typography.fontSize.huge * 3}
        minimumValue={Typography.fontSize.xs}
      />
    </BottomDrawer>
  );
};

export default DrawerFontSize;
