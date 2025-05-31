import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants';
import { ReactNode } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { styles } from './style';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title?: string;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
  onPress,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BorderRadius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingVertical: Spacing.xs,
        paddingHorizontal: Spacing.sm,
        minHeight: 32,
      },
      medium: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.lg,
        minHeight: 44,
      },
      large: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        minHeight: 52,
      },
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: isDisabled ? Colors.gray : Colors.primary,
        ...Shadows.sm,
      },
      secondary: {
        backgroundColor: isDisabled ? Colors.lightGray : Colors.secondary,
        ...Shadows.sm,
      },
      outline: {
        backgroundColor: Colors.transparent,
        borderWidth: 1,
        borderColor: isDisabled ? Colors.gray : Colors.primary,
      },
      ghost: {
        backgroundColor: Colors.transparent,
      },
      danger: {
        backgroundColor: isDisabled ? Colors.gray : Colors.error,
        ...Shadows.sm,
      },
    };

    const widthStyle: ViewStyle = fullWidth ? { width: '100%' } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...widthStyle,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: Typography.fontWeight.medium,
      textAlign: 'center',
    };

    const sizeTextStyles: Record<string, TextStyle> = {
      small: {
        fontSize: Typography.fontSize.sm,
      },
      medium: {
        fontSize: Typography.fontSize.md,
      },
      large: {
        fontSize: Typography.fontSize.lg,
      },
    };

    const variantTextStyles: Record<string, TextStyle> = {
      primary: {
        color: isDisabled ? Colors.white : Colors.textInverse,
      },
      secondary: {
        color: isDisabled ? Colors.white : Colors.textInverse,
      },
      outline: {
        color: isDisabled ? Colors.white : Colors.primary,
      },
      ghost: {
        color: isDisabled ? Colors.white : Colors.primary,
      },
      danger: {
        color: isDisabled ? Colors.white : Colors.textInverse,
      },
    };

    return {
      ...baseStyle,
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size='small'
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
          style={styles.loader}
        />
      )}
      {icon && <>{icon}</>}
      {title && (
        <Text style={[getTextStyle(), textStyle, icon ? styles.textWithIcon : null]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
