import { Button } from '@/components/Button';
import { FC } from 'react';
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './style';

export interface ConfirmationDialogProps {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  visible,
  title = 'Confirmation',
  message = 'Are you sure you want to continue?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
}) => {
  const handleBackdropPress = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal visible={visible} transparent animationType='fade' statusBarTranslucent>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialog}>
              <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
              </View>

              <View style={styles.actions}>
                <Button
                  title={cancelText}
                  variant='outline'
                  size='medium'
                  onPress={handleCancel}
                  style={styles.cancelButton}
                />
                <Button
                  title={confirmText}
                  variant={variant === 'danger' ? 'danger' : 'primary'}
                  size='medium'
                  onPress={handleConfirm}
                  style={styles.confirmButton}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmationDialog;
