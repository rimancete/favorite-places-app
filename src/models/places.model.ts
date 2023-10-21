type LocationType = {
  lat: number;
  lng: number;
  address?: string;
};

class Place {
  id: string;

  title: string;

  imageUri: string;

  address?: string;

  location: LocationType;

  constructor(title: string, imageUri: string, location: LocationType) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng, address: location.address };
    this.id = new Date().toString() + Math.random().toString();
  }
}

export { LocationType, Place };
