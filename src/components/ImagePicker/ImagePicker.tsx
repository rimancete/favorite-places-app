import { useCallback } from 'react';
import { Alert, Button, View } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

export default function ImagePicker() {
  const [cameraPermission, requestPermission] = useCameraPermissions();

  const verifyPermissions = useCallback(async () => {
    if (cameraPermission?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermission?.status === PermissionStatus.DENIED) {
      let granted = false;
      Alert.alert('Insuffient Permissions!', 'You need grant camera permissions to use this app.', [
        {
          onPress: async () => {
            const permissionResponse = await requestPermission();
            granted = permissionResponse.granted;
          },
        },
      ]);
      return granted;
    }

    return true;
  }, [cameraPermission, requestPermission]);

  const takeImageHandler = useCallback(async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [19, 9],
      quality: 0.5,
    });
    console.log('image', image);
  }, [verifyPermissions]);
  return (
    <View>
      {/* <View></View> */}
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}
