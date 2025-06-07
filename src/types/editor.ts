import { ImageSourcePropType, TextStyle } from 'react-native';

export interface CanvasElement {
  id: string;
  width: number;
  height: number;
  backgroundImage?: ImageSourcePropType;
  scale?: number;
}

export interface BaseElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height?: number | string;
  rotate?: number; // in radians
  opacity?: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontStyle?: TextStyle['fontStyle'];
  textDecorationUnderline?: 'underline';
  textDecorationLineThrough?: 'line-through';
  textTransform?: 'uppercase';
  textAlign?: TextStyle['textAlign'];
  backgroundColor?: TextStyle['backgroundColor'];
}

export interface ImageElement extends BaseElement {
  type: 'image';
  source: ImageSourcePropType;
}

export type CanvasElementItem = TextElement | ImageElement;

export type AspectRatio = '1:1' | '9:16' | '4:5' | '2:3';

export interface ImageInterface {
  id: string;
  source: ImageSourcePropType;
}
