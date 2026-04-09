import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { PostService } from '../../../services/posts/post-service';
import { Ipost } from '../../../interfaces/ipost';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../../services/comments/comment-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-component',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './feed-component.html',
  styleUrl: './feed-component.css',
})
export class FeedComponent implements OnInit {
  textareaHidden = true;
  activeId = '';
  posts = signal<Ipost[]>([]);
  commentService = inject(CommentService);
  private postService = inject(PostService);
  router = inject(Router);

  postForm = new FormGroup({
    caption: new FormControl(''),
  });

  comment = new FormControl<string>('');

  creatComment(userId: string) {
    const comment = this.comment?.value ?? '';
    return this.commentService
      .createComment({ text: comment }, { postId: this.activeId, userId: userId })
      .subscribe({
        next: (res) => console.log(res),
        error: (e) => console.log('Error', e),
      });
  }

  displayFeed() {
    return this.postService.getPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.posts.set(res?.payload ?? []);
      },
    });
  }
  goToPost(postId: string) {
    this.router.navigate(['post', postId]);
  }
  ngOnInit(): void {
    this.displayFeed();
  }
  hidetextarea(activeId: string) {
    this.textareaHidden = !this.textareaHidden;
    this.activeId = activeId;
  }
  getPostById(postId: string) {
    this.postService.getPostById(postId).subscribe((res) => console.log(res));
  }
}
