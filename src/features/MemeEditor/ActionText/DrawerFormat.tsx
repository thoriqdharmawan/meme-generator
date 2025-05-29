import BottomDrawer from '@/components/BottomDrawer';
import Icon, { IconLibrary } from '@/components/Icon';
import { Colors, Typography } from '@/constants';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { drawerFormatStyles } from './style';

interface DrawerFormatsProps {
  visible: boolean;
  onClose: () => void;
}

interface FormatItem {
  library: IconLibrary;
  name: string;
}

const ICON_SIZE = Typography.fontSize.xl;

const DrawerFormat: FC<DrawerFormatsProps> = ({ onClose, visible }) => {
  const fontStyles: FormatItem[] = [
    {
      library: 'MaterialIcons',
      name: 'format-bold',
    },
    {
      library: 'MaterialIcons',
      name: 'format-italic',
    },
    {
      library: 'MaterialIcons',
      name: 'format-underline',
    },
    {
      library: 'MaterialIcons',
      name: 'format-strikethrough',
    },
    {
      library: 'MaterialIcons',
      name: 'format-size',
    },
  ];

  const fontAlignments: FormatItem[] = [
    {
      library: 'MaterialIcons',
      name: 'format-align-left',
    },
    {
      library: 'MaterialIcons',
      name: 'format-align-center',
    },
    {
      library: 'MaterialIcons',
      name: 'format-align-right',
    },
    {
      library: 'MaterialIcons',
      name: 'format-align-justify',
    },
  ];

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={200}>
      {visible && (
        <>
          <Text style={drawerFormatStyles.title}>Formats</Text>

          <View style={drawerFormatStyles.container}>
            {fontStyles.map((style, index) => (
              <View key={index} style={drawerFormatStyles.formatItem}>
                <Icon
                  library={style.library}
                  name={style.name}
                  size={ICON_SIZE}
                  color={Colors.black}
                />
              </View>
            ))}
          </View>

          <View style={drawerFormatStyles.container}>
            {fontAlignments.map((alignment, index) => (
              <View key={index} style={drawerFormatStyles.formatItem}>
                <Icon
                  library={alignment.library}
                  name={alignment.name}
                  size={ICON_SIZE}
                  color={Colors.black}
                />
              </View>
            ))}
          </View>
        </>
      )}
    </BottomDrawer>
  );
};

export default DrawerFormat;
