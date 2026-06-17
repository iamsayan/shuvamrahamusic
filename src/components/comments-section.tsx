'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { submitCommentAction, type CommentFormState } from '@/app/actions/comments-action';
import { buildCommentTree, type BlogComment, type ThreadedComment } from '@/lib/comments-shared';
import { cn } from '@/lib/utils';
import {
  LuCornerDownRight,
  LuMail,
  LuMessageSquare,
  LuReply,
  LuSend,
  LuShieldCheck,
  LuTriangleAlert,
  LuUser,
  LuX,
} from 'react-icons/lu';

interface CommentsSectionProps {
  postSlug: string;
  postId?: string;
  initialComments: BlogComment[];
}

const initialFormState: CommentFormState = {
  success: undefined,
  message: '',
  errors: {},
};

export default function CommentsSection({ postSlug, postId, initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<BlogComment[]>(initialComments);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  // Persistent user state in LocalStorage for name/email
  const [savedName, setSavedName] = useState('');
  const [savedEmail, setSavedEmail] = useState('');

  useEffect(() => {
    // Sync local state with props when database revalidates on server
    setComments(initialComments);
  }, [initialComments]);

  useEffect(() => {
    // Load saved name and email from localStorage
    if (typeof window !== 'undefined') {
      setSavedName(localStorage.getItem('comment_author_name') || '');
      setSavedEmail(localStorage.getItem('comment_author_email') || '');
    }
  }, []);

  const saveUserData = (name: string, email: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('comment_author_name', name);
      localStorage.setItem('comment_author_email', email);
      setSavedName(name);
      setSavedEmail(email);
    }
  };

  const commentTree = buildCommentTree(comments);

  return (
    <div className="mt-16 border-t border-white/5 pt-12">
      {/* Title Header */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <LuMessageSquare className="size-5" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-black text-white sm:text-xl">
            Discussion
          </h3>
          <p className="text-xs text-gray-500">
            {comments.length === 0
              ? 'No comments yet'
              : `${comments.length} ${comments.length === 1 ? 'Comment' : 'Comments'}`}
          </p>
        </div>
      </div>

      {/* Main Comment Form */}
      <div className="mb-12">
        <CommentForm
          postSlug={postSlug}
          postId={postId}
          savedName={savedName}
          savedEmail={savedEmail}
          onSuccess={saveUserData}
          title="Leave a comment"
        />
      </div>

      {/* Comments List */}
      {commentTree.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/4 bg-white/1 py-12 text-center backdrop-blur-md">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-white/5 text-gray-500">
            <LuMessageSquare className="size-6" />
          </div>
          <h4 className="text-sm font-bold text-gray-300">No thoughts shared yet</h4>
          <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-gray-500">
            Be the first to share your opinion or ask a question about this article!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {commentTree.map((comment) => (
            <CommentNode
              key={comment.id}
              comment={comment}
              postSlug={postSlug}
              postId={postId}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
              savedName={savedName}
              savedEmail={savedEmail}
              onSuccess={saveUserData}
              depth={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Comment Node Component (Recursive for Nested Replies) ──────
interface CommentNodeProps {
  comment: ThreadedComment;
  postSlug: string;
  postId?: string;
  replyingToId: string | null;
  setReplyingToId: (id: string | null) => void;
  savedName: string;
  savedEmail: string;
  onSuccess: (name: string, email: string) => void;
  depth: number;
}

function CommentNode({
  comment,
  postSlug,
  postId,
  replyingToId,
  setReplyingToId,
  savedName,
  savedEmail,
  onSuccess,
  depth,
}: CommentNodeProps) {
  const isReplying = replyingToId === comment.id;

  // Visual avatar settings based on user's name initials
  const initials = getInitials(comment.authorName);
  const avatarStyle = getAvatarStyle(comment.authorName);

  return (
    <div className="group/node flex flex-col gap-4">
      {/* Comment Card */}
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border bg-white/1 p-5 backdrop-blur-md transition-all duration-300',
          comment.isAdmin
            ? 'border-amber-500/20 bg-amber-500/2 hover:border-amber-500/30'
            : 'border-white/5 hover:border-white/10 hover:bg-white/2'
        )}
      >
        {/* Glow effects for Admin comment cards */}
        {comment.isAdmin && (
          <div className="pointer-events-none absolute -right-12 -top-12 size-24 rounded-full bg-amber-500/5 blur-xl" />
        )}

        <div className="flex items-start gap-3.5">
          {/* Initials Avatar */}
          <div
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-xl border text-[11px] font-bold bg-gradient-to-br shadow-inner uppercase tracking-wider',
              comment.isAdmin
                ? 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
                : avatarStyle
            )}
          >
            {initials}
          </div>

          <div className="flex-1 space-y-1.5">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
              <div className="flex flex-wrap items-center gap-x-2">
                <span className="text-xs font-black tracking-wide text-white">
                  {comment.authorName}
                </span>
                {comment.isAdmin && (
                  <span className="rounded-full bg-linear-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[8px] font-black tracking-widest text-black uppercase shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                    Instructor
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase">
                {getRelativeTimeString(comment.createdAt)}
              </span>
            </div>

            {/* Comment Body */}
            <p className="text-xs leading-relaxed text-gray-300 sm:text-sm whitespace-pre-wrap">
              {comment.content}
            </p>

            {/* Actions Footer */}
            <div className="pt-1 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setReplyingToId(isReplying ? null : comment.id)}
                className="group/btn inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-gray-500 uppercase transition-colors hover:text-cyan-400"
              >
                <LuReply className="size-3 transition-transform group-hover/btn:-translate-x-0.5" />
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Reply Form */}
      {isReplying && (
        <div className="ml-6 flex items-start gap-3 sm:ml-12">
          <div className="mt-4 text-gray-600">
            <LuCornerDownRight className="size-5 shrink-0" />
          </div>
          <div className="flex-1">
            <CommentForm
              postSlug={postSlug}
              postId={postId}
              parentId={comment.id}
              savedName={savedName}
              savedEmail={savedEmail}
              onSuccess={(name, email) => {
                onSuccess(name, email);
                setReplyingToId(null);
              }}
              onCancel={() => setReplyingToId(null)}
              title={`Reply to ${comment.authorName}`}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Render Replies recursively */}
      {comment.replies.length > 0 && (
        <div
          className={cn(
            'flex flex-col gap-4',
            // Limit indentation depth to prevent layout overflow on small viewports
            depth < 3
              ? 'border-l border-white/5 pl-4 ml-4.5 sm:pl-6 sm:ml-5.5'
              : 'pl-4 border-l border-white/5'
          )}
        >
          {comment.replies.map((reply) => (
            <CommentNode
              key={reply.id}
              comment={reply}
              postSlug={postSlug}
              postId={postId}
              replyingToId={replyingToId}
              setReplyingToId={setReplyingToId}
              savedName={savedName}
              savedEmail={savedEmail}
              onSuccess={onSuccess}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Individual Form Component (Main & Replies) ─────────────────
interface CommentFormProps {
  postSlug: string;
  postId?: string;
  parentId?: string;
  savedName: string;
  savedEmail: string;
  onSuccess: (name: string, email: string) => void;
  onCancel?: () => void;
  title: string;
  autoFocus?: boolean;
}

function CommentForm({
  postSlug,
  postId,
  parentId,
  savedName,
  savedEmail,
  onSuccess,
  onCancel,
  title,
  autoFocus,
}: CommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitCommentAction, initialFormState);

  // Auto-fill form if saved state exists in props
  const [nameVal, setNameVal] = useState(savedName);
  const [emailVal, setEmailVal] = useState(savedEmail);

  useEffect(() => {
    setNameVal(savedName);
    setEmailVal(savedEmail);
  }, [savedName, savedEmail]);

  // Handle successful submit revalidation
  useEffect(() => {
    if (state.success) {
      if (formRef.current) {
        formRef.current.reset();
      }
      // Save form inputs (name, email) in parent component localStorage callback
      onSuccess(nameVal, emailVal);
    }
  }, [state.success, onSuccess, nameVal, emailVal]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="w-full space-y-4 rounded-2xl border border-white/5 bg-[#07070f]/40 p-5 backdrop-blur-md"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
          {title}
        </h4>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-white/5 p-1 text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LuX className="size-3.5" />
          </button>
        )}
      </div>

      {/* Global Message States */}
      {state.message && (
        <div
          className={cn(
            'flex items-start gap-2 rounded-xl border p-3 text-xs leading-normal',
            state.success
              ? 'border-emerald-500/10 bg-emerald-500/3 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
              : 'border-red-500/10 bg-red-500/3 text-red-400'
          )}
        >
          {state.success ? (
            <LuShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
          ) : (
            <LuTriangleAlert className="mt-0.5 size-4 shrink-0 text-red-400" />
          )}
          <p>{state.message}</p>
        </div>
      )}

      {/* Hidden Fields for validation & bot filtering */}
      <input type="hidden" name="postSlug" value={postSlug} />
      {postId && <input type="hidden" name="postId" value={postId} />}
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`website-${parentId || 'main'}`}>Website</label>
        <input
          type="text"
          id={`website-${parentId || 'main'}`}
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Textarea comment content */}
      <div className="space-y-1.5">
        <div className="relative">
          <textarea
            name="content"
            required
            disabled={isPending}
            rows={parentId ? 3 : 4}
            autoFocus={autoFocus}
            placeholder="Share your thoughts, insights, or ask a question..."
            className="w-full resize-y rounded-xl border border-white/8 bg-white/1 py-2.5 px-4 text-xs text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/40 focus:bg-white/3 focus:ring-1 focus:ring-cyan-500/20 disabled:opacity-50 sm:text-sm"
          />
        </div>
        {state.errors?.content && (
          <p className="text-[10px] text-red-400 font-semibold">{state.errors.content[0]}</p>
        )}
      </div>

      {/* Author Name and Email Inputs Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Name Input */}
        <div className="space-y-1">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
              <LuUser className="size-3.5" />
            </div>
            <input
              type="text"
              name="name"
              required
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
              disabled={isPending}
              placeholder="Name *"
              className="w-full rounded-xl border border-white/8 bg-white/1 py-2.5 pr-4 pl-9 text-xs text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/40 focus:bg-white/3 focus:ring-1 focus:ring-cyan-500/20 disabled:opacity-50"
            />
          </div>
          {state.errors?.name && (
            <p className="text-[10px] text-red-400 font-semibold">{state.errors.name[0]}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
              <LuMail className="size-3.5" />
            </div>
            <input
              type="email"
              name="email"
              required
              value={emailVal}
              onChange={(e) => setEmailVal(e.target.value)}
              disabled={isPending}
              placeholder="Email * (won't be published)"
              className="w-full rounded-xl border border-white/8 bg-white/1 py-2.5 pr-4 pl-9 text-xs text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/40 focus:bg-white/3 focus:ring-1 focus:ring-cyan-500/20 disabled:opacity-50"
            />
          </div>
          {state.errors?.email && (
            <p className="text-[10px] text-red-400 font-semibold">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      {/* Form Submit Footer */}
      <div className="flex items-center justify-end gap-3 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-xl border border-white/5 bg-white/2 py-2 px-4 text-[10px] font-bold text-gray-400 transition-all hover:bg-white/5 hover:text-white active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="font-heading flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-2.5 px-5 text-[10px] font-bold text-white shadow-md transition-all hover:scale-102 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] active:scale-97 disabled:pointer-events-none disabled:opacity-50"
        >
          {isPending ? (
            <>
              <svg className="size-3 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Posting...
            </>
          ) : (
            <>
              Post Comment
              <LuSend className="size-3" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Helper Functions ───────────────────────────────────────────

/**
 * Calculates a relative time difference string or absolute fallback.
 */
function getRelativeTimeString(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 5) return 'Just now';
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Extract commenter's name initials.
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (parts[0]?.[0] || '?').toUpperCase();
}

/**
 * Assigns one of several premium visual gradients based on name letters hash.
 */
function getAvatarStyle(name: string): string {
  const charCode = name.charCodeAt(0) || 0;
  const gradients = [
    'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/25',
    'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/25',
    'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/25',
    'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/25',
    'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/25',
  ];
  return gradients[charCode % gradients.length];
}
