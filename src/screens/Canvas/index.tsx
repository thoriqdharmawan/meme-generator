import { SafeAreaView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Footer from '../../components/Footer';
import EditableTextView from '../EditableTextView';
import { styles } from './style';

const Canvas: React.FC = () => {
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

export default Canvas;
