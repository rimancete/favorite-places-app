import { useCallback, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

import theme from 'styles/theme';
import Button from '../Button';

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState<string | undefined>();
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

    if (image.assets) setPickedImage(image.assets[0].uri);
  }, [verifyPermissions]);

  let imagePreview = <Text>No image taken yet</Text>;

  if (pickedImage) imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button onPress={takeImageHandler} variant="outlined">
        Take Image
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme().colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
