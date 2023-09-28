import { StatusBar } from 'expo-status-bar';

// import { Env } from '@env';
import Screens from 'components/Screens';
import { AuthProvider } from 'hooks/useAuth';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Screens />
    </AuthProvider>
  );
}
