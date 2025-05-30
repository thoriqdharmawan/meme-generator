import { Colors, Shadows, Spacing } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
