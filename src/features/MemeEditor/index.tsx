import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { TouchableWithoutFeedback, View } from 'react-native';
import ActionInitial from './ActionInitial';
import ActionText from './ActionText';
import CanvasContainer from './CanvasContainer';
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
  } = useMemeEditor();

  return (
    <>
      <CanvasContainer>
        <TouchableWithoutFeedback onPress={() => handleSelectElement(null)}>
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
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </CanvasContainer>

      {hasCanvas && !selectedElement && <ActionInitial />}
      {selectedElement && !isEditing && <ActionText />}
    </>
  );
};

export default MemeEditor;
