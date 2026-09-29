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

// export const testPosts: Ipost[] = [
//   {
//     id: 'post-001',
//     caption:
//       'Beautiful evening in Nairobi. Sometimes you just need to slow down and enjoy the moment. 🌅',

//     mediaurl:
//       'https://images.unsplash.com/photo-1516026672323-2a3b1a4a3f4e?auto=format&fit=crop&w=1200&q=80',

//     createdAt: new Date('2026-09-22T17:30:00'),

//     cxUser: {
//       id: 'user-001',
//       username: 'amani',
//     } as Iuser,

//     cxLikes: [
//       { id: 'like-001', userId: 'user-002' } as ILike,
//       { id: 'like-002', userId: 'user-003' } as ILike,
//       { id: 'like-003', userId: 'user-004' } as ILike,
//       { id: 'like-004', userId: 'user-005' } as ILike,
//       { id: 'like-005', userId: 'user-006' } as ILike,
//       { id: 'like-006', userId: 'user-007' } as ILike,
//       { id: 'like-007', userId: 'user-008' } as ILike,
//       { id: 'like-008', userId: 'user-009' } as ILike,
//       { id: 'like-009', userId: 'user-010' } as ILike,
//       { id: 'like-010', userId: 'user-011' } as ILike,
//       { id: 'like-011', userId: 'user-012' } as ILike,
//     ],

//     cxComments: [
//       {
//         id: 'comment-001',
//         text: 'This view is beautiful! 🔥',
//         created_at: new Date('2026-09-22T17:45:00'),
//         user: {
//           id: 'user-002',
//           username: 'briank',
//         } as Iuser,
//         likes: [
//           { id: 'like-012', userId: 'user-003' } as ILike,
//           { id: 'like-013', userId: 'user-004' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-002',
//         text: 'Nairobi sunsets never disappoint 😍',
//         created_at: new Date('2026-09-22T17:52:00'),
//         user: {
//           id: 'user-003',
//           username: 'zuri',
//         } as Iuser,
//         likes: [
//           { id: 'like-014', userId: 'user-001' } as ILike,
//           { id: 'like-015', userId: 'user-005' } as ILike,
//           { id: 'like-016', userId: 'user-006' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-003',
//         text: 'Such a peaceful moment.',
//         created_at: new Date('2026-09-22T18:03:00'),
//         user: {
//           id: 'user-004',
//           username: 'kevin',
//         } as Iuser,
//         likes: [{ id: 'like-017', userId: 'user-002' } as ILike],
//       },
//       {
//         id: 'comment-004',
//         text: 'Where exactly is this? 👀',
//         created_at: new Date('2026-09-22T18:15:00'),
//         user: {
//           id: 'user-005',
//           username: 'nia',
//         } as Iuser,
//         likes: [],
//       },
//     ],
//   },

//   {
//     id: 'post-002',
//     caption:
//       'Coffee, code, and a quiet morning. The perfect combination for getting things done. ☕💻',

//     mediaurl:
//       'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',

//     createdAt: new Date('2026-09-22T14:00:00'),

//     cxUser: {
//       id: 'user-002',
//       username: 'briank',
//     } as Iuser,

//     cxLikes: [
//       { id: 'like-018', userId: 'user-001' } as ILike,
//       { id: 'like-019', userId: 'user-003' } as ILike,
//       { id: 'like-020', userId: 'user-004' } as ILike,
//       { id: 'like-021', userId: 'user-005' } as ILike,
//       { id: 'like-022', userId: 'user-006' } as ILike,
//       { id: 'like-023', userId: 'user-007' } as ILike,
//       { id: 'like-024', userId: 'user-008' } as ILike,
//       { id: 'like-025', userId: 'user-009' } as ILike,
//       { id: 'like-026', userId: 'user-010' } as ILike,
//       { id: 'like-027', userId: 'user-011' } as ILike,
//       { id: 'like-028', userId: 'user-012' } as ILike,
//       { id: 'like-029', userId: 'user-013' } as ILike,
//       { id: 'like-030', userId: 'user-014' } as ILike,
//       { id: 'like-031', userId: 'user-015' } as ILike,
//     ],

