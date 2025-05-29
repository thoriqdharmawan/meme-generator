import BottomDrawer from '@/components/BottomDrawer';
import { Colors, DefaultTextColorOptions } from '@/constants';
import { FC } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { drawerStyles } from './style';

interface DrawerColorsProps {
  visible: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
}

const DrawerColors: FC<DrawerColorsProps> = ({ visible, onClose, onColorSelect }) => {
  const handleColorPress = (color: string) => {
    onColorSelect(color);
  };

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={120}>
      {visible && (
        <View style={drawerStyles.container}>
          <ScrollView contentContainerStyle={drawerStyles.colorGrid} horizontal>
            {DefaultTextColorOptions.map((colorOption, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  drawerStyles.colorButton,
                  { backgroundColor: colorOption.color },
                  colorOption.color === Colors.white && drawerStyles.whiteColorBorder,
                ]}
                onPress={() => handleColorPress(colorOption.color)}
                activeOpacity={0.7}
              >
                {colorOption.isDefault && <View style={drawerStyles.defaultIndicator} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </BottomDrawer>
  );
};

export default DrawerColors;
