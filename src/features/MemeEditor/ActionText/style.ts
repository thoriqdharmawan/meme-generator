import { Colors } from '@/constants';
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
