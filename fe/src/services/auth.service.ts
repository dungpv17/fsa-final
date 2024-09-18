import API from "@/config/api"
import { LoginInput, RegisterInput } from "@/types/auth.types"

export const AuthService = {
  login: async (data: LoginInput) => {
    return API.login(data)
  },
  logout: () => {
    return API.logout()
  },
  register: async (data: RegisterInput) => {
    return await API.register(data)
  },
  getUser: async () => {
    return await API.getUser()
  },
}