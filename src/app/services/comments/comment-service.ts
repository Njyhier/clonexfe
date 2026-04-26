import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Icomment } from '../../interfaces/icomment';
import { IApiResponce } from '../../interfaces/iapi-responce';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
  createComment(
    body: Icomment,
    params: { userId: string; postId: string },
  ): Observable<IApiResponce<Icomment>> {
        console.log("Creating comment",params.postId, params.userId)

    return this.http.post<IApiResponce<Icomment>>(
      `${environment.CORE_URL}/${params.postId}/${params.userId}`,
      body,
    );
  }
}
