import BottomDrawer from '@/components/BottomDrawer';
import { Spacing } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { AspectRatio, CanvasElement } from '@/types/editor';
import { screenHeight, screenWidth } from '@/utils';
import { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import CanvasItem from './CanvasItem';
import { canvasDrawerStyles } from './style';

interface DrawerAddCanvasProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerAddCanvas: FC<DrawerAddCanvasProps> = ({ visible, onClose }) => {
  const { setCanvases, setSelectedCanvas } = useMemeEditor();

  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio | null>(null);

  const handleAddCanvas = (aspectRatio: AspectRatio) => {
    setSelectedAspectRatio(aspectRatio);
    const horizontalMargin = Spacing.xxl;
    const verticalMargin = Spacing.containerPadding * 10;

    const maxAvailableWidth = screenWidth - horizontalMargin;
    const maxAvailableHeight = screenHeight - verticalMargin;

    const calculateDimensions = (ratio: AspectRatio) => {
      let width: number;
      let height: number;

      switch (ratio) {
        case '1:1': {
          const squareSize = Math.min(maxAvailableWidth, maxAvailableHeight);
          width = squareSize;
          height = squareSize;
          break;
        }

        case '9:16': {
          width = maxAvailableWidth;
          height = (width * 16) / 9;

          if (height > maxAvailableHeight) {
            height = maxAvailableHeight;
            width = (height * 9) / 16;
          }
          break;
        }

        case '4:5': {
          width = maxAvailableWidth;
          height = (width * 5) / 4;

          if (height > maxAvailableHeight) {
            height = maxAvailableHeight;
            width = (height * 4) / 5;
          }
          break;
        }
        case '2:3': {
          width = maxAvailableWidth;
          height = (width * 3) / 2;

          if (height > maxAvailableHeight) {
            height = maxAvailableHeight;
            width = (height * 2) / 3;
          }
          break;
        }

        default: {
          width = maxAvailableWidth;
          height = maxAvailableWidth;
        }
      }

      return { width: Math.round(width), height: Math.round(height) };
    };

    const dimensions = calculateDimensions(aspectRatio);

    const newCanvas: CanvasElement = {
      id: `canvas-${Date.now()}`,
      width: dimensions.width,
      height: dimensions.height,
    };

    setCanvases(prev => [...prev, newCanvas]);
    setSelectedCanvas(newCanvas);
  };

  const canvases = [
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
          {canvases.map(canvas => (
            <CanvasItem
              key={canvas.aspectRatio}
              label={canvas.label}
              aspectRatio={canvas.aspectRatio as AspectRatio}
              isActive={canvas.isActive}
              onPress={canvas.onPress}
            />
          ))}
        </View>
      </ScrollView>
    </BottomDrawer>
  );
};

export default DrawerAddCanvas;
