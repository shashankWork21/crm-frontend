"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Send, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCommentsForMedia, InstagramComment } from "@/db/instagram.queries";
import { replyToInstagramComment } from "@/actions/instagram";
import DMForm from "./dm-form";

interface CommentSectionProps {
  assetId: string | null | undefined;
  accessToken: string | undefined;
}

export default function CommentSection({
  assetId,
  accessToken,
}: CommentSectionProps) {
  const [sendDMId, setSendDMId] = useState<string | null>(null);
  const [comments, setComments] = useState<InstagramComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(
    null,
  );
  const [replyText, setReplyText] = useState("");
  const [repliedCommentIds, setRepliedCommentIds] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const orderedComments = useMemo(
    () =>
      [...comments].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    [comments],
  );

  const { rootComments, repliesByParent } = useMemo(() => {
    const commentsById = new Map(
      orderedComments.map((comment) => [comment.id, comment]),
    );
    const repliesMap: Record<string, InstagramComment[]> = {};

    orderedComments.forEach((comment) => {
      if (!comment.parent_id) return;
      if (!repliesMap[comment.parent_id]) {
        repliesMap[comment.parent_id] = [];
      }
      repliesMap[comment.parent_id].push(comment);
    });

    const topLevelComments = orderedComments.filter(
      (comment) => !comment.parent_id || !commentsById.has(comment.parent_id),
    );

    return { rootComments: topLevelComments, repliesByParent: repliesMap };
  }, [orderedComments]);

  useEffect(() => {
    async function fetchCommentsForPost() {
      if (!assetId || !accessToken) {
        setComments([]);
        return;
      }

      setIsLoadingComments(true);
      const fetchedComments = await getCommentsForMedia(assetId, accessToken);
      setComments(fetchedComments ?? []);
      setIsLoadingComments(false);
    }

    fetchCommentsForPost();
  }, [assetId, accessToken]);

  function openReplyInput(comment: InstagramComment) {
    setReplyingCommentId(comment.id);
    setReplyText(`@${comment.from.username}`);
  }

  function closeReplyInput() {
    setReplyingCommentId(null);
    setReplyText("");
  }

  async function handleSendReply(commentId: string) {
    if (!accessToken || !replyText.trim() || isSending) return;

    setIsSending(true);
    const success = await replyToInstagramComment(
      commentId,
      accessToken,
      replyText.trim(),
    );

    if (success) {
      setRepliedCommentIds((prev) => [...prev, commentId]);
      closeReplyInput();
    }
    setIsSending(false);
  }

  function renderComment(
    comment: InstagramComment,
    isReply = false,
  ): React.ReactNode {
    const childReplies = repliesByParent[comment.id] || [];
    const isReplying = replyingCommentId === comment.id;
    const hasReplied = repliedCommentIds.includes(comment.id);

    return (
      <div key={comment.id} className="space-y-2">
        <div
          className={`rounded-lg border p-2 ${
            isReply
              ? "ml-4 border-sunglow/20 bg-sunglow/5"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-sunglow">@{comment.from.username}</p>
            {isReply && (
              <Badge className="bg-powder-blue text-rich-black border-white/20 text-[10px]">
                Reply
              </Badge>
            )}
          </div>
          <p className="text-xs text-white/80 mt-1 line-clamp-3">
            {comment.text}
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-[10px] text-white/40">
              {format(new Date(comment.timestamp), "MMM d, h:mm a")}
            </p>
            <div className="flex items-center gap-3">
              {sendDMId !== comment.id && (
                <Button
                  size="sm"
                  className="h-7 px-2 text-xs bg-sunglow text-rich-black hover:bg-sunglow-600"
                  onClick={() =>
                    setSendDMId((prev) =>
                      prev === comment.id ? null : comment.id,
                    )
                  }
                >
                  {sendDMId === comment.id ? "Cancel DM" : "Send DM"}
                </Button>
              )}
              {!isReplying && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                  onClick={() => openReplyInput(comment)}
                  disabled={hasReplied}
                >
                  {hasReplied ? "Replied" : "Reply"}
                </Button>
              )}
            </div>
          </div>
          {sendDMId === comment.id && (
            <div className="mt-5">
              <DMForm
                recipientId={comment.from.id}
                accessToken={accessToken!}
                onSuccess={() => setSendDMId(null)}
              />
            </div>
          )}

          {isReplying && (
            <div className="mt-2 flex items-center gap-1.5">
              <Input
                autoFocus
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendReply(comment.id);
                  }
                  if (e.key === "Escape") closeReplyInput();
                }}
                placeholder="Type your reply..."
                className="h-8 text-xs bg-white/5 border-white/15 text-white placeholder:text-white/30"
              />
              <Button
                size="sm"
                className="h-8 w-8 p-0 bg-sunglow hover:bg-sunglow-600 text-rich-black shrink-0"
                onClick={() => handleSendReply(comment.id)}
                disabled={isSending || !replyText.trim()}
              >
                <Send className="size-3.5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-white/40 hover:text-white/70 shrink-0"
                onClick={closeReplyInput}
              >
                <X className="size-3.5" />
              </Button>
            </div>
          )}
        </div>

        {childReplies.map((replyComment) => renderComment(replyComment, true))}
      </div>
    );
  }

  return (
    <div className="space-y-2 pt-2 border-t border-white/10">
      <p className="text-xs text-white/60">
        Comments{" "}
        {orderedComments.length > 0 ? `(${orderedComments.length})` : ""}
      </p>

      {isLoadingComments && (
        <p className="text-xs text-white/40">Loading comments...</p>
      )}

      {!isLoadingComments && orderedComments.length === 0 && (
        <p className="text-xs text-white/40">No comments yet.</p>
      )}

      {!isLoadingComments && rootComments.length > 0 && (
        <div className="space-y-2 max-h-100 overflow-y-auto pr-1">
          {rootComments.map((comment) => renderComment(comment))}
        </div>
      )}
    </div>
  );
}
