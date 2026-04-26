import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private http = inject(HttpClient);
  createLike(body: object) {
    return this.http.post(`${environment.CORE_URL}/likes/createlike`, body);
  }
}
