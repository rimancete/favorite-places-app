import { Env } from '@env';
import { LocationType } from 'models';

const { GOOGLE_API_KEY } = Env;

export default function getMapPreview({ lat, lng }: LocationType) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}
