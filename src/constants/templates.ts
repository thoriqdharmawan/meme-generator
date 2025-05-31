import { ImageSourcePropType } from 'react-native';

import { CanvasTextElement } from '@/types/editor';
import meme1 from '../assets/images/meme1.jpg';
import meme2 from '../assets/images/meme2.jpg';
import meme3 from '../assets/images/meme3.jpg';

export interface MemeTemplate {
  id: string;
  source: ImageSourcePropType;
  elemets?: CanvasTextElement[];
}

const ELEMENTS_DEMO_MEME1: CanvasTextElement[] = [
  {
    id: 'el-demo-meme-1',
    text: 'Thoriq Dharmawan',
    x: 190.00928622484207,
    y: 229.02455711364746,
    width: 136.50930806568692,
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 24,
  },
  {
    id: 'el-demo-meme-2',
    text: 'Kandidat Lain',
    x: 189.24924212694168,
    y: 55.68898582458496,
    width: 136.50930806568692,
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 24,
  },
];

const ELEMENTS_DEMO_MEME3: CanvasTextElement[] = [
  {
    id: 'el-demo-meme-1',
    text: 'Thoriq Dharmawan',
    x: 45.31287384033203,
    y: 155.0282745361328,
    width: 105.05543109348844,
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: '#FFFFFF',
  },
  {
    id: 'el-demo-meme-2',
    text: 'Kandidat Lain',
    x: 248.14694690704346,
    y: 141.85157585144043,
    width: 85.56807967594693,
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: '#FFFFFF',
  },
  {
    id: 'el-demo-meme-3',
    text: 'Lahelu',
    x: 176.73475110530853,
    y: 104.38095092773438,
    width: 67.80208369663785,
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: '#FFFFFF',
  },
];

export const MEME_TEMPLATES: MemeTemplate[] = [
  { id: '1', source: meme1, elemets: ELEMENTS_DEMO_MEME1 },
  { id: '2', source: meme2 },
  { id: '3', source: meme3, elemets: ELEMENTS_DEMO_MEME3 },
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
