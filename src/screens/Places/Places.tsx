import { useIsFocused } from '@react-navigation/native';
import { PlacesList } from 'components';
import { Place } from 'models';
import { useEffect, useState } from 'react';
import { fetchPlaces } from 'utils/database';

export default function Places() {
  const [places, setPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const loadedPlaces = (await fetchPlaces()) as Place[];
      setPlaces(loadedPlaces);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);
  return <PlacesList places={places} />;
}
