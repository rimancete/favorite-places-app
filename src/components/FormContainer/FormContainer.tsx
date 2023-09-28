import { ScrollView, StyleSheet, View } from 'react-native';

interface FormcontainerProps {
  children: React.ReactNode;
}
export default function FormContainer({ children }: FormcontainerProps) {
  return <ScrollView style={styles.form}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
});
