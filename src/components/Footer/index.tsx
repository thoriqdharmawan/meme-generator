import { FC, ReactNode } from 'react';
import { View } from 'react-native';
import UndoRedo from '../UndoRedo';
import { styles } from './style';

interface FooterProps {
  children?: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.historyWrapper}>
        <UndoRedo size='small' />
      </View>
      {children}
    </View>
  );
};

export default Footer;
