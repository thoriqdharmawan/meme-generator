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
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    height: Layout.textBox.actionButtonHeight,
    padding: Spacing.xs,
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
  resizeHandle: {
    backgroundColor: Colors.red,
    borderRadius: BorderRadius.xs,
    height: Layout.textBox.resizeHandleSize,
    position: 'absolute',
    right: -Spacing.xs,
    width: Layout.textBox.resizeHandleWidth,
  },
  textInput: {
    minHeight: 30,
    padding: Spacing.xs,
  },
});
