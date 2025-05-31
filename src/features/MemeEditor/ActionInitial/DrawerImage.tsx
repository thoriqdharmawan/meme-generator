import { BottomDrawer, Button } from '@/components';
import { IMAGES } from '@/constants/templates';
import type { ImageInterface } from '@/types/editor';
import { FC, useState } from 'react';
import { FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { imageStyles } from './style';

interface DrawerImageProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerImage: FC<DrawerImageProps> = ({ onClose, visible }) => {
  const [selectedImage, setSelectedImage] = useState<ImageInterface | null>(null);

  const renderTemplateItem = ({ item }: { item: ImageInterface }) => (
    <TouchableWithoutFeedback onPress={() => setSelectedImage(item)}>
      <Image
        source={item.source}
        style={[imageStyles.itemContainer, selectedImage?.id === item.id && imageStyles.itemActive]}
        resizeMode='contain'
      />
    </TouchableWithoutFeedback>
  );

  const handleAddToCanvas = () => {};

  return (
    <BottomDrawer visible={visible} onClose={onClose}>
      <FlatList
        data={IMAGES}
        renderItem={renderTemplateItem}
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
