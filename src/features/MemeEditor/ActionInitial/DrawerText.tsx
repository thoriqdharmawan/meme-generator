import BottomDrawer from '@/components/BottomDrawer';
import Button from '@/components/Button';
import { Colors, Spacing, Typography } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { CanvasTextElement } from '@/types/editor';
import { screenWidth } from '@/utils';
import { FC } from 'react';
import { View } from 'react-native';
import { styleDrawer } from './style';

interface DrawerTextProps {
  visible: boolean;
  onClose: () => void;
}

type NewElementType = Pick<
  CanvasTextElement,
  'fontSize' | 'fontWeight' | 'color' | 'text' | 'width' | 'x' | 'y'
>;

interface TextVariant {
  label: string;
  elements: Partial<NewElementType>;
}

const DEFAULT_SPACING = Spacing.sectionSpacing;
const DEFAULT_WIDTH = screenWidth - DEFAULT_SPACING * 4;

const DrawerText: FC<DrawerTextProps> = ({ visible, onClose }) => {
  const { addElement } = useMemeEditor();

  const handleAddElement = (element: Partial<CanvasTextElement>) => {
    addElement(element);
    onClose();
  };

  const listTextVariants: TextVariant[] = [
    {
      label: 'Add Heading',
      elements: {
        fontSize: Typography.fontSize.huge,
        fontWeight: Typography.fontWeight.extraBold,
        color: Colors.black,
        width: DEFAULT_WIDTH,
        x: DEFAULT_SPACING,
        text: 'Add Heading',
      },
    },
    {
      label: 'Add Subheading',
      elements: {
        fontSize: Typography.fontSize.xxl,
        color: Colors.black,
        width: DEFAULT_WIDTH,
        x: DEFAULT_SPACING,
        text: 'Add Subheading',
      },
    },
    {
      label: 'Add Text',
      elements: {
        fontSize: Typography.fontSize.md,
        color: Colors.black,
        width: DEFAULT_WIDTH,
        x: DEFAULT_SPACING,
        text: 'Add Text',
      },
    },
  ];

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={280}>
      <View style={styleDrawer.wrapper}>
        {listTextVariants.map((variant, index) => (
          <Button
            key={index}
            onPress={() => handleAddElement(variant.elements)}
            title={variant.label}
            variant='outline'
            textStyle={variant.elements}
          />
        ))}
      </View>
    </BottomDrawer>
  );
};

export default DrawerText;
