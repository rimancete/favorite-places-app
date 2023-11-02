import { Env } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Place } from 'models';

const { AUTH_API_URL, AUTH_API_KEY, API_URL } = Env;

async function authenticate(
  mode: 'signUp' | 'signInWithPassword',
  email: string,
  password: string,
) {
  const authUrl = `${AUTH_API_URL}${mode}?key=${AUTH_API_KEY}`;

  const response = await axios.post(authUrl, {
    email,
    password,
    returnSecureToken: true,
  });

  const userData = response.data;

  return userData;
}

export function createUser(email: string, password: string) {
  return authenticate('signUp', email, password);
}

export function login(email: string, password: string) {
  return authenticate('signInWithPassword', email, password);
}

interface RequestProps {
  body: Place;
}

export async function request({ body }: RequestProps) {
  const storedToken = await AsyncStorage.getItem('token');
  const url = `${API_URL}/places.json?auth=${storedToken}`;

  return axios
    .post(url, { ...body })
    .then((response) => {
      const { data } = response;

      return data.name;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('error', err.message);
      return { errorMessage: err.message, errors: err };
    });
}
