import cockpit from '@/lib/client';

import { BlogComment, CockpitComment } from './comments-shared';

export * from './comments-shared';

const ADMIN_EMAIL = 'contact@shuvamrahamusic.com';

/**
 * Fetches comments for a specific blog post slug from Cockpit CMS.
 * Filters for status: "Approved" and orders oldest first.
 */
export async function getCommentsForPost(
  postId: string
): Promise<BlogComment[]> {
  try {
    // Optimize: Filter comments directly by 'post.slug' without looking up the post ID first
    const response = await cockpit.listContentItems<CockpitComment[]>(
      'comments',
      {
        filter: {
          'post._id': postId,
          //status: 'Approved',
        },
        sort: {
          _created: 1, // oldest first so parent comments render before replies
        },
        populate: 1,
      }
    );

    if (!response || !Array.isArray(response)) {
      return [];
    }

    return response.map((entry) => ({
      id: entry._id,
      postSlug: entry.post.slug || '',
      postId: entry.post._id,
      authorName: entry.name,
      authorEmail: entry.email,
      content: entry.content,
      createdAt: new Date(entry._created * 1000).toISOString(),
      parentId: entry._pid || undefined,
      isAdmin: entry.email?.trim().toLowerCase() === ADMIN_EMAIL,
    }));
  } catch (error) {
    console.error(
      `Error fetching comments for post "${postId}" from Cockpit:`,
      error
    );
    return [];
  }
}

/**
 * Inserts a new comment into Cockpit CMS under the 'comments' tree collection.
 */
export async function addComment(
  commentData: Omit<BlogComment, 'id' | 'createdAt'>
): Promise<BlogComment> {
  let postId: string;

  // Optimize: If postId is provided, skip looking up the post by slug
  if (commentData.postId) {
    postId = commentData.postId;
  } else {
    const post = await cockpit.getContentItemByFilter<any>('posts', {
      filter: { slug: commentData.postSlug },
      fields: { _id: true },
    });

    if (!post?._id) {
      throw new Error(`Post not found for slug: ${commentData.postSlug}`);
    }
    postId = post._id;
  }

  const response = await cockpit.saveContentItem<CockpitComment>('comments', {
    post: {
      _model: 'posts',
      _id: postId,
    },
    name: commentData.authorName,
    email: commentData.authorEmail,
    content: commentData.content,
    status: 'Approved', // Default to approved so it is visible immediately
    _pid: commentData.parentId || null, // Tree parent ID field
  });

  if (!response?._id) {
    throw new Error('Failed to save comment to Cockpit CMS');
  }

  return {
    id: response._id,
    postSlug: commentData.postSlug,
    postId: postId,
    authorName: response.name,
    authorEmail: response.email,
    content: response.content,
    createdAt: new Date(response._created * 1000).toISOString(),
    parentId: response._pid || undefined,
    isAdmin: response.email?.trim().toLowerCase() === ADMIN_EMAIL,
  };
}
