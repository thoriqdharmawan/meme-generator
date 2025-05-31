import BottomDrawer from '@/components/BottomDrawer';
import { Spacing } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { AspectRatio, CanvasElement } from '@/types/editor';
import { calculateCanvasDimensionsForAspectRatio } from '@/utils';
import { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import CanvasItem from './CanvasItem';
import { canvasDrawerStyles } from './style';

interface DrawerAddCanvasProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerAddCanvas: FC<DrawerAddCanvasProps> = ({ visible, onClose }) => {
  const { hasCanvas, setCanvases, setSelectedCanvas } = useMemeEditor();

  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio | null>(null);

  const handleAddCanvas = (aspectRatio: AspectRatio) => {
    setSelectedAspectRatio(aspectRatio);

    const dimensions = calculateCanvasDimensionsForAspectRatio(aspectRatio, {
      horizontalMargin: Spacing.xxl,
      verticalMargin: Spacing.containerPadding * 10,
    });

    const newCanvas: CanvasElement = {
      id: `canvas-${Date.now()}`,
      width: dimensions.width,
      height: dimensions.height,
    };

    setCanvases(() => [newCanvas]);
    setSelectedCanvas(newCanvas);
  };

  const aspectRatioOptions = [
    {
      label: '1:1',
      aspectRatio: '1:1',
      isActive: selectedAspectRatio === '1:1',
      onPress: () => handleAddCanvas('1:1'),
    },
    {
      label: '4:5',
      aspectRatio: '4:5',
      isActive: selectedAspectRatio === '4:5',
      onPress: () => handleAddCanvas('4:5'),
    },
    {
      label: '2:3',
      aspectRatio: '2:3',
      isActive: selectedAspectRatio === '2:3',
      onPress: () => handleAddCanvas('2:3'),
    },
    {
      label: '9:16',
      aspectRatio: '9:16',
      isActive: selectedAspectRatio === '9:16',
      onPress: () => handleAddCanvas('9:16'),
    },
  ];

  return (
    <BottomDrawer visible={visible} onClose={onClose} height={250}>
      <ScrollView horizontal>
        <View style={canvasDrawerStyles.container}>
          {aspectRatioOptions.map(option => (
            <CanvasItem
              key={option.aspectRatio}
              label={option.label}
              aspectRatio={option.aspectRatio as AspectRatio}
              isActive={hasCanvas && option.isActive}
              onPress={option.onPress}
            />
          ))}
        </View>
      </ScrollView>
    </BottomDrawer>
  );
};

export default DrawerAddCanvas;
