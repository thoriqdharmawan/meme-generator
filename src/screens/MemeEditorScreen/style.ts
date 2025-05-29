import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  playground: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    position: 'relative',
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
