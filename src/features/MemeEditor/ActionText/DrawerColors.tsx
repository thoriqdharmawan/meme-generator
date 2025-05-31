import BottomDrawer from '@/components/BottomDrawer';
import { Colors, DefaultColorOptions } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { FC } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { drawerColorStyles } from './style';

interface DrawerColorsProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerColors: FC<DrawerColorsProps> = ({ visible, onClose }) => {
  const { selectedElement, updateElement } = useMemeEditor();

  const handleChangeColor = (field: 'color' | 'backgroundColor', color: string) => {
    if (selectedElement) {
      updateElement(selectedElement.id, { [field]: color });
    }
  };

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={320}>
      <Text style={drawerColorStyles.title}>Text Color</Text>
      <View style={drawerColorStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={drawerColorStyles.colorGrid}
          horizontal
        >
          {DefaultColorOptions.map((colorOption, index) => (
            <TouchableOpacity
              key={index}
              style={[
                drawerColorStyles.colorButton,
                { backgroundColor: colorOption.color },
                colorOption.color === Colors.white && drawerColorStyles.whiteColorBorder,
              ]}
              onPress={() => handleChangeColor('color', colorOption.color)}
              activeOpacity={0.7}
            />
          ))}
        </ScrollView>
      </View>

      <Text style={drawerColorStyles.title}>Background Color</Text>
      <View style={drawerColorStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={drawerColorStyles.colorGrid}
          horizontal
        >
          <TouchableOpacity
            style={[drawerColorStyles.colorButton, drawerColorStyles.whiteColorBorder]}
            onPress={() => handleChangeColor('backgroundColor', 'transparent')}
            activeOpacity={0.7}
          >
            <Text style={drawerColorStyles.labelNone}>None</Text>
          </TouchableOpacity>
          {DefaultColorOptions.map((colorOption, index) => (
            <TouchableOpacity
              key={index}
              style={[
                drawerColorStyles.colorButton,
                { backgroundColor: colorOption.color },
                colorOption.color === Colors.white && drawerColorStyles.whiteColorBorder,
              ]}
              onPress={() => handleChangeColor('backgroundColor', colorOption.color)}
              activeOpacity={0.7}
            />
          ))}
        </ScrollView>
      </View>
    </BottomDrawer>
  );
};

export default DrawerColors;
