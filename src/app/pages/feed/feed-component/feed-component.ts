import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';

import { DatePipe, isPlatformBrowser } from '@angular/common';

import { PostService } from '../../../services/posts/post-service';
import { Ipost, testPosts } from '../../../interfaces/ipost';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommentService } from '../../../services/comments/comment-service';
import { Router } from '@angular/router';
import { UploadFileService } from '../../../services/uploadfile/upload-file-service';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-feed-component',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './feed-component.html',
  styleUrl: './feed-component.css',
})
export class FeedComponent implements OnInit, AfterViewInit, OnDestroy {
  authService = inject(AuthService);
  textareaHidden = true;
  activeId = '';

  posts = signal<Ipost[]>(testPosts);

  commentService = inject(CommentService);

  private postService = inject(PostService);

  private platformId = inject(PLATFORM_ID);

  router = inject(Router);

  constructor(private uploadService: UploadFileService) {}

  readonly pageSize = 20;

  currentSkip = 0;

  isLoadingMore = signal(false);

  hasMorePosts = signal(true);

  imagePreview = signal<string | null>(null);

  @ViewChild('loadMoreTrigger')
  loadMoreTrigger?: ElementRef<HTMLDivElement>;

  private intersectionObserver?: IntersectionObserver;

  postForm = new FormGroup({
    caption: new FormControl<string>(''),
    image: new FormControl<File | null>(null),
  });

  comment = new FormControl<string>('');

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.postForm.patchValue({
      image: file,
    });

    const previewUrl = URL.createObjectURL(file);

    this.imagePreview.set(previewUrl);
  }

  removeSelectedImage() {
    const currentPreview = this.imagePreview();

    if (currentPreview) {
      URL.revokeObjectURL(currentPreview);
    }

    this.imagePreview.set(null);

    this.postForm.patchValue({
      image: null,
    });
  }

  registerPost() {
    const userId = this.authService.currentUser()?.id;

    if (!userId) {
      alert('You must be logged in to create a post.');
      return;
    }

    const image = this.postForm.value.image;

    if (!image) {
      alert('Please select an image.');
      return;
    }

    const caption = this.postForm.value.caption ?? '';

    this.uploadService.uploadImage(image).subscribe({
      next: (res) => {
        const imageUrl = res.url ?? '';

        const data = {
          caption,
          mediaUrl: imageUrl,
        };

        this.postService.createPost(userId, data).subscribe({
          next: (res) => {
            alert('Post Created!');

            console.log('createdPost', res);

            this.posts.update((posts) => [res, ...posts]);

            this.postForm.reset();
            this.removeSelectedImage();
          },

          error: (error) => {
            console.error('Post creation error:', error);
            alert('Post Not Created!');
          },
        });
      },

      error: (error) => {
        console.error('Image upload error:', error);
        alert('Image upload failed!');
      },
    });
  }

  creatComment(userId: string) {
    const comment = this.comment?.value ?? '';

    return this.commentService
      .createComment(
        {
          text: comment,
        },
        {
          postId: this.activeId,
          userId: userId,
        },
      )
      .subscribe({
        next: (res) => console.log(res),

        error: (e) => console.log('Error', e),
      });
  }

  displayFeed() {
    console.log('getting first 20 posts');

    this.currentSkip = 0;

    this.hasMorePosts.set(true);

    this.isLoadingMore.set(true);

    return this.postService.getPosts(0, this.pageSize).subscribe({
      next: (res) => {
        console.log('First posts:', res);

        this.posts.set(res?.payload ?? []);

        this.currentSkip = res?.pagination?.returned ?? 0;

        this.hasMorePosts.set(res?.pagination?.hasMore ?? false);

        this.isLoadingMore.set(false);

        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.observeLoadMoreTrigger();
          });
        }
      },

      error: (error) => {
        console.error('Failed to load posts:', error);

        this.isLoadingMore.set(false);
      },
    });
  }

  loadMorePosts() {
    if (this.isLoadingMore() || !this.hasMorePosts()) {
      return;
    }

    console.log(`Loading posts from ${this.currentSkip}`);

    this.isLoadingMore.set(true);

    this.postService.getPosts(this.currentSkip, this.pageSize).subscribe({
      next: (res) => {
        console.log('More posts:', res);

        const newPosts = res?.payload ?? [];

        this.posts.update((currentPosts) => [...currentPosts, ...newPosts]);

        this.currentSkip += newPosts.length;

        this.hasMorePosts.set(res?.pagination?.hasMore ?? false);

        this.isLoadingMore.set(false);
      },

      error: (error) => {
        console.error('Failed to load more posts:', error);

        this.isLoadingMore.set(false);
      },
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.observeLoadMoreTrigger();
    }
  }

  private observeLoadMoreTrigger() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.loadMoreTrigger || this.intersectionObserver) {
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !this.isLoadingMore() && this.hasMorePosts()) {
          this.loadMorePosts();
        }
      },
      {
        root: null,
        rootMargin: '500px',
        threshold: 0,
      },
    );

    this.intersectionObserver.observe(this.loadMoreTrigger.nativeElement);
  }

  goToPost(postId: string, post: Ipost) {
    this.commentService.setSelectedPost(post);

    this.router.navigate(['post', postId]);
  }

  ngOnInit() {
    this.displayFeed();
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect();
  }

  hidetextarea(activeId: string) {
    this.textareaHidden = !this.textareaHidden;

    this.activeId = activeId;
  }

  getPostById(postId: string) {
    this.postService.getPostById(postId).subscribe((res) => console.log(res));
  }
}
