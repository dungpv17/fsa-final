import { configureAuth } from "react-query-auth";
import { Navigate, useLocation } from "react-router-dom";
import { z } from "zod";

import { AuthResponse, User } from "@/types/api";
import { ENDPOINT_API } from "@/utils/enums";
import { LoginInput, RegisterInput } from "@/types/auth.types";
import { AuthService } from "@/services/auth.service";

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User> => {
  const response = await AuthService.getUser();
  return response.data;
};

const logout = () => {
  return AuthService.logout();
};

export const loginInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(5, "Required"),
});

const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return AuthService.login(data);
};

export const registerInputSchema = z
  .object({
    email: z.string().min(1, "Required"),
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    password: z.string().min(1, "Required"),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, "Required"),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, "Required"),
          teamId: z.null().default(null),
        })
      )
  );

const registerWithEmailAndPassword = (
  data: RegisterInput
): Promise<AuthResponse> => {
  return AuthService.register(data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate
        to={`${ENDPOINT_API.LOGIN}?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return (
    <AuthLoader renderLoading={() => <div>Loading auth ...</div>}>
      {children}
    </AuthLoader>
  );
};
