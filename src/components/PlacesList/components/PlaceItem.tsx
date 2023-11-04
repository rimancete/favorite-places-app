import { Place } from 'models';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from 'styles/theme';

interface PlaceItemProps {
  place: Place;
  onSelect: (id: number) => void | null;
}

export default function PlaceItem({ place, onSelect }: PlaceItemProps) {
  const { title, address, imageUri } = place;
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={() => onSelect(place.id as number)}>
      <Image style={styles.image} source={{ uri: imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: theme().colors.primary500,
    elevation: 2,
    ...theme().ioShadow,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: theme().colors.gray700,
  },
  address: {
    fontSize: 12,
    color: theme().colors.gray700,
  },
});
