import { useCallback, useState } from 'react';

import { LoadingOverlay } from 'components';
import AuthContent from 'components/Auth/AuthContent';
import { SigninType } from 'types/models';
import { login } from 'utils/request';

export default function Login() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loginHandler = useCallback(async ({ email, password }: SigninType) => {
    setIsAuthenticating(true);
    const userData = await login(email, password);
    // STORE USER DATA OR SHOW LOGIN ERROR
    setIsAuthenticating(false);
  }, []);

  if (isAuthenticating) return <LoadingOverlay message="Logging you in..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}
