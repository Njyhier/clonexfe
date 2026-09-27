import { Iuser } from './iuser';

export interface IApiResponce<T> {
  message?: string;
  payload?: T;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignupUser {
  id: number;
  cxusername: string;
  email: string;
  createdAt: string;
}

export interface SignupResponse {
  message: string;
  payload: SignupUser;
}
export interface LoginResponse {
  message: string;
  payload: {
    token: string;
    user: Iuser;
  };
}
