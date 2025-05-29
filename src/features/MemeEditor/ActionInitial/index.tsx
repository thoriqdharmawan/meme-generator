import Button from '@components/Button';
import Footer from '@components/Footer';
import Icon from '@components/Icon';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import DrawerText from './DrawerText';
import { style } from './style';

const ActionInitial = () => {
  const [textDrawerVisible, setTextDrawerVisible] = useState(false);

  const openTextDrawer = () => setTextDrawerVisible(true);
  const closeTextDrawer = () => setTextDrawerVisible(false);

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
            onPress={openTextDrawer}
          />
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='image' />}
            style={style.action}
            textStyle={style.actionText}
            title='Image'
            variant='ghost'
          />
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='sticker-emoji' />}
            style={style.action}
            textStyle={style.actionText}
            title='Sticker'
            variant='ghost'
          />
          <Button
            icon={<Icon library='MaterialCommunityIcons' name='brush' />}
            style={style.action}
            textStyle={style.actionText}
            title='Draw'
            variant='ghost'
          />
        </ScrollView>
      </Footer>

      <DrawerText visible={textDrawerVisible} onClose={closeTextDrawer} />
    </>
  );
};

export default ActionInitial;
