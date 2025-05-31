import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Icon from '@/components/icon';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import DrawerOpacity from './DrawerOpacity';
import { styles } from './style';

interface VisibleState {
  drawerOpacity: boolean;
}

const DEFAULT_VISIBLE_STATE: VisibleState = {
  drawerOpacity: false,
};

const ActionImage = () => {
  const [isVisible, setIsVisible] = useState<VisibleState>(DEFAULT_VISIBLE_STATE);

  return (
    <>
      <Footer>
        <ScrollView horizontal style={styles.container}>
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='opacity' />}
            style={styles.action}
            textStyle={styles.actionText}
            title='Opacity'
            variant='ghost'
            onPress={() => setIsVisible(prev => ({ ...prev, drawerOpacity: true }))}
          />
        </ScrollView>
      </Footer>

      <DrawerOpacity
        visible={isVisible.drawerOpacity}
        onClose={() => setIsVisible(DEFAULT_VISIBLE_STATE)}
      />
    </>
  );
};

export default ActionImage;
