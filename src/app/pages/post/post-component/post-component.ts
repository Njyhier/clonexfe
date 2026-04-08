import { Component, inject, OnInit, signal } from '@angular/core';
import { PostService } from '../../../services/posts/post-service';
import { Ipost } from '../../../interfaces/ipost';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../../services/comments/comment-service';
import { LikesService } from '../../../services/likes/likes-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-component.html',
  styleUrl: './post-component.css',
})
export class PostComponent implements OnInit {
  postService = inject(PostService);
  requestedPost = signal<Ipost>({});
  commentService = inject(CommentService);
  likeService = inject(LikesService);
  private activatedRoute = inject(ActivatedRoute);

  comment = new FormControl<string>('');
  getPostById() {
    let postId = '';
    this.activatedRoute.params.subscribe((params) => (postId = params['id']));
    console.log(postId);
    this.postService.getPostById(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.requestedPost.set(res?.payload ?? {});
      },
    });
  }
  creatComment() {
    const comment = this.comment?.value ?? '';
    return this.commentService
      .createComment(
        { text: comment },
        { postId: this.requestedPost()?.id ?? '', userId: this.requestedPost()?.user?.id ?? '' },
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (e) => console.log('Error', e),
      });
  }

  createLike() {
    const postId = this.requestedPost()?.id ?? '';
    const userId = this.requestedPost()?.user?.id ?? '';
    const body = {
      postId: postId,
      userId: userId,
    };
    this.likeService.createLike(body).subscribe((res) => console.log(res));
  }

  ngOnInit(): void {
    this.getPostById();
  }
}
