import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from 'react-native';

import theme from 'styles/theme';

interface ButtonProps extends PressableProps {
  children: TextProps['children'];
  isFlat?: boolean;
}

export default function Button({ onPress, isFlat = false, children }: ButtonProps) {
  const flatButtonPressableStyle = {
    paddingVertical: 6,
    paddingHorizontal: 12,
  };

  const flatTextButtonStyle: StyleProp<TextStyle> = {
    textAlign: 'center',
    color: theme().colors.primary100,
  };

  return (
    <Pressable
      style={({ pressed }) => [
        isFlat ? { ...flatButtonPressableStyle } : styles.button,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <View>
        <Text style={isFlat ? { ...flatTextButtonStyle } : styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: theme().colors.primary500,
    elevation: 2,
    ...theme().ioShadow,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
