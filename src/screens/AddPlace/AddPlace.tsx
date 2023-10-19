import { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { FormContainer, ImagePicker, LocationPicker } from 'components';
import theme from 'styles/theme';
import { LocationType } from 'models';
import { PickedLocationType } from 'types/models';

export interface AddPlaceParams {
  pickedLocation?: LocationType;
}

export default function AddPlace() {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLoaction, setPickedLoaction] = useState<PickedLocationType>();
  const [selectedImage, setSelectedImage] = useState('');

  const changeTitleHandler = useCallback((text: string) => {
    setEnteredTitle(text);
  }, []);

  const takeImagehandler = useCallback((imageUri: string) => {
    setSelectedImage(imageUri);
  }, []);
  const pickLocationHandler = useCallback((location: PickedLocationType) => {
    setPickedLoaction(location);
  }, []);

  const savePlaceHandler = useCallback(() => {
    console.log('enteredTitle', enteredTitle);
    console.log('selectedImage', selectedImage);
    console.log('pickedLoaction', pickedLoaction);
  }, [enteredTitle, pickedLoaction, selectedImage]);

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
