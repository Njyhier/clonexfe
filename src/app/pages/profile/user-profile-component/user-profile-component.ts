import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Ipost } from '../../../interfaces/ipost';

@Component({
  selector: 'app-profile-component',
  standalone: true,
  imports: [],
  templateUrl: './user-profile-component.html',
  styleUrl: './user-profile-component.css',
})
export class ProfileComponent {
  activeTab = signal<'posts' | 'liked'>('posts');

  profile = {
    id: 'user-001',
    username: 'amani',
    name: 'Amani Mwangi',
    bio: 'Developer • Creator • Coffee enthusiast ☕ Building things that matter.',
    location: 'Nairobi, Kenya',
    website: 'clonex.app',
    avatar: '',
    followers: 1248,
    following: 386,
  };

  posts: Ipost[] = [
    {
      id: 'profile-post-001',
      caption: 'Beautiful evening in Nairobi. 🌅',
      mediaurl:
        'https://images.unsplash.com/photo-1516026672323-2a3b1a4a3f4e?auto=format&fit=crop&w=900&q=80',
      createdAt: new Date('2026-09-22T17:30:00'),
      cxLikes: [{}, {}, {}, {}, {}, {}] as any,
      cxComments: [{}, {}, {}] as any,
    },

    {
      id: 'profile-post-002',
      caption: 'Coffee, code, and a quiet morning. ☕💻',
      mediaurl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
      createdAt: new Date('2026-09-22T14:00:00'),
      cxLikes: [{}, {}, {}, {}, {}, {}, {}, {}, {}] as any,
      cxComments: [{}, {}, {}, {}] as any,
    },

    {
      id: 'profile-post-003',
      caption: 'Working on something exciting. 🚀',
      mediaurl:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80',
      createdAt: new Date('2026-09-21T12:15:00'),
      cxLikes: [{}, {}, {}, {}, {}] as any,
      cxComments: [{}, {}, {}] as any,
    },
  ];

  setTab(tab: 'posts' | 'liked') {
    this.activeTab.set(tab);
  }

  editProfile() {
    console.log('Edit profile');
  }
}
