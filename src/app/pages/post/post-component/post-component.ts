import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostService } from '../../../services/posts/post-service';
import { Ipost } from '../../../interfaces/ipost';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../../services/comments/comment-service';
import { LikesService } from '../../../services/likes/likes-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { AuthService } from '../../../services/auth/auth-service';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-post-component',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, PickerComponent],
  templateUrl: './post-component.html',
  styleUrl: './post-component.css',
})
export class PostComponent implements OnInit {
  private router = inject(Router);
  postService = inject(PostService);

  authService = inject(AuthService);

  commentService = inject(CommentService);

  requestedPost = signal<Ipost | null>(null);

  likeService = inject(LikesService);

  private activatedRoute = inject(ActivatedRoute);

  comment = new FormControl<string>('');

  showEmojiPicker = signal(false);

  getPostById() {
    let postId = '';

    this.activatedRoute.params.subscribe((params) => (postId = params['id']));

    // console.log(postId);

    this.postService.getPostById(postId).subscribe({
      next: (res) => {
        // console.log(res);

        this.requestedPost.set(res?.payload ?? null);
      },

      error: (e) => {
        console.error('Error fetching post', e);
      },
    });
  }

  toggleEmojiPicker() {
    this.showEmojiPicker.update((visible) => !visible);
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native;

    const currentComment = this.comment.value ?? '';

    this.comment.setValue(currentComment + emoji);
  }

  creatComment() {
    // console.log('Creating comment');

    const comment = this.comment?.value?.trim() ?? '';

    const userId = this.authService.currentUser()?.id;

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    if (!comment) {
      alert('comment field is empty');
      return;
    }

    return this.commentService
      .createComment(
        {
          text: comment,
        },
        {
          postId: this.requestedPost()?.id ?? '',
          userId: userId,
        },
      )
      .subscribe({
        next: (res) => {
          // console.log(res);

          this.comment.reset();

          this.showEmojiPicker.set(false);
        },

        error: (e) => {
          console.error('Error', e);
        },
      });
  }

  // createLike() {
  //   const postId = this.requestedPost()?.id ?? '';

  //   const userId = this.authService.currentUser()?.id;

  //   const body = {
  //     postId: postId,
  //     userId: userId,
  //   };

  //   this.likeService.createLike(body).subscribe((res) => console.log(res));
  // }

  toggleLike(post: Ipost) {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      alert('You must be logged in');
      this.router.navigate(['/login']);
    }

    const existingLike = this.likeService.getUserLike(post.cxLikes ?? [], userId ?? '');

    if (existingLike) {
      this.likeService.unlikePost(existingLike.id).subscribe({
        next: () => {
          post.cxLikes = post.cxLikes?.filter((like) => like.id !== existingLike.id);
        },
        error: (error) => {
          console.error('Failed to unlike post:', error);
        },
      });

      return;
    }

    // User hasn't liked → like
    this.likeService
      .createLike({
        postId: post.id,
        userId: userId,
      })
      .subscribe({
        next: (response) => {
          if (response.payload) post.cxLikes?.push(response.payload);
        },
        error: (error) => {
          console.error('Failed to like post:', error);
        },
      });
  }
  userHasLiked(post: Ipost) {
    const userId = this.authService.currentUser()?.id;
    if (!userId) return false;
    return this.likeService.hasUserId(post.cxLikes ?? [], userId);
  }
  ngOnInit(): void {
    this.getPostById();
  }
}
