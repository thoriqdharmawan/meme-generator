import { ConfirmationDialog } from '@/components';
import Icon from '@/components/icon';
import { Colors } from '@/constants';
import { useMemeEditor } from '@/contexts/MemeEditorContext';
import Button from '@components/Button';
import Footer from '@components/Footer';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import DrawerUseTemplate from '../CanvasContainer/DrawerUseTemplate';
import DrawerImage from './DrawerImage';
import DrawerText from './DrawerText';
import { style } from './style';

interface DrawerState {
  openTemplate: boolean;
  openText: boolean;
  openSticker: boolean;
}

const DEFAULT_DRAWER_STATE = {
  openTemplate: false,
  openText: false,
  openSticker: false,
};

const ActionInitial = () => {
  const { onResetAll } = useMemeEditor();

  const [drawer, setDrawer] = useState<DrawerState>(DEFAULT_DRAWER_STATE);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

  const handleOpenDrawer = (field: keyof DrawerState) => {
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
            icon={<Icon library='MaterialCommunityIcons' name='image-edit-outline' />}
            style={style.action}
            textStyle={style.actionText}
            title='Template'
            variant='ghost'
            onPress={() => handleOpenDrawer('openTemplate')}
          />
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='format-text' />}
            style={style.action}
            textStyle={style.actionText}
            title='Text'
            variant='ghost'
            onPress={() => handleOpenDrawer('openText')}
          />

          <Button
            icon={<Icon library='MaterialCommunityIcons' name='sticker-emoji' />}
            style={style.action}
            textStyle={style.actionText}
            title='Sticker'
            variant='ghost'
            onPress={() => handleOpenDrawer('openSticker')}
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

      <DrawerImage visible={drawer.openSticker} onClose={closeDrawer} />

      <DrawerUseTemplate
        visible={drawer.openTemplate}
        onClose={() => setDrawer(DEFAULT_DRAWER_STATE)}
      />

      <ConfirmationDialog
        visible={showDeleteConfirmation}
        title='Delete Project'
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
