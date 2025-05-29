import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import DrawerColors from './DrawerColors';
import { styles } from './style';

const ActionText = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
            title='Warna'
            variant='ghost'
            onPress={() => setIsVisible(true)}
          />
        </ScrollView>
      </Footer>

      <DrawerColors
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        onColorSelect={handleChangeColor}
      />
    </>
  );
};

export default ActionText;
