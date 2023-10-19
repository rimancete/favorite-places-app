import Button from 'components/Button';
import { PressableProps, ScrollView, StyleSheet } from 'react-native';

interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: PressableProps['onPress'];
}
export default function FormContainer({ children, onSubmit }: FormContainerProps) {
  return (
    <ScrollView style={styles.form}>
      {children}
      <Button onPress={onSubmit} variant="regular">
        Add Place
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
});
