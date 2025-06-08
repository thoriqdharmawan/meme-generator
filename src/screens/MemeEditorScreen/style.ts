import { Colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    color: Colors.gray,
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    color: Colors.darkGray,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
