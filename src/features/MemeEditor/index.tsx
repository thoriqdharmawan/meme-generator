import { useMemeEditor } from '@/contexts/MemeEditorContext';
import type { ImageElement, TextElement } from '@/types/editor';
import { TouchableWithoutFeedback, View } from 'react-native';
import ActionInitial from './ActionInitial';
import ActionText from './ActionText';
import CanvasContainer from './CanvasContainer';
import DraggableImage from './DraggableImage';
import DraggableText from './DraggableText';

const MemeEditor = () => {
  const {
    hasCanvas,
    elements,
    selectedElement,
    isEditing,
    updateElement,
    setIsEditing,
    deleteElement,
    duplicateElement,
    handleSelectElement,
    selectedCanvas,
    canvases,
  } = useMemeEditor();

  const canvas = selectedCanvas || canvases[0];
  const canvasWidth = canvas?.width || 0;
  const canvasHeight = canvas?.height || 0;

  return (
    <>
      <CanvasContainer>
        <TouchableWithoutFeedback onPress={() => handleSelectElement(null)}>
          <View>
            {elements.map(el => {
              if (el.type === 'text') {
                return (
                  <DraggableText
                    key={el.id}
                    element={el}
                    onUpdate={updates => updateElement(el.id, updates)}
                    onDelete={() => deleteElement(el.id)}
                    onDuplicate={position => duplicateElement(el.id, position)}
                    selectedElement={selectedElement as TextElement}
                    onSelectElement={handleSelectElement}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                  />
                );
              }
              return (
                <DraggableImage
                  key={el.id}
                  element={el}
                  onUpdate={updates => updateElement(el.id, updates)}
                  onDelete={() => deleteElement(el.id)}
                  onDuplicate={position => duplicateElement(el.id, position)}
                  selectedImageElement={selectedElement as ImageElement}
                  onSelectImageElement={handleSelectElement}
                  canvasWidth={canvasWidth}
                  canvasHeight={canvasHeight}
                />
              );
            })}
          </View>
        </TouchableWithoutFeedback>
      </CanvasContainer>

      {hasCanvas && !selectedElement && <ActionInitial />}
      {selectedElement && !isEditing && <ActionText />}
    </>
  );
};

export default MemeEditor;
