import { TextStyle } from 'react-native';

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
}

export type CanvasTextFields = keyof CanvasTextElement;
