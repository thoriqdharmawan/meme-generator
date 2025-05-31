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
  actionTextDanger: {
    color: Colors.error,
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

export const imageStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  itemActive: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  itemContainer: {
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: Spacing.sm,
    height: 200,
    maxWidth: '50%',
  },

  row: {
    gap: Spacing.sm,
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  useButton: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },
});
