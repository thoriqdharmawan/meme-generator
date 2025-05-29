import BottomDrawer from '@/components/BottomDrawer';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { drawerFormatStyles } from './style';

interface DrawerFormatsProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerFormat: FC<DrawerFormatsProps> = ({ onClose, visible }) => {
  return (
    <BottomDrawer visible={visible} onClose={onClose} height={120}>
      {visible && (
        <View style={drawerFormatStyles.container}>
          <Text>This is text</Text>
        </View>
      )}
    </BottomDrawer>
  );
};

export default DrawerFormat;
