import { Colors } from '@/constants';
import { useHistory } from '@/hooks';
import type { CanvasElement, CanvasElementItem, ImageElement, TextElement } from '@/types/editor';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface MemeEditorContextType {
  hasCanvas: boolean;
  canvases: CanvasElement[];
  setCanvases: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
  selectedCanvas: CanvasElement | null;
  setSelectedCanvas: (canvas: CanvasElement | null) => void;

  elements: CanvasElementItem[];
  setElements: React.Dispatch<React.SetStateAction<CanvasElementItem[]>>;
  selectedElement: CanvasElementItem | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<CanvasElementItem | null>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;

  addElement: (element?: Partial<TextElement>) => void;
  updateElement: (id: string, updates: Partial<CanvasElementItem>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string, position: Pick<CanvasElementItem, 'x' | 'y'>) => void;
  handleSelectElement: (element: CanvasElementItem | null) => void;

  addImageElement: (element?: Partial<ImageElement>) => void;

  onResetAll: () => void;

  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}

const MemeEditorContext = createContext<MemeEditorContextType | undefined>(undefined);

interface MemeEditorProviderProps {
  children: ReactNode;
}

export const MemeEditorProvider: React.FC<MemeEditorProviderProps> = ({ children }) => {
  const [canvases, setCanvases] = useState<CanvasElement[]>([]);
  const [selectedCanvas, setSelectedCanvas] = useState<CanvasElement | null>(null);

  const [selectedElement, setSelectedElement] = useState<CanvasElementItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    state: elements,
    canUndo,
    canRedo,
    undo,
    redo,
    set: setElementsHistory,
    reset: resetElementsHistory,
  } = useHistory<CanvasElementItem[]>([]);

  useEffect(() => {
    if (selectedElement && !elements.find(el => el.id === selectedElement.id)) {
      setSelectedElement(null);
    }
  }, [elements, selectedElement]);

  const removeSelectedCanvas = () => {
    setSelectedCanvas(null);
  };

  const removeSelectedElement = () => {
    setSelectedElement(null);
  };

  const addElement = (element?: Partial<TextElement>) => {
    removeSelectedCanvas();

    const newElement: TextElement = {
      id: `${Date.now()}`,
      type: 'text',
      text: element?.text || 'New Text',
      x: element?.x || 50,
      y: element?.y || 50,
      width: element?.width || 150,
      height: 'auto',
      color: Colors.black,
      fontWeight: 'normal',
      textDecorationUnderline: undefined,
      textDecorationLineThrough: undefined,
      textAlign: 'center',
      ...element,
    };

    const newElements = [...elements, newElement];
    setElementsHistory(newElements);
  };

  const updateElement = (id: string, updates: Partial<CanvasElementItem>) => {
    removeSelectedCanvas();

    const newElements = elements.map((el: CanvasElementItem) => {
      if (el.id === id) {
        const updatedElement = { ...el, ...updates } as CanvasElementItem;
        setSelectedElement(updatedElement);
        return updatedElement;
      }
      return el;
    });

    setElementsHistory(newElements);
  };

  const deleteElement = (id: string) => {
    setSelectedElement(null);
    const newElements = elements.filter((el: CanvasElementItem) => el.id !== id);
    setElementsHistory(newElements);
  };

  const duplicateElement = (id: string, position: Pick<CanvasElementItem, 'x' | 'y'>) => {
    removeSelectedCanvas();
    const original = elements.find((el: CanvasElementItem) => el.id === id);
    if (original) {
      const newCopy: CanvasElementItem = {
        ...original,
        id: `${Date.now()}-copy`,
        x: position.x,
        y: position.y,
      };

      setSelectedElement(newCopy);
      const newElements = [...elements, newCopy];
      setElementsHistory(newElements);
    }
  };

  const handleSelectElement = (element: CanvasElementItem | null) => {
    removeSelectedCanvas();
    setSelectedElement(element);

    // Move selected element to the end of the array (bring to front)
    if (element) {
      const filteredElements = elements.filter((el: CanvasElementItem) => el.id !== element.id);
      const newElements = [...filteredElements, element];
      setElementsHistory(newElements);
    }
  };

  const addImageElement = (element?: Partial<ImageElement>) => {
    removeSelectedCanvas();
    removeSelectedElement();

    const newImageElement: ImageElement = {
      id: `img-${Date.now()}`,
      type: 'image',
      source: element?.source || { uri: '' },
      x: element?.x || 50,
      y: element?.y || 50,
      width: element?.width || 150,
      height: element?.height || 150,
      rotate: element?.rotate || 0,
      opacity: element?.opacity || 1,
      ...element,
    };

    const newElements = [...elements, newImageElement];
    setElementsHistory(newElements);
    setSelectedElement(newImageElement);
  };

  const handleSelectCanvas = (canvas: CanvasElement | null) => {
    removeSelectedElement();
    setSelectedCanvas(canvas);
  };

  const onResetAll = () => {
    setCanvases([]);
    setSelectedCanvas(null);
    resetElementsHistory([]);
    setSelectedElement(null);
    setIsEditing(false);
  };

  const setElements: React.Dispatch<React.SetStateAction<CanvasElementItem[]>> = value => {
    if (typeof value === 'function') {
      const newElements = value(elements);
      setElementsHistory(newElements);
    } else {
      setElementsHistory(value);
    }
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

    addImageElement,

    onResetAll,

    canUndo,
    canRedo,
    undo,
    redo,
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
