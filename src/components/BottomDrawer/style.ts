import { BorderRadius, Colors, Shadows, Spacing } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    paddingBottom: 34,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  drawer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    ...Shadows.lg,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: Colors.gray,
    borderRadius: BorderRadius.xs,
    height: Spacing.xs,
    width: Spacing.xxl,
  },
  handleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.padding.md,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
});
