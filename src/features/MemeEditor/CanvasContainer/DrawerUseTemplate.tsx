import { BottomDrawer, Button } from '@/components';
import { FC, useState } from 'react';
import { FlatList, Image, ImageSourcePropType, TouchableWithoutFeedback, View } from 'react-native';
import { templateStyles } from './style';

import meme1 from '../../../assets/images/meme1.jpg';
import meme2 from '../../../assets/images/meme2.jpg';
import meme3 from '../../../assets/images/meme3.jpg';

interface DrawerUseTemplateProps {
  visible: boolean;
  onClose: () => void;
}

interface TemplateItemInterface {
  id: string;
  source: ImageSourcePropType;
}

const DrawerUseTemplate: FC<DrawerUseTemplateProps> = ({ onClose, visible }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItemInterface | null>(null);

  const templates: TemplateItemInterface[] = [
    { id: '1', source: meme1 },
    { id: '2', source: meme2 },
    { id: '3', source: meme3 },
    { id: '12', source: meme1 },
    { id: '22', source: meme2 },
    { id: '32', source: meme3 },
    { id: '123', source: meme1 },
    { id: '223', source: meme2 },
    { id: '323', source: meme3 },
    { id: '1234', source: meme1 },
    { id: '2234', source: meme2 },
    { id: '3234', source: meme3 },
  ];

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      // TODO: Implement template usage logic
      onClose();
      setSelectedTemplate(null);
    }
  };

  const renderTemplateItem = ({ item }: { item: TemplateItemInterface }) => (
    <TouchableWithoutFeedback onPress={() => setSelectedTemplate(item)}>
      <View
        style={[
          templateStyles.itemContainer,
          selectedTemplate?.id === item.id && templateStyles.itemActive,
        ]}
      >
        <Image source={item.source} style={templateStyles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <BottomDrawer visible={visible} onClose={onClose}>
      <FlatList
        data={templates}
        renderItem={renderTemplateItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={templateStyles.container}
        columnWrapperStyle={templateStyles.row}
      />

      <Button
        title='Use Template'
        onPress={handleUseTemplate}
        disabled={!selectedTemplate}
        style={templateStyles.useButton}
      />
    </BottomDrawer>
  );
};

export default DrawerUseTemplate;
