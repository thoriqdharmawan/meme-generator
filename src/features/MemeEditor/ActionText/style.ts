import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
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

export const drawerColorStyles = StyleSheet.create({
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

export const drawerFormatStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  formatItem: {
    alignItems: 'center',
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    borderWidth: 0.8,
    flex: 1,
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  formatItemActive: {
    backgroundColor: Colors.secondaryLight,
    borderColor: Colors.secondaryLight,
  },
  formatText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.normal,
    padding: Spacing.sm,
    textAlign: 'center',
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.md,
  },
});
