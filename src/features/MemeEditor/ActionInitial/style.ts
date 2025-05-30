import { Colors, Spacing } from '@/constants';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
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

export const styleDrawer = StyleSheet.create({
  wrapper: {
    gap: Spacing.md,
  },
});
