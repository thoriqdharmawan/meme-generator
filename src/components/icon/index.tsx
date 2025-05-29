import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

export type IconLibrary =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

export interface IconProps {
  library?: IconLibrary;
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// Map of icon libraries
const IconLibraries = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

/**
 * Dynamic Icon Component
 *
 * A reusable icon component that supports multiple icon libraries.
 * Defaults to MaterialIcons but can use any supported library.
 *
 * @example
 * // Basic usage with default MaterialIcons
 * <Icon name="home" size={24} color="#000" />
 *
 * // Using different libraries
 * <Icon library="Feather" name="heart" size={20} color="red" />
 * <Icon library="FontAwesome" name="star" size={16} color="gold" />
 *
 * // With custom styling
 * <Icon
 *   library="MaterialCommunityIcons"
 *   name="account"
 *   size={32}
 *   color="blue"
 *   style={{ marginRight: 8 }}
 * />
 */
const Icon: React.FC<IconProps> = ({
  library = 'MaterialIcons',
  name,
  size = 24,
  color = '#000000',
  style,
  testID,
}) => {
  const IconComponent = IconLibraries[library];

  if (!IconComponent) {
    console.warn(`Icon library "${library}" not found. Using MaterialIcons instead.`);
    return <MaterialIcons name={name} size={size} color={color} style={style} testID={testID} />;
  }

  return <IconComponent name={name} size={size} color={color} style={style} testID={testID} />;
};

export default Icon;

export const IconVariants = {
  home: { library: 'MaterialIcons' as IconLibrary, name: 'home' },
  back: { library: 'MaterialIcons' as IconLibrary, name: 'arrow-back' },
  forward: { library: 'MaterialIcons' as IconLibrary, name: 'arrow-forward' },
  menu: { library: 'MaterialIcons' as IconLibrary, name: 'menu' },
  close: { library: 'MaterialIcons' as IconLibrary, name: 'close' },

  edit: { library: 'MaterialIcons' as IconLibrary, name: 'edit' },
  delete: { library: 'MaterialIcons' as IconLibrary, name: 'delete' },
  copy: { library: 'Feather' as IconLibrary, name: 'copy' },
  duplicate: { library: 'MaterialIcons' as IconLibrary, name: 'content-copy' },
  save: { library: 'MaterialIcons' as IconLibrary, name: 'save' },
  download: { library: 'MaterialIcons' as IconLibrary, name: 'download' },
  upload: { library: 'MaterialIcons' as IconLibrary, name: 'upload' },
  share: { library: 'MaterialIcons' as IconLibrary, name: 'share' },

  play: { library: 'MaterialIcons' as IconLibrary, name: 'play-arrow' },
  pause: { library: 'MaterialIcons' as IconLibrary, name: 'pause' },
  stop: { library: 'MaterialIcons' as IconLibrary, name: 'stop' },
  camera: { library: 'MaterialIcons' as IconLibrary, name: 'camera-alt' },
  image: { library: 'MaterialIcons' as IconLibrary, name: 'image' },

  check: { library: 'MaterialIcons' as IconLibrary, name: 'check' },
  error: { library: 'MaterialIcons' as IconLibrary, name: 'error' },
  warning: { library: 'MaterialIcons' as IconLibrary, name: 'warning' },
  info: { library: 'MaterialIcons' as IconLibrary, name: 'info' },

  heart: { library: 'FontAwesome' as IconLibrary, name: 'heart' },
  star: { library: 'MaterialIcons' as IconLibrary, name: 'star' },
  like: { library: 'AntDesign' as IconLibrary, name: 'like1' },
  comment: { library: 'MaterialIcons' as IconLibrary, name: 'comment' },

  add: { library: 'MaterialIcons' as IconLibrary, name: 'add' },
  remove: { library: 'MaterialIcons' as IconLibrary, name: 'remove' },
  search: { library: 'MaterialIcons' as IconLibrary, name: 'search' },
  settings: { library: 'MaterialIcons' as IconLibrary, name: 'settings' },
  more: { library: 'MaterialIcons' as IconLibrary, name: 'more-vert' },

  trash: { library: 'Feather' as IconLibrary, name: 'trash' },
  user: { library: 'Feather' as IconLibrary, name: 'user' },
  mail: { library: 'Feather' as IconLibrary, name: 'mail' },
  phone: { library: 'Feather' as IconLibrary, name: 'phone' },
  calendar: { library: 'Feather' as IconLibrary, name: 'calendar' },
};

/**
 * Quick Icon Component
 * Uses pre-configured icon variants for consistency
 *
 * @example
 * <QuickIcon variant="home" size={24} color="blue" />
 * <QuickIcon variant="trash" size={16} color="red" />
 */
export const QuickIcon: React.FC<{
  variant: keyof typeof IconVariants;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}> = ({ variant, size, color, style, testID }) => {
  const iconConfig = IconVariants[variant];

  return (
    <Icon
      library={iconConfig.library}
      name={iconConfig.name}
      size={size}
      color={color}
      style={style}
      testID={testID}
    />
  );
};
