import { Spacing } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    margin: Spacing.margin.none,
    padding: Spacing.padding.none,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  container: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
});
