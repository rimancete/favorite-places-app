import { useCallback, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from 'expo-location';

import theme from 'styles/theme';
import getMapPreview from 'utils/location';
import { LocationType } from 'models';
import { useNavigation } from '@react-navigation/native';
import { ScreensNavigationHookProps } from 'types';
import Button from '../Button';

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState<LocationType>();

  const navigation = useNavigation<ScreensNavigationHookProps>();

  const [locationPermission, requestLocationPermission] = useForegroundPermissions();

  const verifyPermissions = useCallback(async () => {
    if (locationPermission?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestLocationPermission();

      return permissionResponse.granted;
    }

    if (locationPermission?.status === PermissionStatus.DENIED) {
      let granted = false;
      Alert.alert(
        'Insuffient Permissions!',
        'You need grant location permissions to use this app.',
        [
          {
            onPress: async () => {
              const permissionResponse = await requestLocationPermission();
              granted = permissionResponse.granted;
            },
          },
        ],
      );
      return granted;
    }

    return true;
  }, [locationPermission, requestLocationPermission]);

  const getLocationHandler = useCallback(async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
  }, [verifyPermissions]);

  const pickOnMapHandler = useCallback(() => {
    navigation.navigate('Map');
  }, [navigation]);

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation)
    locationPreview = (
      <Image style={styles.mapPreviewImage} source={{ uri: getMapPreview(pickedLocation) }} />
    );

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>

      <View style={styles.actions}>
        <Button variant="outlined" icon="my-location" onPress={getLocationHandler}>
          Locate User
        </Button>
        <Button variant="outlined" icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme().colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
    // borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
