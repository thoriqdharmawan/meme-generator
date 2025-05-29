import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#333' }}>Footer Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80,
    justifyContent: 'center',
  },
});

export default Footer;
