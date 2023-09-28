import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import theme from 'styles/theme';

interface InputProps extends TextInputProps {
  label: string;
  onUpdateValue: ((text: string) => void) | undefined;
  isInvalid: boolean;
  //   value: string;
}

export default function Input({ label, onUpdateValue, isInvalid, ...props }: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        // autoCapitalize={false}
        autoCapitalize="none"
        onChangeText={onUpdateValue}
        // value={value}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: theme().colors.primary100,
    marginBottom: 4,
  },
  labelInvalid: {
    color: theme().colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: theme().colors.primary100,
    borderRadius: 4,
    fontSize: 16,
    color: theme().colors.primary800,
  },
  inputInvalid: {
    backgroundColor: theme().colors.error100,
  },
});
