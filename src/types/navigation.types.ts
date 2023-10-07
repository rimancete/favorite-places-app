import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from 'components/Screens/Screens';

export type AddPlaceNavigationProps = NativeStackScreenProps<RootStackParamList, 'AddPlace'>;
export type MapNavigationProps = NativeStackScreenProps<RootStackParamList, 'Map'>;

export type ScreensNavigationHookProps = NativeStackNavigationProp<RootStackParamList>;
