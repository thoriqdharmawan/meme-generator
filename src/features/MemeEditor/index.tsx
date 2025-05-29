import { TouchableWithoutFeedback, View } from 'react-native';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { useMemeEditor } from '../../contexts/MemeEditorContext';
import DraggableText from './DraggableText';
import { styles } from './style';

const MemeEditor = () => {
  const {
    elements,
    selectedElement,
    addElement,
    updateElement,
    deleteElement,
    duplicateElement,
    handleSelectElement,
    handleCanvasPress,
  } = useMemeEditor();

  return (
    <>
      {/* <CanvasContainer /> */}

      <TouchableWithoutFeedback onPress={handleCanvasPress}>
        <View style={styles.canvas}>
          <Button title='Add Text' onPress={addElement} />
          {elements.map(el => (
            <DraggableText
              key={el.id}
              element={el}
              onUpdate={updates => updateElement(el.id, updates)}
              onDelete={() => deleteElement(el.id)}
              onDuplicate={position => duplicateElement(el.id, position)}
              selectedElement={selectedElement}
              onSelectElement={handleSelectElement}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>

      <Footer />
    </>
  );
};

export default MemeEditor;
