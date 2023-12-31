import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoadingOverlay } from 'components';
import { SigninType } from 'types/models';
import { login } from 'utils/request';
import { useAuth } from 'hooks';
import AuthContent from '../../components/Auth/AuthContent';

export default function Login() {
  const { updateUser } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loginHandler = useCallback(
    async ({ email, password }: SigninType) => {
      setIsAuthenticating(true);
      try {
        const userData = await login(email, password);
        await AsyncStorage.setItem('token', userData.idToken);
        updateUser(userData);
      } catch (error) {
        Alert.alert(
          'Authentication failed',
          'Could not log you in. Please check your credentials or try again later',
        );
        setIsAuthenticating(false);
      }
    },
    [updateUser],
  );

  if (isAuthenticating) return <LoadingOverlay message="Logging you in..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}
