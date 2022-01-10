import { ImageSourcePropType } from 'react-native';

export interface Layout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DefaultOptions {
  type?: 'timer';
  layout?: Layout;
  source?: ImageSourcePropType;
}
