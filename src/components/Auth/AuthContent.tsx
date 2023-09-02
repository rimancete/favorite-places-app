import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { LoginScreenNavigationHookProps } from 'types';
import { SigninType, SignupType } from 'types/models';
import FormContent from './components/FormContent';

interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: ({ email, password }: SigninType) => void;
}

export default function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const navigation = useNavigation<LoginScreenNavigationHookProps>();

  const switchAuthModeHandler = useCallback(() => {
    if (isLogin) {
      navigation.replace('Login');
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

      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });

      onAuthenticate({ email, password });
    },
    [onAuthenticate],
  );

  return (
    <View style={styles.authContent}>
      <FormContent
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      {/* CREATE BUTTON */}
    </View>
  );
}

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    // backgroundColor: Colors.primary800,
    elevation: 2,
    // shadowColor: 'black',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.35,
    // shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
