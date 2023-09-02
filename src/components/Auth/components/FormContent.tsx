import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
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

  const submitHandler = useCallback(() => {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }, [enteredConfirmEmail, enteredConfirmPassword, enteredEmail, enteredPassword, onSubmit]);

  return (
    <View>
      <Text>Auth Form content</Text>
    </View>
  );
}
