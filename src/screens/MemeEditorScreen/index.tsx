import MemeEditor from '@/features/MemeEditor';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styles } from './style';

const MemeEditorScreen: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <MemeEditor />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MemeEditorScreen;
