import { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Button from '../../components/Button';
import { CanvasTextElement } from '../../types/text';
import DraggableText from './DraggableText';
import { styles } from './style';

const MemeEditor = () => {
  const [elements, setElements] = useState<CanvasTextElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasTextElement | null>(null);

  const addElement = () => {
    const newElement: CanvasTextElement = {
      id: `${Date.now()}`,
      text: 'New Text',
      x: 50,
      y: 50,
      width: 150,
      height: 'auto',
    };
    setElements(prev => [...prev, newElement]);
  };

  const updateElement = (id: string, updates: Partial<CanvasTextElement>) => {
    setElements(prev => prev.map(el => (el.id === id ? { ...el, ...updates } : el)));
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
  };

  const duplicateElement = (id: string, position: Pick<CanvasTextElement, 'x' | 'y'>) => {
    const original = elements.find(el => el.id === id);
    if (original) {
      const newCopy: CanvasTextElement = {
        ...original,
        id: `${Date.now()}-copy`,
        x: position.x,
        y: position.y,
      };

      setSelectedElement(newCopy);

      setElements(prev => [...prev, newCopy]);
    }
  };

  const handleSelectElement = (element: CanvasTextElement) => {
    setSelectedElement(element);
  };

  const handleCanvasPress = () => {
    setSelectedElement(null);
  };
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
    </>
  );
};

export default MemeEditor;
