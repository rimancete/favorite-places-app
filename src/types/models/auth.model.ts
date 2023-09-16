export type SigninType = {
  email: string;
  password: string;
};

export type SignupType = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

export type LoginResponse = {
  localId: string;
  email: string;
  refreshToken: string;
  idToken: string;
};
