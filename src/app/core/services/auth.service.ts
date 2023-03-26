import {Injectable} from '@angular/core';
import { BaseService } from './base.service';
import {AuthResponse, SignUp, Login} from '../interfaces';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
signup(payload: SignUp): Observable<AuthResponse> {
  return this.post<AuthResponse>('auth/signup', payload);
}

  login(payload: Login): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/login', payload);
  }

  refreshToken(refresh: string): Observable<AuthResponse> {
    return this.post('auth/token', { refreshToken: refresh });
  }
}
