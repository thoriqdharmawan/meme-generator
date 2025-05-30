import MemeEditor from '@/features/MemeEditor';
import { SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styles } from './style';

const MemeEditorScreen: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.playground}>
          <MemeEditor />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MemeEditorScreen;
