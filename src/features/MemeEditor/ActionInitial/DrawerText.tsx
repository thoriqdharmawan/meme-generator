import BottomDrawer from '@/components/BottomDrawer';
import Button from '@/components/Button';
import { Typography } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { CanvasTextElement } from '@/types/editor';
import { FC } from 'react';
import { View } from 'react-native';
import { styleDrawer } from './style';

interface DrawerTextProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerText: FC<DrawerTextProps> = ({ visible, onClose }) => {
  const { addElement } = useMemeEditor();

  const handleAddElement = (element: Partial<CanvasTextElement>) => {
    addElement(element);
    onClose();
  };

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={250}>
      <View style={styleDrawer.wrapper}>
        <Button
          onPress={() => {
            handleAddElement({
              text: 'Add Heading',
              fontSize: Typography.fontSize.huge,
              fontWeight: Typography.fontWeight.extraBold,
            });
          }}
          title='Add Heading'
          variant='outline'
        />
        <Button
          onPress={() => {
            handleAddElement({ text: 'Add Subheading', fontSize: Typography.fontSize.xxl });
          }}
          title='Add Subheading'
          variant='outline'
        />
        <Button
          onPress={() => handleAddElement({ text: 'Add Text', fontSize: Typography.fontSize.md })}
          title='Add Text'
          variant='outline'
        />
      </View>
    </BottomDrawer>
  );
};

export default DrawerText;
