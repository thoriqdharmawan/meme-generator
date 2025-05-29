import { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { styles } from './style';

interface FooterProps {
  children?: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Footer;
