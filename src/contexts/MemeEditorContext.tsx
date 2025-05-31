import { Colors } from '@/constants';
import type { CanvasElement, CanvasElementItem, ImageElement, TextElement } from '@/types/editor';
import { createContext, ReactNode, useContext, useState } from 'react';

interface MemeEditorContextType {
  hasCanvas: boolean;
  canvases: CanvasElement[];
  setCanvases: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
  selectedCanvas: CanvasElement | null;
  setSelectedCanvas: (canvas: CanvasElement | null) => void;

  elements: TextElement[];
  setElements: React.Dispatch<React.SetStateAction<TextElement[]>>;
  selectedElement: TextElement | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<TextElement | null>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;

  imageElements: ImageElement[];
  setImageElements: React.Dispatch<React.SetStateAction<ImageElement[]>>;
  selectedImageElement: ImageElement | null;
  setSelectedImageElement: React.Dispatch<React.SetStateAction<ImageElement | null>>;

  addElement: (element?: Partial<TextElement>) => void;
  updateElement: (id: string, updates: Partial<TextElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string, position: Pick<TextElement, 'x' | 'y'>) => void;
  handleSelectElement: (element: TextElement | null) => void;

  addImageElement: (element?: Partial<ImageElement>) => void;
  updateImageElement: (id: string, updates: Partial<ImageElement>) => void;
  deleteImageElement: (id: string) => void;
  duplicateImageElement: (id: string, position: Pick<ImageElement, 'x' | 'y'>) => void;
  handleSelectImageElement: (element: ImageElement | null) => void;

  onResetAll: () => void;
}

const MemeEditorContext = createContext<MemeEditorContextType | undefined>(undefined);

interface MemeEditorProviderProps {
  children: ReactNode;
}

export const MemeEditorProvider: React.FC<MemeEditorProviderProps> = ({ children }) => {
  const [canvases, setCanvases] = useState<CanvasElement[]>([]);
  const [selectedCanvas, setSelectedCanvas] = useState<CanvasElement | null>(null);

  const [elements, setElements] = useState<TextElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<TextElement | null>(null);

  const [imageElements, setImageElements] = useState<ImageElement[]>([]);
  const [selectedImageElement, setSelectedImageElement] = useState<ImageElement | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const removeSelectedCanvas = () => {
    setSelectedCanvas(null);
  };

  const removeSelectedElement = () => {
    setSelectedElement(null);
    setSelectedImageElement(null);
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
    setElements(prev => [...prev, newElement]);
  };

  const updateElement = (id: string, updates: Partial<TextElement>) => {
    removeSelectedCanvas();

    setElements(prev => {
      return prev.map(el => {
        if (el.id === id) {
          setSelectedElement({ ...el, ...updates, type: 'text' });
        }
        return el.id === id ? { ...el, ...updates, type: 'text' } : el;
      });
    });
  };

  const deleteElement = (id: string) => {
    setSelectedElement(null);
    setElements(prev => prev.filter(el => el.id !== id));
  };

  const duplicateElement = (id: string, position: Pick<CanvasElementItem, 'x' | 'y'>) => {
    removeSelectedCanvas();
    const original = elements.find(el => el.id === id);
    if (original) {
      const newCopy: CanvasElementItem = {
        ...original,
        id: `${Date.now()}-copy`,
        x: position.x,
        y: position.y,
      };

      setSelectedElement(newCopy);
      setElements(prev => [...prev, newCopy]);
    }
  };

  const handleSelectElement = (element: TextElement | null) => {
    removeSelectedCanvas();
    setSelectedElement(element);
    setSelectedImageElement(null); // Deselect image when selecting text

    // Move selected element to the end of the array (bring to front)
    if (element) {
      setElements(prev => {
        const filteredElements = prev.filter(el => el.id !== element.id);
        return [...filteredElements, element];
      });
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
    setImageElements(prev => [...prev, newImageElement]);
    setSelectedImageElement(newImageElement);
  };

  const updateImageElement = (id: string, updates: Partial<ImageElement>) => {
    removeSelectedCanvas();

    setImageElements(prev => {
      return prev.map(el => {
        if (el.id === id) {
          const updatedElement = { ...el, ...updates };
          setSelectedImageElement(updatedElement);
          return updatedElement;
        }
        return el;
      });
    });
  };

  const deleteImageElement = (id: string) => {
    setSelectedImageElement(null);
    setImageElements(prev => prev.filter(el => el.id !== id));
  };

  const duplicateImageElement = (id: string, position: Pick<CanvasElementItem, 'x' | 'y'>) => {
    removeSelectedCanvas();
    removeSelectedElement();

    const original = imageElements.find(el => el.id === id);
    if (original) {
      const newCopy: CanvasElementItem = {
        ...original,
        id: `img-${Date.now()}-copy`,
        x: position.x,
        y: position.y,
      };

      setSelectedImageElement(newCopy);
      setImageElements(prev => [...prev, newCopy]);
    }
  };

  const handleSelectImageElement = (element: ImageElement | null) => {
    removeSelectedCanvas();
    setSelectedImageElement(element);
    setSelectedElement(null); // Deselect text when selecting image

    // Move selected element to the end of the array (bring to front)
    if (element) {
      setImageElements(prev => {
        const filteredElements = prev.filter(el => el.id !== element.id);
        return [...filteredElements, element];
      });
    }
  };

  const handleSelectCanvas = (canvas: CanvasElement | null) => {
    removeSelectedElement();
    setSelectedCanvas(canvas);
  };

  const onResetAll = () => {
    setCanvases([]);
    setSelectedCanvas(null);
    setElements([]);
    setSelectedElement(null);
    setImageElements([]);
    setSelectedImageElement(null);
    setIsEditing(false);
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

    imageElements,
    setImageElements,
    selectedImageElement,
    setSelectedImageElement,

    addElement,
    updateElement,
    deleteElement,
    duplicateElement,
    handleSelectElement,

    addImageElement,
    updateImageElement,
    deleteImageElement,
    duplicateImageElement,
    handleSelectImageElement,

    onResetAll,
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
