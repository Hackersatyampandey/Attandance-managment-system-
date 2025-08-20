import { cn } from "@/lib/utils";

interface StoryCircleProps {
  avatar: string;
  username: string;
  isOwn?: boolean;
  hasNewStory?: boolean;
  className?: string;
}

const StoryCircle = ({ avatar, username, isOwn = false, hasNewStory = true, className }: StoryCircleProps) => {
  return (
    <div className={cn("flex flex-col items-center space-y-2 cursor-pointer", className)}>
      <div className={cn(
        "relative",
        hasNewStory && "story-ring",
        !hasNewStory && "ring-2 ring-gray-300"
      )}>
        <div className="story-ring-inner">
          <img
            src={avatar}
            alt={username}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        {isOwn && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
        )}
      </div>
      <span className="text-xs text-center max-w-[70px] truncate">
        {isOwn ? "Your story" : username}
      </span>
    </div>
  );
};

export default StoryCircle;