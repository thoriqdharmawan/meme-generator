import { BottomDrawer, Button } from '@/components';
import { MEME_TEMPLATES, type MemeTemplate } from '@/constants';
import { PROPORTIONAL_HEIGHT, PROPORTIONAL_WIDTH } from '@/constants/templates';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import type { CanvasElement, TextElement } from '@/types/editor';
import { calculateCanvasDimensions, convertXCoordinate, screenHeight, screenWidth } from '@/utils';
import { FC, useState } from 'react';
import { FlatList, Image, TouchableWithoutFeedback, View } from 'react-native';
import { templateStyles } from './style';

interface DrawerUseTemplateProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerUseTemplate: FC<DrawerUseTemplateProps> = ({ onClose, visible }) => {
  const { setCanvases, setSelectedCanvas, setElements } = useMemeEditor();
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);

  const handleUseTemplate = async () => {
    if (selectedTemplate) {
      try {
        const dimensions = await calculateCanvasDimensions(selectedTemplate.source);

        const newCanvas: CanvasElement = {
          id: `canvas-template-${Date.now()}`,
          width: dimensions.width,
          height: dimensions.height,
          backgroundImage: selectedTemplate.source,
        };

        setCanvases(prev => [...prev, newCanvas]);
        setSelectedCanvas(newCanvas);
        setElements(() => {
          return (
            (selectedTemplate.elemets?.map(element => ({
              ...element,
              x: convertXCoordinate(element.x, PROPORTIONAL_WIDTH, screenWidth),
              y: convertXCoordinate(element.y, PROPORTIONAL_HEIGHT, screenHeight),
            })) as TextElement[]) || []
          );
        });

        setSelectedTemplate(null);
        onClose();
      } catch (error) {
        setSelectedTemplate(null);
        onClose();
      }
    }
  };

  const renderTemplateItem = ({ item }: { item: MemeTemplate }) => (
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
        data={MEME_TEMPLATES}
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
