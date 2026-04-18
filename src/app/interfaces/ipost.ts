import { Icomment } from './icomment';
import { ILike } from './ilike';
import { Iuser } from './iuser';

export interface Ipost {
  id?: string;
  mediaurl?: string;
  caption?: string;
  cxComments?: Icomment[];
  cxLikes?: ILike[];
  cxUser?: Iuser;
  createdAt?: Date;
}
