import Button from '@/components/Button';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { TouchableWithoutFeedback, View } from 'react-native';
import ActionInitial from './ActionInitial';
import ActionText from './ActionText';
import DraggableText from './DraggableText';
import { styles } from './style';

const MemeEditor = () => {
  const {
    elements,
    selectedElement,
    isEditing,
    addElement,
    updateElement,
    setIsEditing,
    deleteElement,
    duplicateElement,
    handleSelectElement,
  } = useMemeEditor();

  return (
    <>
      {/* <CanvasContainer /> */}

      <TouchableWithoutFeedback onPress={() => handleSelectElement(null)}>
        <View style={styles.canvas}>
          <Button title='Add Text' onPress={() => addElement()} />
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

      {!selectedElement && <ActionInitial />}
      {selectedElement && !isEditing && <ActionText />}
    </>
  );
};

export default MemeEditor;
