import { Colors, Shadows, Spacing, Typography } from '@/constants';
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
    backgroundColor: '#b58df1',
    height: Spacing.xl * 3,
    width: Spacing.xl * 3,
    ...Shadows.xl,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
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
  canvasItemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    justifyContent: 'center',
    ...Shadows.lg,
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