//     cxComments: [
//       {
//         id: 'comment-005',
//         text: 'This is literally my kind of morning 😂☕',
//         created_at: new Date('2026-09-22T14:15:00'),
//         user: {
//           id: 'user-001',
//           username: 'amani',
//         } as Iuser,
//         likes: [
//           { id: 'like-032', userId: 'user-003' } as ILike,
//           { id: 'like-033', userId: 'user-004' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-006',
//         text: 'What are you working on?',
//         created_at: new Date('2026-09-22T14:25:00'),
//         user: {
//           id: 'user-006',
//           username: 'sammy',
//         } as Iuser,
//         likes: [{ id: 'like-034', userId: 'user-002' } as ILike],
//       },
//       {
//         id: 'comment-007',
//         text: 'Coffee + coding = productivity 🚀',
//         created_at: new Date('2026-09-22T14:40:00'),
//         user: {
//           id: 'user-007',
//           username: 'mike',
//         } as Iuser,
//         likes: [
//           { id: 'like-035', userId: 'user-001' } as ILike,
//           { id: 'like-036', userId: 'user-005' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-008',
//         text: 'That setup looks clean!',
//         created_at: new Date('2026-09-22T14:55:00'),
//         user: {
//           id: 'user-008',
//           username: 'faith',
//         } as Iuser,
//         likes: [],
//       },
//     ],
//   },

//   {
//     id: 'post-003',
//     caption:
//       'Weekend adventures with good friends. Life is about collecting moments, not things. 🌍',

//     mediaurl:
//       'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',

//     createdAt: new Date('2026-09-21T18:45:00'),

//     cxUser: {
//       id: 'user-003',
//       username: 'zuri',
//     } as Iuser,

//     cxLikes: [
//       { id: 'like-037', userId: 'user-001' } as ILike,
//       { id: 'like-038', userId: 'user-002' } as ILike,
//       { id: 'like-039', userId: 'user-004' } as ILike,
//       { id: 'like-040', userId: 'user-005' } as ILike,
//       { id: 'like-041', userId: 'user-006' } as ILike,
//       { id: 'like-042', userId: 'user-007' } as ILike,
//       { id: 'like-043', userId: 'user-008' } as ILike,
//       { id: 'like-044', userId: 'user-009' } as ILike,
//       { id: 'like-045', userId: 'user-010' } as ILike,
//       { id: 'like-046', userId: 'user-011' } as ILike,
//       { id: 'like-047', userId: 'user-012' } as ILike,
//       { id: 'like-048', userId: 'user-013' } as ILike,
//       { id: 'like-049', userId: 'user-014' } as ILike,
//       { id: 'like-050', userId: 'user-015' } as ILike,
//       { id: 'like-051', userId: 'user-016' } as ILike,
//       { id: 'like-052', userId: 'user-017' } as ILike,
//     ],

//     cxComments: [
//       {
//         id: 'comment-009',
//         text: 'Looks like you guys had an amazing time! 🌍',
//         created_at: new Date('2026-09-21T19:00:00'),
//         user: {
//           id: 'user-001',
//           username: 'amani',
//         } as Iuser,
//         likes: [
//           { id: 'like-053', userId: 'user-004' } as ILike,
//           { id: 'like-054', userId: 'user-005' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-010',
//         text: 'Memories like these are priceless ❤️',
//         created_at: new Date('2026-09-21T19:12:00'),
//         user: {
//           id: 'user-002',
//           username: 'briank',
//         } as Iuser,
//         likes: [
//           { id: 'like-055', userId: 'user-003' } as ILike,
//           { id: 'like-056', userId: 'user-006' } as ILike,
//           { id: 'like-057', userId: 'user-007' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-011',
//         text: 'We definitely need another trip soon 😂',
//         created_at: new Date('2026-09-21T19:30:00'),
//         user: {
//           id: 'user-004',
//           username: 'kevin',
//         } as Iuser,
//         likes: [{ id: 'like-058', userId: 'user-003' } as ILike],
//       },
//       {
//         id: 'comment-012',
//         text: 'Where was this taken?',
//         created_at: new Date('2026-09-21T19:45:00'),
//         user: {
//           id: 'user-009',
//           username: 'lisa',
//         } as Iuser,
//         likes: [],
//       },
//     ],
//   },

//   {
//     id: 'post-004',
//     caption:
//       'Working on something exciting. There is something satisfying about seeing an idea slowly become real. 🚀',

//     mediaurl:
//       'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',

//     createdAt: new Date('2026-09-21T12:15:00'),

//     cxUser: {
//       id: 'user-004',
//       username: 'kevin',
//     } as Iuser,

