export const Colors = {
  // Primary Colors
  primary: '#007AFF',
  primaryLight: '#4DA6FF',
  primaryDark: '#0056CC',

  // Secondary Colors
  secondary: '#FF9500',
  secondaryLight: '#FFB84D',
  secondaryDark: '#CC7700',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
  darkGray: '#3A3A3C',

  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  backgroundTertiary: '#FFFFFF',

  // Text Colors
  text: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#8E8E93',
  textInverse: '#FFFFFF',

  // Accent Colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',

  // Border Colors
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  borderDark: '#3A3A3C',

  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',
  overlayDark: 'rgba(0, 0, 0, 0.6)',

  // Transparent
  transparent: 'transparent',

  // Blue variants (for EditableTextBox)
  blue: '#007AFF',
  blueLight: '#4DA6FF',
  blueDark: '#0056CC',

  // Red variants (for resize handle)
  red: '#FF3B30',
  redLight: '#FF6961',
  redDark: '#CC2F26',
};

export const Spacing = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Specific paddings
  padding: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // Specific margins
  margin: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // Common layout spacings
  containerPadding: 16,
  sectionSpacing: 24,
  itemSpacing: 12,
  cardPadding: 16,
  buttonPadding: 12,
};

export const Typography = {
  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 32,
  },

  // Font weights
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};

export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 3,
  },
  lg: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4.0,
    elevation: 5,
  },
  xl: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8.0,
    elevation: 8,
  },
};

export const Layout = {
  // Screen dimensions helpers
  screenPadding: Spacing.md,
  headerHeight: 44,
  tabBarHeight: 49,

  // Common dimensions
  buttonHeight: 44,
  inputHeight: 40,
  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },

  // EditableTextBox specific
  textBox: {
    minWidth: 60,
    minHeight: 40,
    defaultWidth: 200,
    defaultHeight: 50,
    resizeHandleSize: 24,
    resizeHandleWidth: 6,
    actionButtonHeight: 32,
    actionBarOffset: 42,
  },
};

export const Animations = {
  // Duration
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Easing
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  typography: Typography,
  borderRadius: BorderRadius,
  shadows: Shadows,
  layout: Layout,
  animations: Animations,
};

export default Theme;
