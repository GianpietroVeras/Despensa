import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import html from './html';
 
export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#faf7f2',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <WebView
        originWhitelist={['*']}
        source={{ html, baseUrl: 'https://despensa.local' }}
        domStorageEnabled
        javaScriptEnabled
        style={{ flex: 1, backgroundColor: '#faf7f2' }}
      />
    </SafeAreaView>
  );
}
 