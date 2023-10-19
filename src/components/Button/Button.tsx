import { useCallback, useMemo } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import theme from 'styles/theme';

interface ButtonProps extends PressableProps {
  children: TextProps['children'];
  variant?: 'default' | 'flat' | 'outlined' | 'regular';
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export default function Button({
  onPress,
  variant = 'default',
  icon = 'camera-alt',
  children,
  ...props
}: ButtonProps) {
  const isFlat = variant === 'flat';
  const isOutlined = variant === 'outlined';
  const isRegular = variant === 'regular';

  const outlinedPressableStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      paddingHorizontal: 12,
      paddingVertical: 6,
      margin: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 6,
      borderColor: theme().colors.primary500,
    };
  }, []);

  const outlinedPressablePressedStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      opacity: 0.7,
    };
  }, []);

  const outlinedIconStyle: StyleProp<TextStyle> = useMemo(() => {
    return {
      marginRight: 6,
    };
  }, []);

  const outlinedTextStyle: StyleProp<TextStyle> = useMemo(() => {
    return {
      color: theme().colors.primary500,
    };
  }, []);

  const outlinedButton = useCallback(
    () => (
      <Pressable
        style={({ pressed }) => [outlinedPressableStyle, pressed && outlinedPressablePressedStyle]}
        onPress={onPress}
        {...props}>
        <MaterialIcons
          style={outlinedIconStyle}
          name={icon}
          size={18}
          color={theme().colors.primary500}
        />
        <Text style={outlinedTextStyle}>{children}</Text>
      </Pressable>
    ),
    [
      children,
      icon,
      onPress,
      outlinedIconStyle,
      outlinedPressablePressedStyle,
      outlinedPressableStyle,
      outlinedTextStyle,
      props,
    ],
  );

  if (isOutlined) return outlinedButton();

  const flatPressableStyle: StyleProp<ViewStyle> = {
    paddingVertical: 6,
    paddingHorizontal: 12,
  };

  const flatTextStyle: StyleProp<TextStyle> = {
    textAlign: 'center',
    color: theme().colors.primary200,
  };

  const regularPressableStyle: StyleProp<ViewStyle> = {
    paddingVertical: 8,
    margin: 4,
    backgroundColor: theme().colors.primary800,
  };
  const regularTextStyle: StyleProp<TextStyle> = {
    color: theme().colors.primary50,
  };

  return (
    <Pressable
      style={({ pressed }) => [
        isFlat
          ? { ...flatPressableStyle }
          : isRegular
          ? { ...styles.button, ...regularPressableStyle }
          : styles.button,
        pressed && styles.pressed,
      ]}
      {...props}
      onPress={onPress}>
      <View>
        <Text
          style={
            isFlat
              ? { ...flatTextStyle }
              : isRegular
              ? { ...styles.buttonText, ...regularTextStyle }
              : styles.buttonText
          }>
          {children}
        </Text>
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
