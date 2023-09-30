import { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from 'expo-location';

import theme from 'styles/theme';
import Button from '../Button';

export default function LocationPicker() {
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
    console.log(location);
  }, [verifyPermissions]);

  const pickOnMapHandler = useCallback(() => {}, []);

  return (
    <View>
      <View style={styles.mapPreview} />

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
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
