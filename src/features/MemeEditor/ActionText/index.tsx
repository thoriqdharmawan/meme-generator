import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import DrawerColors from './DrawerColors';
import DrawerFormat from './DrawerFormat';
import { styles } from './style';

interface VisibleState {
  drawerColors: boolean;
  drawerFormat: boolean;
}

const DEFAULT_VISIBLE_STATE: VisibleState = {
  drawerColors: false,
  drawerFormat: false,
};

const ActionText = () => {
  const [isVisible, setIsVisible] = useState<VisibleState>(DEFAULT_VISIBLE_STATE);

  const { selectedElement, updateElement } = useMemeEditor();

  const handleChangeColor = (color: string) => {
    if (selectedElement) {
      updateElement(selectedElement.id, { color });
    }
  };

  return (
    <>
      <Footer>
        <ScrollView horizontal style={styles.container}>
          <Button
            icon={<Icon library='Ionicons' name='color-palette-outline' />}
            style={styles.action}
            textStyle={styles.actionText}
            title='Colors'
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
          />
        </ScrollView>
      </Footer>

      <DrawerColors
        visible={isVisible.drawerColors}
        onClose={() => setIsVisible(DEFAULT_VISIBLE_STATE)}
        onColorSelect={handleChangeColor}
      />

      <DrawerFormat
        visible={isVisible.drawerFormat}
        onClose={() => setIsVisible(DEFAULT_VISIBLE_STATE)}
      />
    </>
  );
};

export default ActionText;
