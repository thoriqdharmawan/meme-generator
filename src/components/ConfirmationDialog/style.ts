import { BorderRadius, Colors, Spacing, Typography } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'space-between',
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  dialog: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    elevation: 5,
    maxWidth: 400,
    minWidth: 280,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
  },
  message: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: Colors.overlay,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  title: {
    color: Colors.text,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
});
