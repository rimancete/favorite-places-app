import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';

import { PlaceType } from 'models';
import theme from 'styles/theme';
import PlaceItem from './components/PlaceItem';

interface PlacesListProps {
  places: PlaceType[];
}

export default function PlacesList({ places }: PlacesListProps) {
  if (!places || !places.length)
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
      </View>
    );

  const keyExtractor = (item: PlaceType) => item.id;

  const renderItem = (itemData: ListRenderItemInfo<PlaceType>) => {
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
  return <FlatList data={places} keyExtractor={keyExtractor} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
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
