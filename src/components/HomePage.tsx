import StoryCircle from "./StoryCircle";
import PostCard from "./PostCard";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import generated images
import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";
import post3 from "@/assets/post-3.jpg";
import post4 from "@/assets/post-4.jpg";
import avatar1 from "@/assets/avatar-1.jpg";

const HomePage = () => {
  const stories = [
    { id: "1", username: "you", avatar: avatar1, isOwn: true },
    { id: "2", username: "coffee_lover", avatar: post1, hasNewStory: true },
    { id: "3", username: "foodie_daily", avatar: post2, hasNewStory: true },
    { id: "4", username: "travel_soul", avatar: post3, hasNewStory: true },
    { id: "5", username: "fashion_inspo", avatar: post4, hasNewStory: false },
    { id: "6", username: "nature_pics", avatar: avatar1, hasNewStory: true },
    { id: "7", username: "art_gallery", avatar: post1, hasNewStory: false },
  ];

  const posts = [
    {
      id: "1",
      username: "coffee_lover",
      avatar: avatar1,
      image: post1,
      caption: "Perfect morning vibes ☕️ Nothing beats a cozy coffee shop on a rainy day",
      likes: 1284,
      comments: 47,
      timeAgo: "2 hours ago",
      isLiked: false,
      isSaved: false,
    },
    {
      id: "2",
      username: "foodie_daily",
      avatar: avatar1,
      image: post2,
      caption: "Healthy breakfast bowl to start the day right! 🥣 Recipe in bio",
      likes: 892,
      comments: 23,
      timeAgo: "4 hours ago",
      isLiked: true,
      isSaved: true,
    },
    {
      id: "3",
      username: "travel_soul",
      avatar: avatar1,
      image: post3,
      caption: "Golden hour at the mountains 🏔️ Nature never fails to amaze me",
      likes: 2156,
      comments: 89,
      timeAgo: "6 hours ago",
      isLiked: false,
      isSaved: false,
    },
    {
      id: "4",
      username: "fashion_inspo",
      avatar: avatar1,
      image: post4,
      caption: "Street style essentials 👗 Links to everything in my stories!",
      likes: 756,
      comments: 31,
      timeAgo: "8 hours ago",
      isLiked: true,
      isSaved: false,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stories Section */}
      <div className="bg-card border border-card-border rounded-lg shadow-soft mb-6 p-4">
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-2">
            {stories.map((story) => (
              <StoryCircle
                key={story.id}
                avatar={story.avatar}
                username={story.username}
                isOwn={story.isOwn}
                hasNewStory={story.hasNewStory}
                className="flex-shrink-0"
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;