import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

const PostCard = ({ 
  username, 
  avatar, 
  image, 
  caption, 
  likes, 
  comments, 
  timeAgo, 
  isLiked = false, 
  isSaved = false 
}: PostCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setCurrentLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-card border border-card-border rounded-lg shadow-soft mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm">{username}</span>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal size={16} />
        </Button>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt="Post"
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 hover:bg-transparent"
              onClick={handleLike}
            >
              <Heart 
                size={24} 
                className={cn(
                  "transition-bounce",
                  liked ? "fill-red-500 text-red-500" : "text-foreground hover:text-gray-600"
                )}
              />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
              <MessageCircle size={24} className="text-foreground hover:text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
              <Send size={24} className="text-foreground hover:text-gray-600" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-transparent"
            onClick={() => setSaved(!saved)}
          >
            <Bookmark 
              size={24} 
              className={cn(
                "transition-smooth",
                saved ? "fill-foreground text-foreground" : "text-foreground hover:text-gray-600"
              )}
            />
          </Button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{currentLikes.toLocaleString()} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{username}</span>
          <span className="text-sm">{caption}</span>
        </div>

        {/* Comments */}
        <div className="mb-2">
          <button className="text-gray-500 text-sm hover:text-gray-700">
            View all {comments} comments
          </button>
        </div>

        {/* Time */}
        <div className="text-xs text-gray-500 uppercase">
          {timeAgo}
        </div>
      </div>
    </div>
  );
};

export default PostCard;