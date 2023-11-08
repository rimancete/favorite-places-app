import Button from 'components/Button';
import { PressableProps, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import getLandscapeOrientation from 'utils/getLandscapeLayout';

interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: PressableProps['onPress'];
}
export default function FormContainer({ children, onSubmit }: FormContainerProps) {
  const { height } = useWindowDimensions();

  const isLandscape = getLandscapeOrientation(height);

  return (
    <ScrollView style={[styles.form, isLandscape && { marginBottom: 16 }]}>
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
