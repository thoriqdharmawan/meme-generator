import { useMemeEditor } from '@/contexts/MemeEditorContext';
import { FC } from 'react';
import { View } from 'react-native';
import Button from '../Button';
import Icon from '../icon';
import { styles } from './style';

interface UndoRedoProps {
  size?: 'small' | 'medium' | 'large';
}

const UndoRedo: FC<UndoRedoProps> = ({ size = 'small' }) => {
  const { canUndo, canRedo, undo, redo } = useMemeEditor();

  return (
    <View style={styles.container}>
      <Button
        icon={<Icon library='MaterialCommunityIcons' name='undo' />}
        style={[styles.button, !canUndo && styles.buttonDisabled]}
        size={size}
        variant='ghost'
        disabled={!canUndo}
        onPress={undo}
      />
      <Button
        icon={<Icon library='MaterialCommunityIcons' name='redo' />}
        style={[styles.button, !canRedo && styles.buttonDisabled]}
        size={size}
        variant='ghost'
        disabled={!canRedo}
        onPress={redo}
      />
    </View>
  );
};

export default UndoRedo;
