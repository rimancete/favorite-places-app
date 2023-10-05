type LocationType = {
  lat: number;
  lng: number;
};

type PlaceType = {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: LocationType;
};

export { PlaceType, LocationType };
