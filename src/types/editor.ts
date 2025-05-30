import { TextStyle } from 'react-native';

export interface CanvasElement {
  id: string;
  width: number;
  height: number;
}

export interface CanvasTextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number | string;
  color: string;
  fontWeight: TextStyle['fontWeight'];
  fontStyle?: TextStyle['fontStyle'];
  textDecorationUnderline?: 'underline';
  textDecorationLineThrough?: 'line-through';
  textTransform?: 'uppercase';
  textAlign?: TextStyle['textAlign'];
}

export type CanvasTextFields = keyof CanvasTextElement;

export type AspectRatio = '1:1' | '9:16' | '4:5' | '2:3';
