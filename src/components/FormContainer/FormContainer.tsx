import { View } from 'react-native';

interface FormcontainerProps {
  children: React.ReactNode;
}
export default function FormContainer({ children }: FormcontainerProps) {
  return <View>{children}</View>;
}
