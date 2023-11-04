import { Button } from 'components';
import { useCallback, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import theme from 'styles/theme';
import { PlaceDetailsNavigationProps } from 'types/navigation.types';

export interface PlaceDetailsParams {
  placeId: number;
}

export default function PlaceDetails({ route }: PlaceDetailsNavigationProps) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const showOnMapHandler = useCallback(() => {}, []);

  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    console.log(selectedPlaceId);
    // USE SELECTEDPLACEID TO FETCH DATA FOR A SINGLE PLACE
  }, [selectedPlaceId]);
  return (
    <ScrollView>
      <Image style={styles.image} source={1} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>ADDRESS</Text>
        </View>
        <Button variant="outlined" icon="map" onPress={showOnMapHandler}>
          View on Map
        </Button>
      </View>
    </ScrollView>
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
});
