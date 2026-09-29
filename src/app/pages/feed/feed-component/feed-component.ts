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

import { PickerComponent } from '@ctrl/ngx-emoji-mart';

import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

import { DatePipe, isPlatformBrowser } from '@angular/common';

import { PostService } from '../../../services/posts/post-service';
import { Ipost } from '../../../interfaces/ipost';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommentService } from '../../../services/comments/comment-service';
import { Router } from '@angular/router';
import { UploadFileService } from '../../../services/uploadfile/upload-file-service';
import { AuthService } from '../../../services/auth/auth-service';
import { HostListener } from '@angular/core';
import { LikesService } from '../../../services/likes/likes-service';

@Component({
  selector: 'app-feed-component',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, ImageCropperComponent, PickerComponent],
  templateUrl: './feed-component.html',
  styleUrl: './feed-component.css',
})
export class FeedComponent implements OnInit, AfterViewInit, OnDestroy {
  authService = inject(AuthService);
  likeService = inject(LikesService);
  textareaHidden = true;
  activeId = '';

  imagePreview = signal<string | null>(null);

  croppedImage = signal<Blob | null>(null);

  showCropper = signal(false);

  postSuccess = signal('');
  postError = signal('');
  isCreatingPost = signal(false);

  posts = signal<Ipost[]>([]);

  commentService = inject(CommentService);

  private postService = inject(PostService);

  private platformId = inject(PLATFORM_ID);

  router = inject(Router);

  constructor(private uploadService: UploadFileService) {}

  readonly pageSize = 20;

  currentSkip = 0;

  isLoadingMore = signal(false);

  hasMorePosts = signal(true);

  @ViewChild('loadMoreTrigger')
  loadMoreTrigger?: ElementRef<HTMLDivElement>;

  private intersectionObserver?: IntersectionObserver;

  postForm = new FormGroup({
    caption: new FormControl<string>(''),
    image: new FormControl<File | null>(null),
  });

  comment = new FormControl<string>('');

  showCaptionEmojiPicker = signal(false);
  showCommentEmojiPicker = signal(false);

  toggleCaptionEmojiPicker() {
    this.showCaptionEmojiPicker.update((value) => !value);
    this.showCommentEmojiPicker.set(false);
  }

  toggleCommentEmojiPicker() {
    this.showCommentEmojiPicker.update((value) => !value);
    this.showCaptionEmojiPicker.set(false);
  }

  addCaptionEmoji(event: any) {
    const emoji = event?.emoji?.native;

    if (!emoji) {
      return;
    }

    const currentCaption = this.postForm.controls.caption.value ?? '';

    this.postForm.controls.caption.setValue(currentCaption + emoji);
  }

  addCommentEmoji(event: any) {
    const emoji = event?.emoji?.native;

    if (!emoji) {
      return;
    }

    const currentComment = this.comment.value ?? '';

    this.comment.setValue(currentComment + emoji);
  }

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.postForm.patchValue({
      image: file,
    });

    const previousPreview = this.imagePreview();

    if (previousPreview) {
      URL.revokeObjectURL(previousPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    this.imagePreview.set(previewUrl);
  }

  openCropper() {
    if (!this.postForm.value.image) {
      return;
    }

    this.croppedImage.set(null);
    this.showCropper.set(true);
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.croppedImage.set(event.blob);
    }
  }

  cancelCrop() {
    this.croppedImage.set(null);
    this.showCropper.set(false);
  }

  applyCrop() {
    const cropped = this.croppedImage();

    if (!cropped) {
      return;
    }

    const originalFile = this.postForm.value.image;

    const fileName = originalFile?.name ?? 'cropped-image.jpg';

    const croppedFile = new File([cropped], fileName, {
      type: cropped.type || 'image/jpeg',
    });

    this.postForm.patchValue({
      image: croppedFile,
    });

    const previousPreview = this.imagePreview();

    if (previousPreview) {
      URL.revokeObjectURL(previousPreview);
    }

    const previewUrl = URL.createObjectURL(croppedFile);

    this.imagePreview.set(previewUrl);

    this.croppedImage.set(null);
    this.showCropper.set(false);
  }

