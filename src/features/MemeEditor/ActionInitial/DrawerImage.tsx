import { BottomDrawer } from '@/components';
import { FC } from 'react';
import { View } from 'react-native';

interface DrawerImageProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerImage: FC<DrawerImageProps> = ({ onClose, visible }) => {
  return (
    <BottomDrawer visible={visible} onClose={onClose} height={280}>
      <View />
    </BottomDrawer>
  );
};

export default DrawerImage;
