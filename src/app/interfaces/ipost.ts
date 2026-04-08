import { Icomment } from './icomment';
import { ILike } from './ilike';
import { Iuser } from './iuser';

export interface Ipost {
  id?: string;
  mediaUrl?: string;
  caption?: string;
  comments?: Icomment[];
  likes?: ILike[];
  user?: Iuser;
  createdAt?: Date;
}
