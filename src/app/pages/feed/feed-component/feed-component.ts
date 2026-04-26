import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { PostService } from '../../../services/posts/post-service';
import { Ipost } from '../../../interfaces/ipost';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../../services/comments/comment-service';
import { Router } from '@angular/router';
import { UploadFileService } from '../../../services/uploadfile/upload-file-service';

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

  constructor(private uploadService: UploadFileService) {}

  postForm = new FormGroup({
    caption: new FormControl<string>(''),
    image: new FormControl<File | null>(null),
  });

  onFileSelected(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.postForm.patchValue({ image: file });
      console.log(file);
    }
  }
  registerPost() {
    const image = this.postForm.value.image!;
    console.log(image);
    let imageUrl = signal<string>('');
    const caption = this.postForm.value.caption ?? '';
    this.uploadService.uploadImage(image).subscribe({
      next: (res) => {
        console.log(res.url);
        imageUrl.set(res.url ?? '');
        console.log('Media', imageUrl());
        const data = {
          caption: caption,
          mediaUrl: imageUrl(),
        };
        console.log('DATA', data);
        return this.postService.createPost('cmo4fn8u5000028csg944hq4z', data).subscribe({
          next: (res) => {
            alert('Post Created!');
            console.log('createdPost', res);
            this.posts.update((posts) => [res, ...posts]);
          },
          error: (error) => {
            console.log(error);
            alert('Post Not Created!');
          },
        });
      },

      error: (e) => console.error(e),
    });
    // const imageUrl = this.imgUrl
    console.log('imageurel', imageUrl());
  }

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
    console.log('getting feed');
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
