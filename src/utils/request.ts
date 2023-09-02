import { Env } from '@env';
import axios from 'axios';

const { AUTH_API_URL, AUTH_API_KEY } = Env;

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
