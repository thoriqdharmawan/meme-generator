import Button from '@/components/Button';
import Icon from '@/components/icon';
import { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { styles } from './style';

interface FooterProps {
  children?: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.historyWrapper}>
        <Button
          icon={<Icon library='MaterialCommunityIcons' name='undo' />}
          style={styles.button}
          size='small'
          variant='ghost'
        />
        <Button
          icon={<Icon library='MaterialCommunityIcons' name='redo' />}
          style={styles.button}
          size='small'
          variant='ghost'
        />
      </View>
      {children}
    </View>
  );
};

export default Footer;
