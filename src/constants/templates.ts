import { ImageSourcePropType } from 'react-native';

import meme1 from '../assets/images/meme1.jpg';
import meme2 from '../assets/images/meme2.jpg';
import meme3 from '../assets/images/meme3.jpg';

export interface MemeTemplate {
  id: string;
  source: ImageSourcePropType;
}

export const MEME_TEMPLATES: MemeTemplate[] = [
  { id: '1', source: meme1 },
  { id: '2', source: meme2 },
  { id: '3', source: meme3 },
  { id: '12', source: meme1 },
  { id: '22', source: meme2 },
  { id: '32', source: meme3 },
  { id: '123', source: meme1 },
  { id: '223', source: meme2 },
  { id: '323', source: meme3 },
  { id: '1234', source: meme1 },
  { id: '2234', source: meme2 },
  { id: '3234', source: meme3 },
];
