import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from 'components/Screens/Screens';

export type AddPlaceNavigationProps = NativeStackScreenProps<RootStackParamList, 'AddPlace'>;
export type PlacesNavigationProps = NativeStackScreenProps<RootStackParamList, 'Places'>;
export type MapNavigationProps = NativeStackScreenProps<RootStackParamList, 'Map'>;
export type PlaceDetailsNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'PlaceDetails'
>;

export type ScreensNavigationHookProps = NativeStackNavigationProp<RootStackParamList>;
