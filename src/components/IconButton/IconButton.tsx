import { OpaqueColorValue, Pressable, PressableProps, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface IconButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string | OpaqueColorValue | undefined;
  size: number;
  onPress: PressableProps['onPress'];
}

export default function IconButton({ icon, size, color, onPress }: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <MaterialIcons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
