import { ConfirmationDialog } from '@/components';
import { Colors } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import Button from '@components/Button';
import Footer from '@components/Footer';
import Icon from '@components/Icon';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import DrawerImage from './DrawerImage';
import DrawerText from './DrawerText';
import { style } from './style';

const DEFAULT_DRAWER_STATE = {
  openText: false,
  openImage: false,
};

const ActionInitial = () => {
  const { onResetAll } = useMemeEditor();

  const [drawer, setDrawer] = useState(DEFAULT_DRAWER_STATE);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

  const handleOpenDrawer = (field: 'openText' | 'openImage') => {
    setDrawer(prev => ({ ...prev, [field]: true }));
  };

  const closeDrawer = () => setDrawer(DEFAULT_DRAWER_STATE);

  const handleDeleteConfirm = () => {
    onResetAll();
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Footer>
        <ScrollView horizontal style={style.container}>
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='format-text' />}
            style={style.action}
            textStyle={style.actionText}
            title='Text'
            variant='ghost'
            onPress={() => handleOpenDrawer('openText')}
          />
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='image' />}
            style={style.action}
            textStyle={style.actionText}
            title='Image'
            variant='ghost'
            onPress={() => handleOpenDrawer('openImage')}
          />
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='sticker-emoji' />}
            style={style.action}
            textStyle={style.actionText}
            title='Sticker'
            variant='ghost'
          />
          <Button
            icon={<Icon library='Feather' name='trash' color={Colors.error} />}
            style={style.action}
            textStyle={style.actionTextDanger}
            title='Delete'
            variant='ghost'
            onPress={() => setShowDeleteConfirmation(true)}
          />
        </ScrollView>
      </Footer>

      <DrawerText visible={drawer.openText} onClose={closeDrawer} />

      <DrawerImage visible={drawer.openImage} onClose={closeDrawer} />

      <ConfirmationDialog
        visible={showDeleteConfirmation}
        title='Delete Text'
        message='Are you sure you want to delete this project?'
        confirmText='Delete'
        cancelText='Cancel'
        variant='danger'
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirmation(false)}
      />
    </>
  );
};

export default ActionInitial;
