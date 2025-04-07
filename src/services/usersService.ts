import ApiService from "./apiService";

export interface User {
  _id: string;
  username: string;
}

interface AuthUser {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export class UsersService {
  static async getAll(): Promise<User[]> {
    return ApiService.get<User[]>("/users/all");
  }

  static async signUp(user: AuthUser): Promise<AuthResponse> {
    return ApiService.post<AuthResponse, AuthUser>("/auth/sign-up", user);
  }

  static async signIn(user: AuthUser): Promise<AuthResponse> {
    return ApiService.post<AuthResponse, AuthUser>("/auth/sign-in", user);
  }
}
