import { ILike } from './ilike';
import { Iuser } from './iuser';

export interface Icomment {
  user?: Iuser;
  likes?: ILike[];
  text?: string;
  id?: string;
  created_at?: Date;
}