//     cxLikes: [
//       { id: 'like-059', userId: 'user-001' } as ILike,
//       { id: 'like-060', userId: 'user-002' } as ILike,
//       { id: 'like-061', userId: 'user-003' } as ILike,
//       { id: 'like-062', userId: 'user-005' } as ILike,
//       { id: 'like-063', userId: 'user-006' } as ILike,
//       { id: 'like-064', userId: 'user-007' } as ILike,
//       { id: 'like-065', userId: 'user-008' } as ILike,
//       { id: 'like-066', userId: 'user-009' } as ILike,
//       { id: 'like-067', userId: 'user-010' } as ILike,
//     ],

//     cxComments: [
//       {
//         id: 'comment-013',
//         text: 'Can’t wait to see the final result! 🚀',
//         created_at: new Date('2026-09-21T12:30:00'),
//         user: {
//           id: 'user-001',
//           username: 'amani',
//         } as Iuser,
//         likes: [
//           { id: 'like-068', userId: 'user-003' } as ILike,
//           { id: 'like-069', userId: 'user-005' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-014',
//         text: 'This looks really interesting 👀',
//         created_at: new Date('2026-09-21T12:45:00'),
//         user: {
//           id: 'user-005',
//           username: 'nia',
//         } as Iuser,
//         likes: [{ id: 'like-070', userId: 'user-004' } as ILike],
//       },
//       {
//         id: 'comment-015',
//         text: 'Keep building! 💪',
//         created_at: new Date('2026-09-21T13:00:00'),
//         user: {
//           id: 'user-006',
//           username: 'sammy',
//         } as Iuser,
//         likes: [
//           { id: 'like-071', userId: 'user-002' } as ILike,
//           { id: 'like-072', userId: 'user-003' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-016',
//         text: 'What stack are you using?',
//         created_at: new Date('2026-09-21T13:20:00'),
//         user: {
//           id: 'user-010',
//           username: 'james',
//         } as Iuser,
//         likes: [],
//       },
//     ],
//   },

//   {
//     id: 'post-005',
//     caption: 'Nature has a way of putting everything into perspective. 🌿',

//     mediaurl:
//       'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',

//     createdAt: new Date('2026-09-20T09:20:00'),

//     cxUser: {
//       id: 'user-005',
//       username: 'nia',
//     } as Iuser,

//     cxLikes: [
//       { id: 'like-073', userId: 'user-001' } as ILike,
//       { id: 'like-074', userId: 'user-002' } as ILike,
//       { id: 'like-075', userId: 'user-003' } as ILike,
//       { id: 'like-076', userId: 'user-004' } as ILike,
//       { id: 'like-077', userId: 'user-006' } as ILike,
//       { id: 'like-078', userId: 'user-007' } as ILike,
//       { id: 'like-079', userId: 'user-008' } as ILike,
//       { id: 'like-080', userId: 'user-009' } as ILike,
//       { id: 'like-081', userId: 'user-010' } as ILike,
//       { id: 'like-082', userId: 'user-011' } as ILike,
//       { id: 'like-083', userId: 'user-012' } as ILike,
//       { id: 'like-084', userId: 'user-013' } as ILike,
//     ],

//     cxComments: [
//       {
//         id: 'comment-017',
//         text: 'Nature really is the best therapy 🌿',
//         created_at: new Date('2026-09-20T09:35:00'),
//         user: {
//           id: 'user-001',
//           username: 'amani',
//         } as Iuser,
//         likes: [
//           { id: 'like-085', userId: 'user-002' } as ILike,
//           { id: 'like-086', userId: 'user-003' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-018',
//         text: 'This is so peaceful.',
//         created_at: new Date('2026-09-20T09:50:00'),
//         user: {
//           id: 'user-003',
//           username: 'zuri',
//         } as Iuser,
//         likes: [{ id: 'like-087', userId: 'user-005' } as ILike],
//       },
//       {
//         id: 'comment-019',
//         text: 'I could spend the whole day here 😍',
//         created_at: new Date('2026-09-20T10:05:00'),
//         user: {
//           id: 'user-007',
//           username: 'mike',
//         } as Iuser,
//         likes: [
//           { id: 'like-088', userId: 'user-001' } as ILike,
//           { id: 'like-089', userId: 'user-004' } as ILike,
//           { id: 'like-090', userId: 'user-006' } as ILike,
//         ],
//       },
//       {
//         id: 'comment-020',
//         text: 'Definitely need more moments like this.',
//         created_at: new Date('2026-09-20T10:20:00'),
//         user: {
//           id: 'user-008',
//           username: 'faith',
//         } as Iuser,
//         likes: [],
//       },
//     ],
//   },
// ];
