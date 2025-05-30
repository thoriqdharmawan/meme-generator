import BottomDrawer from '@/components/BottomDrawer';
import Button from '@/components/Button';
import Icon, { IconLibrary } from '@/components/Icon';
import { Colors, Typography } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { CanvasTextElement } from '@/types/editor';
import { FC } from 'react';
import { View } from 'react-native';
import { drawerFormatStyles } from './style';

interface DrawerFormatsProps {
  visible: boolean;
  onClose: () => void;
}

interface FormatItem {
  library: IconLibrary;
  name: string;
  onPress?: () => void;
  isActive?: boolean;
}

const ICON_SIZE = Typography.fontSize.xl;

const DrawerFormat: FC<DrawerFormatsProps> = ({ onClose, visible }) => {
  const { selectedElement, updateElement } = useMemeEditor();
  const {
    id,
    fontWeight,
    textDecorationUnderline,
    fontStyle,
    textDecorationLineThrough,
    textTransform,
    textAlign,
  } = selectedElement || {};

  const handleFormatPress = (updates: Partial<CanvasTextElement>) => {
    if (id) {
      updateElement(id, updates);
    }
  };

  const fontStyles: FormatItem[] = [
    {
      library: 'MaterialIcons',
      name: 'format-bold',
      onPress: () => handleFormatPress({ fontWeight: fontWeight === 'bold' ? 'normal' : 'bold' }),
      isActive: fontWeight === 'bold',
    },
    {
      library: 'MaterialIcons',
      name: 'format-italic',
      onPress: () => {
        handleFormatPress({
          fontStyle: fontStyle ? undefined : 'italic',
        });
      },
      isActive: !!fontStyle,
    },
    {
      library: 'MaterialIcons',
      name: 'format-underline',
      onPress: () => {
        handleFormatPress({
          textDecorationUnderline: textDecorationUnderline ? undefined : 'underline',
        });
      },
      isActive: !!textDecorationUnderline,
    },
    {
      library: 'MaterialIcons',
      name: 'format-strikethrough',
      onPress: () => {
        handleFormatPress({
          textDecorationLineThrough: textDecorationLineThrough ? undefined : 'line-through',
        });
      },
      isActive: !!textDecorationLineThrough,
    },
    {
      library: 'MaterialIcons',
      name: 'format-size',
      onPress: () => {
        handleFormatPress({
          textTransform: textTransform ? undefined : 'uppercase',
        });
      },
      isActive: !!textTransform,
    },
  ];

  const fontAlignments: FormatItem[] = [
    {
      library: 'MaterialIcons',
      name: 'format-align-left',
      onPress: () => handleFormatPress({ textAlign: 'left' }),
      isActive: textAlign === 'left',
    },
    {
      library: 'MaterialIcons',
      name: 'format-align-center',
      onPress: () => handleFormatPress({ textAlign: 'center' }),
      isActive: textAlign === 'center',
    },
    {
      library: 'MaterialIcons',
      name: 'format-align-right',
      onPress: () => handleFormatPress({ textAlign: 'right' }),
      isActive: textAlign === 'right',
    },
    {
      library: 'MaterialIcons',
      name: 'format-align-justify',
      onPress: () => handleFormatPress({ textAlign: 'justify' }),
      isActive: textAlign === 'justify',
    },
  ];

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={190}>
      {visible && (
        <>
          <View style={drawerFormatStyles.container}>
            {fontStyles.map((style, index) => {
              const isActive = style.isActive || false;

              return (
                <Button
                  key={index}
                  onPress={style.onPress}
                  variant='ghost'
                  style={[
                    drawerFormatStyles.formatItem,
                    isActive && drawerFormatStyles.formatItemActive,
                  ]}
                  icon={
                    <Icon
                      library={style.library}
                      name={style.name}
                      size={ICON_SIZE}
                      color={isActive ? Colors.white : Colors.black}
                    />
                  }
                />
              );
            })}
          </View>

          <View style={drawerFormatStyles.container}>
            {fontAlignments.map((alignment, index) => {
              const isActive = alignment.isActive || false;

              return (
                <Button
                  key={index}
                  onPress={alignment.onPress}
                  variant='ghost'
                  style={[
                    drawerFormatStyles.formatItem,
                    isActive && drawerFormatStyles.formatItemActive,
                  ]}
                  icon={
                    <Icon
                      library={alignment.library}
                      name={alignment.name}
                      size={ICON_SIZE}
                      color={isActive ? Colors.white : Colors.black}
                    />
                  }
                />
              );
            })}
          </View>
        </>
      )}
    </BottomDrawer>
  );
};

export default DrawerFormat;
