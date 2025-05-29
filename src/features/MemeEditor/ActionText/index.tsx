import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { ScrollView } from 'react-native';
import { styles } from './style';

const ActionText = () => {
  return (
    <Footer>
      <ScrollView horizontal style={styles.container}>
        <Button
          icon={<Icon library='MaterialCommunityIcons' name='format-text' />}
          style={styles.action}
          textStyle={styles.actionText}
          title='Warna'
          variant='ghost'
        />
      </ScrollView>
    </Footer>
  );
};

export default ActionText;
