import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Icomment } from '../../interfaces/icomment';
import { IApiResponce } from '../../interfaces/iapi-responce';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
  createComment(
    body: Icomment,
    params: { userId: string; postId: string },
  ): Observable<IApiResponce<Icomment>> {
    return this.http.post<IApiResponce<Icomment>>(
      `http://localhost:3000/comments/createcomment/${params.postId}/${params.userId}`,
      body,
    );
  }
}
