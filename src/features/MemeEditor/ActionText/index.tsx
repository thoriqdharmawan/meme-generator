import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import DrawerColors from './DrawerColors';
import DrawerFontSize from './DrawerFontSize';
import DrawerFormat from './DrawerFormat';
import { styles } from './style';

interface VisibleState {
  drawerColors: boolean;
  drawerFormat: boolean;
  drawerFontSize: boolean;
}

const DEFAULT_VISIBLE_STATE: VisibleState = {
  drawerColors: false,
  drawerFormat: false,
  drawerFontSize: false,
};

const ActionText = () => {
  const [isVisible, setIsVisible] = useState<VisibleState>(DEFAULT_VISIBLE_STATE);

  return (
    <>
      <Footer>
        <ScrollView horizontal style={styles.container}>
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='format-color-text' />}
            style={styles.action}
            textStyle={styles.actionText}
            title='Color'
            variant='ghost'
            onPress={() => setIsVisible(prev => ({ ...prev, drawerColors: true }))}
          />
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='format-paint' />}
            style={styles.action}
            textStyle={styles.actionText}
            title='Formats'
            variant='ghost'
            onPress={() => setIsVisible(prev => ({ ...prev, drawerFormat: true }))}
          />
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='format-size' />}
            style={styles.action}
            textStyle={styles.actionText}
            title='Font Size'
            variant='ghost'
            onPress={() => setIsVisible(prev => ({ ...prev, drawerFontSize: true }))}
          />
        </ScrollView>
      </Footer>

      <DrawerColors
        visible={isVisible.drawerColors}
        onClose={() => setIsVisible(DEFAULT_VISIBLE_STATE)}
      />

      <DrawerFormat
        visible={isVisible.drawerFormat}
        onClose={() => setIsVisible(DEFAULT_VISIBLE_STATE)}
      />

      <DrawerFontSize
        visible={isVisible.drawerFontSize}
        onClose={() => setIsVisible(DEFAULT_VISIBLE_STATE)}
      />
    </>
  );
};

export default ActionText;
