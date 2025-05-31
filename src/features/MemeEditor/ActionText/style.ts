import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
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

export const drawerColorStyles = StyleSheet.create({
  colorButton: {
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    height: Spacing.xxl,
    justifyContent: 'center',
    marginBottom: Spacing.margin.md,
    width: Spacing.xxl,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  labelNone: {
    color: Colors.black,
    fontSize: Typography.fontSize.sm,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.md,
  },
  whiteColorBorder: {
    borderColor: Colors.gray,
    borderWidth: 1,
  },
});

export const drawerFormatStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  formatItem: {
    alignItems: 'center',
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    borderWidth: 0.8,
    flex: 1,
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  formatItemActive: {
    backgroundColor: Colors.secondaryLight,
    borderColor: Colors.secondaryLight,
  },
  formatText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.normal,
    padding: Spacing.sm,
    textAlign: 'center',
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.md,
  },
});

export const drawerFontSizeStyles = StyleSheet.create({
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.md,
  },
});