  removeSelectedImage() {
    const currentPreview = this.imagePreview();

    if (currentPreview) {
      URL.revokeObjectURL(currentPreview);
    }

    this.imagePreview.set(null);
    this.croppedImage.set(null);
    this.showCropper.set(false);

    this.postForm.patchValue({
      image: null,
    });
  }
  registerPost() {
    this.postSuccess.set('');
    this.postError.set('');

    const userId = this.authService.currentUser()?.id;

    if (!userId) {
      this.postError.set('You must be logged in to create a post.');
      return;
    }

    const image = this.postForm.value.image;

    if (!image) {
      this.postError.set('Please select an image.');
      return;
    }

    const caption = this.postForm.value.caption ?? '';

    this.isCreatingPost.set(true);

    this.uploadService.uploadImage(image).subscribe({
      next: (uploadResponse) => {
        const imageUrl = uploadResponse.url ?? '';

        const data = {
          caption,
          mediaUrl: imageUrl,
        };

        this.postService.createPost(userId, data).subscribe({
          next: (response) => {
            // console.log('Created post:', response);

            if (response.payload) {
              this.posts.update((posts) => [response.payload!, ...posts]);
            }

            this.postSuccess.set(response?.message ?? 'Post created successfully!');

            this.isCreatingPost.set(false);

            this.postForm.reset();
            this.removeSelectedImage();
          },

          error: (error) => {
            console.error('Post creation error:', error);

            this.postError.set(
              error?.error?.message ??
                error?.error?.error ??
                'Failed to create post. Please try again.',
            );

            this.isCreatingPost.set(false);
          },
        });
      },

      error: (error) => {
        console.error('Image upload error:', error);

        this.postError.set(
          error?.error?.message ?? error?.error?.error ?? 'Image upload failed. Please try again.',
        );

        this.isCreatingPost.set(false);
      },
    });
  }

  creatComment() {
    const userId = this.authService.currentUser()?.id ?? '';
    const comment = this.comment?.value?.trim() ?? '';

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    if (!comment) {
      alert('Please enter a comment');
      return;
    }

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
        next: (res) => res,

        error: (e) => console.error('Error', e),
      });
  }

  private resetIntersectionObserver() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.intersectionObserver?.disconnect();
    this.intersectionObserver = undefined;

    this.observeLoadMoreTrigger();
  }

  displayFeed() {
    // console.log('getting first 20 posts');

    this.currentSkip = 0;
    this.hasMorePosts.set(true);
    this.isLoadingMore.set(true);

    return this.postService.getPosts(0, this.pageSize).subscribe({
      next: (res) => {
        // console.log('First posts:', res);

        this.posts.set(res?.payload ?? []);

        this.currentSkip = res?.pagination?.returned ?? 0;

        this.hasMorePosts.set(res?.pagination?.hasMore ?? false);

        this.isLoadingMore.set(false);

        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.resetIntersectionObserver();
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
        // console.log('More posts:', res);

        const newPosts = res?.payload ?? [];

        this.posts.update((currentPosts) => [...currentPosts, ...newPosts]);

        this.currentSkip += newPosts.length;

        this.hasMorePosts.set(res?.pagination?.hasMore ?? false);

        this.isLoadingMore.set(false);

        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.resetIntersectionObserver();
          });
        }
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

        if (entry.isIntersecting && this.hasMorePosts()) {
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
    this.postService.getPostById(postId).subscribe((res) => res);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.caption-input-wrapper') && this.showCaptionEmojiPicker()) {
      this.showCaptionEmojiPicker.set(false);
    }

    if (!target.closest('.comment-area-wrapper') && this.showCommentEmojiPicker()) {
      this.showCommentEmojiPicker.set(false);
    }
  }

  toggleLike(post: Ipost) {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      alert('You must be logged in');
      this.router.navigate(['/login']);
    }

    const existingLike = this.likeService.getUserLike(post.cxLikes ?? [], userId ?? '');

    if (existingLike) {
      // User already liked → unlike
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
}
