import useAuth from "hooks/auth/useAuth";
import { FC, ReactNode } from "react";

type tAuthProvider = {
  children: ReactNode;
};

const AuthProvider: FC<tAuthProvider> = ({ children }) => {
  const { getAuth } = useAuth();
  console.log("getAuth", getAuth());
  return <>{children}</>;
};

export default AuthProvider;
