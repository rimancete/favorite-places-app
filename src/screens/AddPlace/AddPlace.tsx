import { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

import { FormContainer, ImagePicker, LocationPicker } from 'components';
import theme from 'styles/theme';
import { LocationType, Place } from 'models';
import { PickedLocationType } from 'types/models';
import { AddPlaceNavigationProps } from 'types';

export interface AddPlaceParams {
  pickedLocation?: LocationType;
}

export default function AddPlace({ navigation }: AddPlaceNavigationProps) {
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

  const savePlaceHandler = useCallback(() => {
    const titleIsValid = !!enteredTitle;
    const imageUriIsValid = !!enteredTitle;
    const locationIsValid = !!pickedLocation;

    if (!titleIsValid || !imageUriIsValid || !locationIsValid) {
      Alert.alert('Invalid input', 'Please check your entered place data.');
      return;
    }

    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);

    navigation.navigate('Places', { place: placeData });
  }, [enteredTitle, navigation, pickedLocation, selectedImage]);

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
