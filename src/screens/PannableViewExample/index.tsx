import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PannableView from '../../components/PannableView';

const PannableViewExample: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pannable View Example</Text>
        <Text style={styles.subtitle}>Drag the colored boxes around the screen</Text>
      </View>

      <View style={styles.playground}>
        <PannableView />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  playground: {
    flex: 1,
    position: 'relative',
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PannableViewExample;
