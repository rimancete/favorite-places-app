import { View } from 'react-native';

interface FormcontainerProps {
  children: React.ReactNode;
}
export default function Formcontainer({ children }: FormcontainerProps) {
  return <View>{children}</View>;
}
