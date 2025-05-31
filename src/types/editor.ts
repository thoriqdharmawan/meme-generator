import { ImageSourcePropType, TextStyle } from 'react-native';

export interface CanvasElement {
  id: string;
  width: number;
  height: number;
  backgroundImage?: ImageSourcePropType;
}

export interface CanvasTextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height?: number | string;
  color: string;
  fontSize?: number;
  fontWeight: TextStyle['fontWeight'];
  fontStyle?: TextStyle['fontStyle'];
  textDecorationUnderline?: 'underline';
  textDecorationLineThrough?: 'line-through';
  textTransform?: 'uppercase';
  textAlign?: TextStyle['textAlign'];
  backgroundColor?: TextStyle['backgroundColor'];
  rotate?: number; // in radians
}

export type CanvasTextFields = keyof CanvasTextElement;

export type AspectRatio = '1:1' | '9:16' | '4:5' | '2:3';
