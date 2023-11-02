import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';

import { Place } from 'models';
import theme from 'styles/theme';
import PlaceItem from './components/PlaceItem';

interface PlacesListProps {
  places: Place[];
}

export default function PlacesList({ places }: PlacesListProps) {
  if (!places || !places.length)
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
      </View>
    );

  const keyExtractor = (item: Place) => item.id;

  const renderItem = (itemData: ListRenderItemInfo<Place>) => {
    const { item } = itemData;
    return (
      <PlaceItem
        place={item}
        onSelect={() => {
          /* */
        }}
      />
    );
  };
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: theme().colors.primary200,
  },
});
