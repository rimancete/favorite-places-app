import { PlaceType } from 'models';
import { GestureResponderEvent, Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface PlaceItemProps {
  place: PlaceType;
  onSelect: (event: GestureResponderEvent) => void | null;
}

export default function PlaceItem({ place, onSelect }: PlaceItemProps) {
  const { title, address, imageUri } = place;
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: imageUri }} />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
