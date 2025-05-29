import { Colors } from '@/constants';
import { CanvasTextElement } from '@/types/text';
import { createContext, ReactNode, useContext, useState } from 'react';

interface MemeEditorContextType {
  elements: CanvasTextElement[];
  selectedElement: CanvasTextElement | null;
  isEditing: boolean;

  setElements: React.Dispatch<React.SetStateAction<CanvasTextElement[]>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<CanvasTextElement | null>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  addElement: (element?: Partial<CanvasTextElement>) => void;
  updateElement: (id: string, updates: Partial<CanvasTextElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string, position: Pick<CanvasTextElement, 'x' | 'y'>) => void;
  handleSelectElement: (element: CanvasTextElement | null) => void;
}

const MemeEditorContext = createContext<MemeEditorContextType | undefined>(undefined);

interface MemeEditorProviderProps {
  children: ReactNode;
}

export const MemeEditorProvider: React.FC<MemeEditorProviderProps> = ({ children }) => {
  const [elements, setElements] = useState<CanvasTextElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasTextElement | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const addElement = (element?: Partial<CanvasTextElement>) => {
    const newElement: CanvasTextElement = {
      id: `${Date.now()}`,
      text: 'New Text',
      x: 50,
      y: 50,
      width: 150,
      height: 'auto',
      color: Colors.black,
      ...element,
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

  const handleSelectElement = (element: CanvasTextElement | null) => {
    setSelectedElement(element);
  };

  const value: MemeEditorContextType = {
    elements,
    selectedElement,
    isEditing,

    setElements,
    setSelectedElement,
    setIsEditing,
    addElement,
    updateElement,
    deleteElement,
    duplicateElement,
    handleSelectElement,
  };

  return <MemeEditorContext.Provider value={value}>{children}</MemeEditorContext.Provider>;
};

export const useMemeEditor = (): MemeEditorContextType => {
  const context = useContext(MemeEditorContext);
  if (context === undefined) {
    throw new Error('useMemeEditor must be used within a MemeEditorProvider');
  }
  return context;
};
