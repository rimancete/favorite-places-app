import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const REGION = {
  latitude: 37.78,
  longitude: -122.43,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.04021,
};
export default function Map() {
  return <MapView style={styles.map} initialRegion={REGION} />;
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
