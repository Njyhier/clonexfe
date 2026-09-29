import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ILike } from '../../interfaces/ilike';
import { Observable } from 'rxjs';
import { IApiResponce } from '../../interfaces/iapi-responce';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private http = inject(HttpClient);
  createLike(body: object): Observable<IApiResponce<ILike>> {
    return this.http.post<IApiResponce<ILike>>(`${environment.CORE_URL}/likes/createlike`, body);
  }

  unlikePost(likeId: string) {
    return this.http.delete(`${environment.CORE_URL}/likes/${likeId}`);
  }

  getUserLike(items: ILike[], userId: string): ILike | undefined {
    return items.find((item) => item.cxuserid === userId);
  }

  hasUserId(items: ILike[], userId: string): boolean {
    return !!this.getUserLike(items, userId);
  }
}
