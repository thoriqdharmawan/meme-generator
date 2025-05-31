import { BottomDrawer } from '@/components';
import Slider from '@/components/Slider';
import { Typography } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { FC } from 'react';

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
    <BottomDrawer visible={visible} onClose={onClose} height={140}>
      <Slider
        value={selectedElement?.fontSize}
        onValueChange={handleChangeFontSize}
        maximumValue={Typography.fontSize.huge * 3}
        minimumValue={Typography.fontSize.xs}
      />
    </BottomDrawer>
  );
};

export default DrawerFontSize;
