import { Colors, Layout, Spacing } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    margin: Spacing.margin.none,
    padding: Spacing.padding.none,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: Layout.footerHeight,
    justifyContent: 'center',
    position: 'relative',
  },
  historyWrapper: {
    flexDirection: 'row',
    gap: Spacing.sm,
    left: Spacing.md,
    position: 'absolute',
    top: -Spacing.xxl,
  },
});
