import { BottomDrawer, Button } from '@/components';
import { IMAGES } from '@/constants/templates';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import type { ImageInterface } from '@/types/editor';
import { FC, useState } from 'react';
import { FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { imageStyles } from './style';

interface DrawerImageProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerImage: FC<DrawerImageProps> = ({ onClose, visible }) => {
  const { addImageElement } = useMemeEditor();
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

  const handleAddToCanvas = () => {
    if (selectedImage) {
      addImageElement({ source: selectedImage.source });
      setSelectedImage(null);
      onClose();
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

      <Button title='Add to Canvas' onPress={handleAddToCanvas} style={imageStyles.useButton} />
    </BottomDrawer>
  );
};

export default DrawerImage;
