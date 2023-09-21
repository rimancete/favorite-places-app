import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input } from 'components';
import { SignupType } from 'types/models';

interface FormContentProps {
  isLogin: boolean;
  onSubmit: (newUserData: SignupType) => void;
  credentialsInvalid: {
    email: boolean;
    password: boolean;
    confirmEmail: boolean;
    confirmPassword: boolean;
  };
}

export default function FormContent({ isLogin, onSubmit, credentialsInvalid }: FormContentProps) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  const updateInputValueHandler = useCallback((inputType: string, enteredValue: string) => {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
      default:
    }
  }, []);

  const submitHandler = useCallback(() => {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }, [enteredConfirmEmail, enteredConfirmPassword, enteredEmail, enteredPassword, onSubmit]);

  return (
    <View style={styles.auth}>
      <Input
        label="Email Address"
        onUpdateValue={(e) => updateInputValueHandler('email', e)}
        value={enteredEmail}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Email Address"
          onUpdateValue={(e) => updateInputValueHandler('confirmEmail', e)}
          value={enteredConfirmEmail}
          keyboardType="email-address"
          isInvalid={emailsDontMatch}
        />
      )}

      <Input
        label="Password"
        onUpdateValue={(e) => updateInputValueHandler('password', e)}
        secureTextEntry
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          onUpdateValue={(e) => updateInputValueHandler('confirmPassword', e)}
          secureTextEntry
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        />
      )}

      <View style={styles.buttons}>
        <Button onPress={submitHandler}>{isLogin ? 'Log In' : 'Sign Up'}</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  auth: {},
  buttons: {
    marginTop: 12,
  },
});
