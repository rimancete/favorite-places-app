import { Button } from 'components';
import { Place } from 'models';
import { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import theme from 'styles/theme';
import { PlaceDetailsNavigationProps } from 'types/navigation.types';
import { fetchPlaceDetails } from 'utils/database';

export interface PlaceDetailsParams {
  placeId: number;
}

export default function PlaceDetails({ route, navigation }: PlaceDetailsNavigationProps) {
  const [fetchedPlace, setFetchedPlace] = useState<Place>();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const showOnMapHandler = useCallback(() => {
    navigation.navigate('Map', {
      pickedLocation: { lat: fetchedPlace?.lat as number, lng: fetchedPlace?.lng as number },
    });
  }, [fetchedPlace, navigation]);

  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    async function loadPlace() {
      const place = (await fetchPlaceDetails(selectedPlaceId)) as Place;

      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlace();
  }, [navigation, selectedPlaceId]);

  if (!fetchedPlace)
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading place data...!</Text>
      </View>
    );

  return (
    !!fetchedPlace && (
      <ScrollView>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace.address}</Text>
          </View>
          <Button variant="outlined" icon="map" onPress={showOnMapHandler}>
            View on Map
          </Button>
        </View>
      </ScrollView>
    )
  );
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: theme().colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
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
