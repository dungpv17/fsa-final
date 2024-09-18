
import { AxiosInstance } from "@/lib/api-client";
import { AuthResponse } from "@/types/api";
import { LoginInput, RegisterInput } from "@/types/auth.types";
import { ENDPOINT_API } from "@/utils/enums";

const API = {
  login: (data: LoginInput): Promise<AuthResponse> => AxiosInstance.post(ENDPOINT_API.LOGIN, data),
  logout: () => AxiosInstance.post(ENDPOINT_API.LOGOUT),
  register: (data: RegisterInput): Promise<AuthResponse> => AxiosInstance.post(ENDPOINT_API.REGISTER, data),
  getUser: () => AxiosInstance.get(ENDPOINT_API.USER),

}

export default API;