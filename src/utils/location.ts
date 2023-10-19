import { Env } from '@env';
import { LocationType } from 'models';

const { GOOGLE_API_KEY } = Env;

export function getMapPreview({ lat, lng }: LocationType) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress({ lat, lng }: LocationType) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error_message) throw new Error('Failed to fetch address!');

  const address: string = data.results[0].formatted_address;

  return address;
}
