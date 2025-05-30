import { Colors, Spacing, Typography } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  addCanvasContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  addCanvasLabel: {
    alignItems: 'center',
    color: Colors.black,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  box: {
    backgroundColor: Colors.white,
    borderColor: Colors.transparent,
    borderWidth: 1,
  },
  boxActive: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  emptyCanvas: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  or: {
    alignItems: 'center',
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.light,
    justifyContent: 'center',
  },
});

export const canvasDrawerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.padding.sm,
  },
});

export const canvasItemStyles = StyleSheet.create({
  canvasItemActive: {
    borderColor: Colors.primary,
  },
  canvasItemContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    justifyContent: 'center',
  },
  canvasItemLabel: {
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
  },
  container: {
    gap: Spacing.sm,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export const templateStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
  },
  itemActive: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  itemContainer: {
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: Spacing.sm,
    height: 200,
    maxWidth: '50%',
  },
  row: {
    gap: Spacing.sm,
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  useButton: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },
});
