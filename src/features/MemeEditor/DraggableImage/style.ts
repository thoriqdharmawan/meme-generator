import { BorderRadius, Colors, Layout, Spacing, Typography } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    marginHorizontal: Spacing.xs / 2,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    width: 'auto',
  },
  actionText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
  },
  actions: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    flexDirection: 'row',
    height: Layout.textBox.actionButtonHeight,
    padding: Spacing.padding.none,
    position: 'absolute',
    right: 0,
    top: -Layout.textBox.actionBarOffset,
  },
  box: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.transparent,
    borderWidth: 1,
    padding: Spacing.padding.none,
    position: 'absolute',
  },
  editableBox: {
    borderColor: Colors.blue,
    borderWidth: 1,
  },
  idleBox: {
    borderColor: Colors.transparent,
    borderWidth: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  resizeHandle: {
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: BorderRadius.full,
    borderBottomRightRadius: BorderRadius.full,
    borderRadius: BorderRadius.xs,
    borderTopLeftRadius: BorderRadius.full,
    borderTopRightRadius: BorderRadius.full,
    bottom: -(Spacing.md / 2),
    height: Spacing.md,
    position: 'absolute',
    right: -(Spacing.md / 2),
    width: Spacing.md,
  },
});
