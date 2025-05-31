import { BottomDrawer } from '@/components';
import { FC } from 'react';
import { Text } from 'react-native';

interface DrawerFontSizeProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerFontSize: FC<DrawerFontSizeProps> = ({ onClose, visible }) => {
  return (
    <BottomDrawer visible={visible} onClose={onClose} height={190}>
      <Text />
    </BottomDrawer>
  );
};

export default DrawerFontSize;
