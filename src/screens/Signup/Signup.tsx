import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoadingOverlay } from 'components';
import { SigninType } from 'types/models';
import { createUser } from 'utils/request';
import { useAuth } from 'hooks';

import AuthContent from '../../components/Auth/AuthContent';

export default function Signup() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { updateUser } = useAuth();

  const signupHandler = useCallback(
    async ({ email, password }: SigninType) => {
      setIsAuthenticating(true);
      try {
        const userData = await createUser(email, password);

        await AsyncStorage.setItem('token', userData.idToken);
        updateUser(userData);
      } catch (error) {
        Alert.alert(
          'Authentication failed',
          'Could not create user. Please check your input or try again later',
        );
        setIsAuthenticating(false);
      }
    },
    [updateUser],
  );

  if (isAuthenticating) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={signupHandler} />;
}
