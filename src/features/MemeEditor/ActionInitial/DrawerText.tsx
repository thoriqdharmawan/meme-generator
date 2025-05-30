import BottomDrawer from '@/components/BottomDrawer';
import Button from '@/components/Button';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-gesture-handler';

interface DrawerTextProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerText: FC<DrawerTextProps> = ({ visible, onClose }) => {
  const { addElement } = useMemeEditor();

  const handleAddElement = (text: string) => {
    addElement({ text });
    onClose();
  };

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={350}>
      {visible && (
        <>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Text Options</Text>

          <View style={{ gap: 12 }}>
            <Button
              onPress={() => handleAddElement('Add Heading')}
              title='Add Heading'
              variant='ghost'
            />
            <Button
              onPress={() => handleAddElement('Add Subheading')}
              title='Add Subheading'
              variant='ghost'
            />
            <Button onPress={() => handleAddElement('Add Text')} title='Add Text' variant='ghost' />
          </View>
        </>
      )}
    </BottomDrawer>
  );
};

export default DrawerText;
