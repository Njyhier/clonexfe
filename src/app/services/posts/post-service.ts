import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Ipost } from '../../interfaces/ipost';
import { IApiResponce } from '../../interfaces/iapi-responce';
import { environment } from '../../../environments/environment';

interface IPostsResponse extends IApiResponce<Ipost[]> {
  pagination: {
    skip: number;
    limit: number;
    returned: number;
    hasMore: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  getPosts(skip: number = 0, limit: number = 20): Observable<IPostsResponse> {
    return this.http.get<IPostsResponse>(`${environment.CORE_URL}/posts/readposts`, {
      params: {
        skip,
        limit,
      },
    });
  }

  getPostById(postId: string): Observable<IApiResponce<Ipost>> {
    return this.http.get<IApiResponce<Ipost>>(`${environment.CORE_URL}/posts/${postId}`);
  }

  createPost(user_id: string, data: Ipost): Observable<Ipost> {
    return this.http.post<Ipost>(`${environment.CORE_URL}/posts/users/${user_id}/posts`, data);
  }
}
