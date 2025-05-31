import { useMemeEditor } from '@/contexts/MemeEditorContext';
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
    imageElements,
    selectedImageElement,
    updateImageElement,
    deleteImageElement,
    duplicateImageElement,
    handleSelectImageElement,
  } = useMemeEditor();

  const canvas = selectedCanvas || canvases[0];
  const canvasWidth = canvas?.width || 0;
  const canvasHeight = canvas?.height || 0;

  return (
    <>
      <CanvasContainer>
        <TouchableWithoutFeedback
          onPress={() => {
            handleSelectElement(null);
            handleSelectImageElement(null);
          }}
        >
          <View>
            {elements.map(el => (
              <DraggableText
                key={el.id}
                element={el}
                onUpdate={updates => updateElement(el.id, updates)}
                onDelete={() => deleteElement(el.id)}
                onDuplicate={position => duplicateElement(el.id, position)}
                selectedElement={selectedElement}
                onSelectElement={handleSelectElement}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
              />
            ))}
            {imageElements.map(el => (
              <DraggableImage
                key={el.id}
                element={el}
                onUpdate={updates => updateImageElement(el.id, updates)}
                onDelete={() => deleteImageElement(el.id)}
                onDuplicate={position => duplicateImageElement(el.id, position)}
                selectedImageElement={selectedImageElement}
                onSelectImageElement={handleSelectImageElement}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </CanvasContainer>

      {hasCanvas && !selectedElement && !selectedImageElement && <ActionInitial />}
      {selectedElement && !isEditing && <ActionText />}
    </>
  );
};

export default MemeEditor;
