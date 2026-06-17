'use server';

import { revalidatePath } from 'next/cache';
import { addComment } from '@/lib/comments';

export interface CommentFormState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADMIN_EMAIL = 'contact@shuvamrahamusic.com';

/**
 * Server Action to submit a comment for a blog post.
 */
export async function submitCommentAction(
  prevState: CommentFormState | null,
  formData: FormData
): Promise<CommentFormState> {
  const postSlug = formData.get('postSlug') as string;
  const postId = formData.get('postId') as string | null;
  const parentId = formData.get('parentId') as string | null;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const content = formData.get('content') as string;
  const honeypot = formData.get('_honeypot') as string;

  // Bot honeypot check (field must remain empty for legitimate users)
  if (honeypot) {
    console.warn('Bot comment submission blocked via honeypot field.');
    return {
      success: true,
      message: 'Comment posted successfully (filtered as spam).',
    };
  }

  // Validate parameters
  const errors: Record<string, string[]> = {};

  if (!postSlug || postSlug.trim() === '') {
    errors.postSlug = ['Post slug is missing'];
  }

  if (!name || name.trim().length < 2) {
    errors.name = ['Name must be at least 2 characters long'];
  } else if (name.trim().length > 50) {
    errors.name = ['Name cannot exceed 50 characters'];
  }

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    errors.email = ['Please provide a valid email address'];
  }

  if (!content || content.trim().length < 3) {
    errors.content = ['Comment must be at least 3 characters long'];
  } else if (content.trim().length > 1000) {
    errors.content = ['Comment cannot exceed 1000 characters'];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedContent = content.trim();

    // Determine if the comment is from the blog administrator
    const isAdmin = trimmedEmail === ADMIN_EMAIL;

    await addComment({
      postSlug,
      postId: postId && postId.trim() !== '' ? postId.trim() : undefined,
      authorName: trimmedName,
      authorEmail: trimmedEmail,
      content: trimmedContent,
      parentId: parentId && parentId.trim() !== '' ? parentId.trim() : undefined,
      isAdmin,
    });

    // Revalidate the blog post page cache to reflect the new comment instantly
    revalidatePath(`/blog/${postSlug}`);

    return {
      success: true,
      message: 'Your comment has been posted successfully!',
    };
  } catch (error) {
    console.error('Error posting comment in server action:', error);
    return {
      success: false,
      message: 'Failed to post comment due to a server error. Please try again later.',
    };
  }
}
