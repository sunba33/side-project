export interface AuthModel {
  identifier: string;
  password: string;
}

export interface UserModel {
  token: string;
}

export interface LoginResponseModel {
  code: number;
  message: string;
  token: string;
}
