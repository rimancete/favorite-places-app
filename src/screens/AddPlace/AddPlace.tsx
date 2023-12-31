import { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

import { FormContainer, ImagePicker, LocationPicker } from 'components';
import theme from 'styles/theme';
import { LocationType, Place } from 'models';
import { PickedLocationType } from 'types/models';
import { AddPlaceNavigationProps } from 'types';
import { request } from 'utils/request';
import { insertPlace } from 'utils/database';
import { useAuth } from 'hooks';
import { User } from 'hooks/useAuth/useAuth';

export interface AddPlaceParams {
  pickedLocation?: LocationType;
}

export default function AddPlace({ navigation }: AddPlaceNavigationProps) {
  const { updateUser } = useAuth();

  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState<PickedLocationType>();
  const [selectedImage, setSelectedImage] = useState('');

  const changeTitleHandler = useCallback((text: string) => {
    setEnteredTitle(text);
  }, []);

  const takeImagehandler = useCallback((imageUri: string) => {
    setSelectedImage(imageUri);
  }, []);
  const pickLocationHandler = useCallback((location: PickedLocationType) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = useCallback(async () => {
    const titleIsValid = !!enteredTitle;
    const imageUriIsValid = !!enteredTitle;
    const locationIsValid = !!pickedLocation;

    if (!titleIsValid || !imageUriIsValid || !locationIsValid) {
      Alert.alert('Invalid input', 'Please check your entered place data.');
      return;
    }

    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    const response = await request({ body: placeData });

    if (!response.errorMessage) {
      await insertPlace(placeData); // CHANGE LOGICAL TO INSERT ID BY API REST
      navigation.navigate('Places');
      return;
    }
    Alert.alert('Authentication failed!', 'Please signin and try again.', [
      {
        onPress: async () => {
          updateUser({} as User);
          navigation.navigate('Login');
        },
      },
    ]);
  }, [enteredTitle, navigation, pickedLocation, selectedImage, updateUser]);

  return (
    <FormContainer onSubmit={savePlaceHandler}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
      </View>
      <ImagePicker onTakeImage={takeImagehandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme().colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: theme().colors.primary700,
    borderBottomWidth: 2,
    borderRadius: 4,
    backgroundColor: theme().colors.primary100,
  },
});
