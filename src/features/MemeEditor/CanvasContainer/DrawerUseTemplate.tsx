import { BottomDrawer } from '@/components';
import { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';

interface DrawerUseTemplateProps {
  visible: boolean;
  onClose: () => void;
}
const DrawerUseTemplate: FC<DrawerUseTemplateProps> = ({ onClose, visible }) => {
  return (
    <BottomDrawer visible={visible} onClose={onClose}>
      <ScrollView horizontal>
        <View>
          <Text />
        </View>
      </ScrollView>
    </BottomDrawer>
  );
};

export default DrawerUseTemplate;
