import { inject, Injectable, signal } from '@angular/core';
import { sign } from 'crypto';
import { Iuser } from '../../interfaces/iuser';
import { Observable } from 'rxjs';
import { Ipost } from '../../interfaces/ipost';
import {
  IApiResponce,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '../../interfaces/iapi-responce';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface LoginParams {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<Iuser | null>(null);
  login({ password, username }: LoginParams): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.CORE_URL}/auth/login`, {
      password: password,
      username: username,
    });
  }

  signup(data: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${environment.CORE_URL}/auth/signup`, data);
  }
}
