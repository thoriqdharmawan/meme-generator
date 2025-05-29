/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { MemeEditorProvider } from '@/contexts/MemeEditorContext';
import MemeEditorScreen from '@/screens/MemeEditorScreen';
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <MemeEditorProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MemeEditorScreen />
    </MemeEditorProvider>
  );
}

export default App;
