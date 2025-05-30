import { BorderRadius, Colors, Shadows } from '@/constants';
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
    borderRadius: 2,
    height: 4,
    marginTop: 8,
    width: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
});
