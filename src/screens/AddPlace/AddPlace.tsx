import { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { FormContainer, ImagePicker } from 'components';
import theme from 'styles/theme';

export default function AddPlace() {
  const [enteredTitle, setEnteredTitle] = useState('');

  const changeTitleHandler = useCallback((text: string) => {
    setEnteredTitle(text);
  }, []);
  return (
    <FormContainer>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
      </View>
      <ImagePicker />
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme().colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: theme().colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: theme().colors.primary100,
  },
});
