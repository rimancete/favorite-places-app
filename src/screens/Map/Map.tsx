import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

import { LocationType } from 'models';
import { useNavigation } from '@react-navigation/native';
import { MapNavigationProps, ScreensNavigationHookProps } from 'types';
import { IconButton } from 'components';

export interface MapParams {
  pickedLocation?: LocationType;
}

export default function Map({ route }: MapNavigationProps) {
  const { pickedLocation } = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState<LocationType | undefined>(
    pickedLocation,
  );
  const navigation = useNavigation<ScreensNavigationHookProps>();

  const initialLocation = {
    latitude: pickedLocation?.lat || -22.7412029889,
    longitude: pickedLocation?.lng || -47.3438429832,
  };
  const REGION = {
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
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
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton color={tintColor} size={32} icon="save" onPress={savePickedLocation} />
      ),
    });
  }, [navigation, savePickedLocation]);

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
