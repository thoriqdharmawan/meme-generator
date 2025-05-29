import { ScrollView } from 'react-native';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';
import Icon from '../../../components/Icon';
import { style } from './style';

const ActionInitial = () => {
  return (
    <Footer>
      <ScrollView horizontal style={style.container}>
        <Button
          icon={<Icon library='MaterialCommunityIcons' name='format-text' />}
          style={style.action}
          textStyle={style.actionText}
          title='Text'
          variant='ghost'
        />
        <Button
          icon={<Icon library='MaterialCommunityIcons' name='format-text' />}
          style={style.action}
          textStyle={style.actionText}
          title='Text'
          variant='ghost'
        />
      </ScrollView>
    </Footer>
  );
};

export default ActionInitial;
