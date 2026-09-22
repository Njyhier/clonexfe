import { ILike } from './ilike';
import { Ipost } from './ipost';
import { Iuser } from './iuser';

export interface Icomment {
  user?: Iuser;
  likes?: ILike[];
  text?: string;
  id?: string;
  created_at?: Date;
}

export const dummyPost: Ipost = {
  id: 'post-001',

  mediaurl:
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',

  caption:
    'There is something beautiful about slowing down, appreciating the moment, and enjoying the people around you. 🌅',

  createdAt: new Date('2026-09-22T17:30:00'),

  cxUser: {
    id: 'user-001',
    username: 'amani',
  } as Iuser,

  cxLikes: [
    {
      id: 'like-001',
    } as ILike,

    {
      id: 'like-002',
    } as ILike,

    {
      id: 'like-003',
    } as ILike,

    {
      id: 'like-004',
    } as ILike,

    {
      id: 'like-005',
    } as ILike,
  ],

  cxComments: [
    {
      id: 'comment-001',

      text: 'This is such a beautiful shot! 🔥',

      created_at: new Date('2026-09-22T18:00:00'),

      user: {
        id: 'user-002',
        username: 'briank',
      } as Iuser,

      likes: [
        {
          id: 'like-101',
        } as ILike,

        {
          id: 'like-102',
        } as ILike,
      ],
    },

    {
      id: 'comment-002',

      text: 'Absolutely. Sometimes we really need to take a break from everything.',

      created_at: new Date('2026-09-22T18:15:00'),

      user: {
        id: 'user-003',
        username: 'zuri',
      } as Iuser,

      likes: [
        {
          id: 'like-103',
        } as ILike,
      ],
    },

    {
      id: 'comment-003',

      text: 'Great picture! Where was this taken?',

      created_at: new Date('2026-09-22T19:05:00'),

      user: {
        id: 'user-004',
        username: 'kevin',
      } as Iuser,

      likes: [],
    },

    {
      id: 'comment-004',

      text: 'Love this! ❤️',

      created_at: new Date('2026-09-22T19:30:00'),

      user: {
        id: 'user-005',
        username: 'nia',
      } as Iuser,

      likes: [
        {
          id: 'like-104',
        } as ILike,

        {
          id: 'like-105',
        } as ILike,

        {
          id: 'like-106',
        } as ILike,
      ],
    },
  ],
};
