import { CanvasElementItem, ImageInterface } from '@/types/editor';
import { ImageSourcePropType } from 'react-native';
import { Spacing } from './theme';

import meme1 from '../assets/images/meme1.jpg';
import meme2 from '../assets/images/meme2.jpg';
import meme3 from '../assets/images/meme3.jpg';
import meme4 from '../assets/images/meme4.jpg';

import calendar from '../assets/stickers/calendar.png';
import chat from '../assets/stickers/chat.png';
import cloud from '../assets/stickers/cloud.png';
import customerService from '../assets/stickers/customer-service.png';
import device from '../assets/stickers/device.png';
import megaphone from '../assets/stickers/megaphone.png';
import mobileApplication from '../assets/stickers/mobile-application.png';
import paperPlane from '../assets/stickers/paper-plane.png';
import thumbsUp from '../assets/stickers/thumbs-up.png';
import webDevelopment from '../assets/stickers/web-development.png';

// developer emulator device size, for comparison purposes
export const PROPORTIONAL_WIDTH = 411.428571;
export const PROPORTIONAL_HEIGHT = 914.285714;

export const CANVAS_SNAP_WIDTH = Spacing.tiny;
export const CANVAS_SNAP_SCALE_FACTOR = CANVAS_SNAP_WIDTH * 2;

export interface MemeTemplate {
  id: string;
  source: ImageSourcePropType;
  elemets?: CanvasElementItem[];
}

const ELEMENTS_DEMO_MEME1: CanvasElementItem[] = [
  {
    id: 'el-demo-meme-1-1',
    type: 'text',
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
    id: 'el-demo-meme-2-1',
    type: 'text',
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

const ELEMENTS_DEMO_MEME2: CanvasElementItem[] = [
  {
    id: '1748676221531',
    type: 'text',
    text: 'Langsung angkat karena penasaran',
    x: 32.345610067248344,
    y: 51.5063359439373,
    width: 118.87723418644498,
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 15,
    rotate: -0.26029629226590734,
    backgroundColor: '#FFFFFF',
  },
  {
    id: '1748676291983-copy',
    type: 'text',
    text: 'Diam, tatap layar, berharap dia menyerah',
    x: 149.3452356159687,
    y: 25.664430618286133,
    width: 119.83556636742185,
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 15,
    rotate: -0.1905156804036654,
    backgroundColor: '#FFFFFF',
  },
  {
    id: '1748676665166',
    type: 'text',
    text: 'Ditelfon nomor tidak dikenal',
    x: 44.547607421875,
    y: 456.5412902832031,
    width: 259.91592189243863,
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#FFFFFF',
  },
];

const ELEMENTS_DEMO_MEME3: CanvasElementItem[] = [
  {
    id: 'el-demo-meme-1-3',
    type: 'text',
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
    id: 'el-demo-meme-2-3',
    type: 'text',
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
    id: 'el-demo-meme-3-3',
    type: 'text',
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

const ELEMENTS_DEMO_MEME4: CanvasElementItem[] = [
  {
    id: 'el-demo-meme-2-4',
    type: 'text',
    text: 'Mahasiswa Semester Akhir',
    x: 61.880950927734375,
    y: 250.00112676620483,
    width: 225.34523459843228,
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  {
    id: 'el-demo-meme-1-4',
    type: 'text',
    text: 'Belajar buat ujian',
    x: 20.22023904323578,
    y: 58.27678394317627,
    width: 105.05543109348844,
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'right',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  {
    id: '1748677200781-copy-4',
    type: 'text',
    text: 'Nonton teori konspirasi 3 jam di YT',
    x: 182.89099872112274,
    y: 47.167428851127625,
    width: 125.16592284611295,
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'left',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
];

export const MEME_TEMPLATES: MemeTemplate[] = [
  { id: '1', source: meme1, elemets: ELEMENTS_DEMO_MEME1 },
  { id: '2', source: meme2, elemets: ELEMENTS_DEMO_MEME2 },
  { id: '3', source: meme3, elemets: ELEMENTS_DEMO_MEME3 },
  { id: '4', source: meme4, elemets: ELEMENTS_DEMO_MEME4 },
];

export const IMAGES: ImageInterface[] = [
  { id: '1', source: calendar },
  { id: '2', source: paperPlane },
  { id: '3', source: thumbsUp },
  { id: '4', source: webDevelopment },
  { id: '5', source: chat },
  { id: '6', source: cloud },
  { id: '7', source: customerService },
  { id: '8', source: device },
  { id: '9', source: megaphone },
  { id: '10', source: mobileApplication },
];
