import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CanvasTextElement } from '../types/text';

interface MemeEditorContextType {
  elements: CanvasTextElement[];
  selectedElement: CanvasTextElement | null;

  setElements: React.Dispatch<React.SetStateAction<CanvasTextElement[]>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<CanvasTextElement | null>>;
  addElement: () => void;
  updateElement: (id: string, updates: Partial<CanvasTextElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string, position: Pick<CanvasTextElement, 'x' | 'y'>) => void;
  handleSelectElement: (element: CanvasTextElement) => void;
  handleCanvasPress: () => void;
}

const MemeEditorContext = createContext<MemeEditorContextType | undefined>(undefined);

interface MemeEditorProviderProps {
  children: ReactNode;
}

export const MemeEditorProvider: React.FC<MemeEditorProviderProps> = ({ children }) => {
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

  const value: MemeEditorContextType = {
    elements,
    selectedElement,

    setElements,
    setSelectedElement,
    addElement,
    updateElement,
    deleteElement,
    duplicateElement,
    handleSelectElement,
    handleCanvasPress,
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
