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

export const drawerStyles = StyleSheet.create({
  colorButton: {
    alignItems: 'center',
    borderRadius: 25,
    elevation: 2,
    height: 42,
    justifyContent: 'center',
    marginBottom: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: 42,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
  },
  defaultIndicator: {
    backgroundColor: '#000',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  whiteColorBorder: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
});
