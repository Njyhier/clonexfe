import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private http = inject(HttpClient);
  createLike(body: object) {
    return this.http.post(`http://localhost:3000/likes/createlike`, body);
  }
}
