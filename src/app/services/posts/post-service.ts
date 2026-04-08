import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Ipost } from '../../interfaces/ipost';
import { IApiResponce } from '../../interfaces/iapi-responce';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  getPosts(): Observable<IApiResponce<Ipost[]>> {
    return this.http.get<IApiResponce<Ipost[]>>('http://localhost:3000/posts/readposts');
  }

  getPostById(postId: string): Observable<IApiResponce<Ipost>> {
    return this.http.get<IApiResponce<Ipost>>(`http://localhost:3000/posts/${postId}`);
  }
}
