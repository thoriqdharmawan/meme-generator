import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Footer from '../../components/Footer';
import EditableTextView from '../EditableTextView';

const PannableViewExample: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pannable View Example</Text>
          <Text style={styles.subtitle}>Drag the colored boxes around the screen</Text>
        </View>

        <View style={styles.playground}>
          {/* <PannableView /> */}
          <EditableTextView />
        </View>

        <Footer />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  playground: {
    backgroundColor: '#f0f0f0',
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
