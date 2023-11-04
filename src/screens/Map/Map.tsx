import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

import { LocationType } from 'models';
import { useNavigation } from '@react-navigation/native';
import { MapNavigationProps, ScreensNavigationHookProps } from 'types';
import { IconButton } from 'components';

export interface MapParams {
  pickedLocation?: LocationType | Record<string, never>;
}

export default function Map({ route }: MapNavigationProps) {
  const { pickedLocation } = route.params || {};

  const initialLocation = useMemo(() => {
    return (
      !!pickedLocation?.lat && {
        lat: pickedLocation.lat,
        lng: pickedLocation.lng,
      }
    );
  }, [pickedLocation]);

  const [selectedLocation, setSelectedLocation] = useState<LocationType | undefined | false>(
    initialLocation,
  );
  const navigation = useNavigation<ScreensNavigationHookProps>();

  const REGION = {
    latitude: initialLocation ? initialLocation.lat : -22.7412029889,
    longitude: initialLocation ? initialLocation.lng : -47.3438429832,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.04021,
  };

  const selectLocationHandler = useCallback((event: MapPressEvent) => {
    const { latitude: lat, longitude: lng } = event.nativeEvent.coordinate;

    setSelectedLocation({ lat, lng });
  }, []);

  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked',
        'you have to pick a location (by tapping on the map) first!',
      );
      return;
    }
    navigation.navigate('AddPlace', { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    // SOLVE EDITING MODE HEADER
    console.log('Map - initialLocation', initialLocation);
    console.log('Map - pickedLocation', pickedLocation);

    if (initialLocation || initialLocation !== false) {
      navigation.setOptions({
        title: 'View Location',
      });
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton color={tintColor} size={32} icon="save" onPress={savePickedLocation} />
      ),
    });
  }, [initialLocation, navigation, savePickedLocation]);

  return (
    <MapView style={styles.map} initialRegion={REGION} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
          title="Picked Location"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
