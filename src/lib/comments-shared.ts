export interface BlogComment {
  id: string;
  postSlug: string;
  postId?: string; // Relation reference id in Cockpit
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string; // ISO String
  parentId?: string; // ID of parent comment for replies
  isAdmin?: boolean; // Highlight comments from the website owner
}

export interface ThreadedComment extends BlogComment {
  replies: ThreadedComment[];
}

export interface CockpitComment {
  _id: string;
  name: string;
  email: string;
  content: string;
  status: string;
  _pid: string | null;
  _created: number;
  post: {
    _model: string;
    _id: string;
    slug?: string;
  };
}

/**
 * Builds a threaded tree structure from a flat list of comments.
 * This is safe to run on both client and server.
 */
export function buildCommentTree(comments: BlogComment[]): ThreadedComment[] {
  const commentMap = new Map<string, ThreadedComment>();
  const rootComments: ThreadedComment[] = [];

  // Create threaded comment objects and map them by ID
  comments.forEach((c) => {
    commentMap.set(c.id, { ...c, replies: [] });
  });

  // Thread replies into parent comments or add to root list
  comments.forEach((c) => {
    const threaded = commentMap.get(c.id);
    if (!threaded) return;

    if (c.parentId && commentMap.has(c.parentId)) {
      const parent = commentMap.get(c.parentId);
      parent?.replies.push(threaded);
    } else {
      rootComments.push(threaded);
    }
  });

  // Sort comments and replies by date (oldest first)
  const sortByDate = (a: ThreadedComment, b: ThreadedComment) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

  rootComments.sort(sortByDate);
  commentMap.forEach((c) => {
    c.replies.sort(sortByDate);
  });

  return rootComments;
}
