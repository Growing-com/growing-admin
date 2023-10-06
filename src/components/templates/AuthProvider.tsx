import { FC, ReactNode } from "react";

type tAuthProvider = {
  children: ReactNode;
};

const AuthProvider: FC<tAuthProvider> = ({ children }) => {
  // const { getAuth } = useAuth();
  return <>{children}</>;
};

export default AuthProvider;
