import { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ScreensNavigationHookProps } from 'types';
import { SigninType, SignupType } from 'types/models';
import theme from 'styles/theme';
import Button from 'components/Button';
import FormContent from './components/FormContent';

interface AuthContentProps {
  isLogin?: boolean;
  onAuthenticate: ({ email, password }: SigninType) => void;
}

export default function AuthContent({ isLogin = false, onAuthenticate }: AuthContentProps) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const navigation = useNavigation<ScreensNavigationHookProps>();

  const switchAuthModeHandler = useCallback(() => {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }, [isLogin, navigation]);

  const submitHandler = useCallback(
    (credentials: SignupType) => {
      let { email, password } = credentials;
      const { confirmEmail, confirmPassword } = credentials;

      email = email.trim();
      password = password.trim();

      const emailIsValid = email.includes('@');
      const passwordIsValid = password.length > 6;
      const emailsAreEqual = email === confirmEmail;
      const passwordsAreEqual = password === confirmPassword;

      if (
        !emailIsValid ||
        !passwordIsValid ||
        (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
      ) {
        Alert.alert('Invalid input', 'Please check your entered credentials.');

        setCredentialsInvalid({
          email: !emailIsValid,
          confirmEmail: !emailIsValid || !emailsAreEqual,
          password: !passwordIsValid,
          confirmPassword: !passwordIsValid || !passwordsAreEqual,
        });
        return;
      }

      onAuthenticate({ email, password });
    },
    [isLogin, onAuthenticate],
  );

  return (
    <View style={styles.authContent}>
      <FormContent
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Button onPress={switchAuthModeHandler} variant="flat">
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme().colors.primary800,
    elevation: 2,
    ...theme().ioShadow,
  },
  buttons: {
    marginTop: 8,
  },
});
