import { Colors } from '@/constants';
import { CanvasElement, CanvasTextElement } from '@/types/editor';
import { createContext, ReactNode, useContext, useState } from 'react';

interface MemeEditorContextType {
  hasCanvas: boolean;
  canvases: CanvasElement[];
  setCanvases: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
  selectedCanvas: CanvasElement | null;
  setSelectedCanvas: (canvas: CanvasElement | null) => void;

  elements: CanvasTextElement[];
  setElements: React.Dispatch<React.SetStateAction<CanvasTextElement[]>>;
  selectedElement: CanvasTextElement | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<CanvasTextElement | null>>;
  isEditing: boolean;
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
  const [canvases, setCanvases] = useState<CanvasElement[]>([]);
  const [selectedCanvas, setSelectedCanvas] = useState<CanvasElement | null>(null);

  const [elements, setElements] = useState<CanvasTextElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasTextElement | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const removeSelectedCanvas = () => {
    setSelectedCanvas(null);
  };

  const removeSelectedElement = () => {
    setSelectedElement(null);
  };

  const addElement = (element?: Partial<CanvasTextElement>) => {
    removeSelectedCanvas();

    const newElement: CanvasTextElement = {
      id: `${Date.now()}`,
      text: 'New Text',
      x: 50,
      y: 50,
      width: 150,
      height: 'auto',
      color: Colors.black,
      fontWeight: 'normal',
      textDecorationUnderline: undefined,
      textDecorationLineThrough: undefined,
      textAlign: 'center',
      ...element,
    };
    setElements(prev => [...prev, newElement]);
  };

  const updateElement = (id: string, updates: Partial<CanvasTextElement>) => {
    removeSelectedCanvas();

    setElements(prev => {
      return prev.map(el => {
        setSelectedElement({ ...el, ...updates });

        return el.id === id ? { ...el, ...updates } : el;
      });
    });
  };

  const deleteElement = (id: string) => {
    setSelectedElement(null);
    setElements(prev => prev.filter(el => el.id !== id));
  };

  const duplicateElement = (id: string, position: Pick<CanvasTextElement, 'x' | 'y'>) => {
    removeSelectedCanvas();
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
    removeSelectedCanvas();
    setSelectedElement(element);
  };

  const handleSelectCanvas = (canvas: CanvasElement | null) => {
    removeSelectedElement();
    setSelectedCanvas(canvas);
  };

  const value: MemeEditorContextType = {
    hasCanvas: canvases.length > 0,
    canvases,
    setCanvases,
    selectedCanvas,
    setSelectedCanvas: handleSelectCanvas,

    elements,
    setElements,
    selectedElement,
    setSelectedElement,
    isEditing,
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
