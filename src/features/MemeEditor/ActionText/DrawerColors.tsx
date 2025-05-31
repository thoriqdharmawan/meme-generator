import BottomDrawer from '@/components/BottomDrawer';
import { Colors, DefaultTextColorOptions } from '@/constants';
import { FC } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { drawerColorStyles } from './style';

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
    <BottomDrawer visible={visible} onClose={onClose} height={140}>
      {visible && (
        <View style={drawerColorStyles.container}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={drawerColorStyles.colorGrid}
            horizontal
          >
            {DefaultTextColorOptions.map((colorOption, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  drawerColorStyles.colorButton,
                  { backgroundColor: colorOption.color },
                  colorOption.color === Colors.white && drawerColorStyles.whiteColorBorder,
                ]}
                onPress={() => handleColorPress(colorOption.color)}
                activeOpacity={0.7}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </BottomDrawer>
  );
};

export default DrawerColors;
