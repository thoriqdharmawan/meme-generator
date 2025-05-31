import { BottomDrawer, Button } from '@/components';
import { IMAGES } from '@/constants/templates';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import type { ImageInterface } from '@/types/editor';
import { FC, useState } from 'react';
import { FlatList, Image, type ImageSourcePropType, TouchableWithoutFeedback } from 'react-native';
import { imageStyles } from './style';

interface DrawerImageProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerImage: FC<DrawerImageProps> = ({ onClose, visible }) => {
  const { addImageElement, selectedCanvas, canvases } = useMemeEditor();
  const [selectedImage, setSelectedImage] = useState<ImageInterface | null>(null);

  const renderImageItem = ({ item }: { item: ImageInterface }) => (
    <TouchableWithoutFeedback onPress={() => setSelectedImage(item)}>
      <Image
        source={item.source}
        style={[imageStyles.itemContainer, selectedImage?.id === item.id && imageStyles.itemActive]}
        resizeMode='contain'
      />
    </TouchableWithoutFeedback>
  );

  const calculateImageDimensions = (
    imageSource: ImageSourcePropType,
    canvasWidth: number,
    canvasHeight: number
  ): Promise<{ width: number; height: number }> => {
    return new Promise(resolve => {
      Image.getSize(
        Image.resolveAssetSource(imageSource).uri,
        (imageWidth, imageHeight) => {
          // Calculate maximum allowed dimensions (50% of canvas size to leave some margin)
          const maxWidth = canvasWidth * 0.5;
          const maxHeight = canvasHeight * 0.5;

          const scaleWidth = maxWidth / imageWidth;
          const scaleHeight = maxHeight / imageHeight;
          const scale = Math.min(scaleWidth, scaleHeight);

          const finalWidth = Math.round(imageWidth * scale);
          const finalHeight = Math.round(imageHeight * scale);

          resolve({ width: finalWidth, height: finalHeight });
        },
        () => {
          const fallbackSize = Math.min(canvasWidth, canvasHeight) * 0.3;
          resolve({ width: fallbackSize, height: fallbackSize });
        }
      );
    });
  };

  const handleAddToCanvas = async () => {
    if (selectedImage) {
      const currentCanvas = selectedCanvas || canvases[0];
      if (!currentCanvas) {
        return;
      }

      try {
        const { width, height } = await calculateImageDimensions(
          selectedImage.source,
          currentCanvas.width,
          currentCanvas.height
        );

        addImageElement({
          source: selectedImage.source,
          width,
          height,
        });

        setSelectedImage(null);
        onClose();
      } catch (error) {
        addImageElement({ source: selectedImage.source });
        setSelectedImage(null);
        onClose();
      }
    }
  };

  return (
    <BottomDrawer visible={visible} onClose={onClose}>
      <FlatList
        data={IMAGES}
        renderItem={renderImageItem}
        keyExtractor={item => item.id}
        contentContainerStyle={imageStyles.container}
        columnWrapperStyle={imageStyles.row}
        numColumns={2}
      />

      <Button
        title='Add to Canvas'
        disabled={!selectedImage}
        onPress={handleAddToCanvas}
        style={imageStyles.useButton}
      />
    </BottomDrawer>
  );
};

export default DrawerImage;
