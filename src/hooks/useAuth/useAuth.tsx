import { LoginResponse } from 'types/models';
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';

export type User = LoginResponse & { expires?: number };

interface AuthContextData {
  user: User;
  updateUser: Dispatch<SetStateAction<User>>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({} as User);

  const value = useMemo(
    () => ({ user, updateUser: setUser, isAuthenticated: !!user.idToken }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
