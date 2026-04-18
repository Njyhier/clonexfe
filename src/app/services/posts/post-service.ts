import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Ipost } from '../../interfaces/ipost';
import { IApiResponce } from '../../interfaces/iapi-responce';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  getPosts(): Observable<IApiResponce<Ipost[]>> {
    return this.http.get<IApiResponce<Ipost[]>>(`${environment.CORE_URL}/posts/readposts`);
  }

  getPostById(postId: string): Observable<IApiResponce<Ipost>> {
    return this.http.get<IApiResponce<Ipost>>(`${environment.CORE_URL}/posts/${postId}`);
  }
  createPost(){
    this.http.post(`${environment.CORE_URL}/posts/createposts`, {})
  }
}
