import { useIsFocused } from '@react-navigation/native';
import { PlacesList } from 'components';
import { Place } from 'models';
import { useEffect, useState } from 'react';
import { PlacesNavigationProps } from 'types/navigation.types';

export interface PlacesParams {
  place?: Place;
}

export default function Places({ route }: PlacesNavigationProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && !!route.params?.place) {
      const { place } = route.params;
      setPlaces((prev) => [...prev, place]);
    }
  }, [isFocused, route.params]);
  return <PlacesList places={places} />;
}
