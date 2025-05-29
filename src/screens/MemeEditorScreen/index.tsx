import MemeEditor from '@/features/MemeEditor';
import { SafeAreaView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styles } from './style';

const MemeEditorScreen: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pannable View Example</Text>
          <Text style={styles.subtitle}>Drag the colored boxes around the screen</Text>
        </View>

        <View style={styles.playground}>
          <MemeEditor />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MemeEditorScreen;
