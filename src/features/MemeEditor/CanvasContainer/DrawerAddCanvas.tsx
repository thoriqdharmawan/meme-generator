import BottomDrawer from '@/components/BottomDrawer';
import { FC } from 'react';
import { ScrollView, View } from 'react-native';
import CanvasItem from './CanvasItem';
import { canvasDrawerStyles } from './style';

interface DrawerAddCanvasProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerAddCanvas: FC<DrawerAddCanvasProps> = ({ visible, onClose }) => {
  return (
    <BottomDrawer visible={visible} onClose={onClose} height={220}>
      <ScrollView horizontal>
        <View style={canvasDrawerStyles.container}>
          <CanvasItem label='1:1' aspectRatio='1:1' onPress={() => console.log('1:1')} />
          <CanvasItem label='9:16' aspectRatio='9:16' onPress={() => console.log('9:16')} />
          <CanvasItem label='4:5' aspectRatio='4:5' onPress={() => console.log('4:5')} />
          <CanvasItem label='2:3' aspectRatio='2:3' onPress={() => console.log('2:3')} />
        </View>
      </ScrollView>
    </BottomDrawer>
  );
};

export default DrawerAddCanvas;
