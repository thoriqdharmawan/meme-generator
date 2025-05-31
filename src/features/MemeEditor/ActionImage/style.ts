import { Colors, Spacing, Typography } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionText: {
    color: Colors.black,
  },
  container: {
    flexDirection: 'row',
  },
});

export const drawerOpacityStyles = StyleSheet.create({
  label: {
    color: Colors.gray,
    flex: 1,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    minWidth: 30,
    textAlign: 'center',
  },
  slider: {
    flex: 10,
  },
  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.md,
  },
  valueLabel: {
    color: Colors.black,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    textAlign: 'center',
  },
});
