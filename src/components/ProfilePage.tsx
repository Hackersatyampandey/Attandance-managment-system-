import { Settings, Grid, Bookmark, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// Import generated images
import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";
import post3 from "@/assets/post-3.jpg";
import post4 from "@/assets/post-4.jpg";
import avatar1 from "@/assets/avatar-1.jpg";

const ProfilePage = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const userPosts = [
    { id: "1", image: post1, likes: 1284, comments: 47 },
    { id: "2", image: post2, likes: 892, comments: 23 },
    { id: "3", image: post3, likes: 2156, comments: 89 },
    { id: "4", image: post4, likes: 756, comments: 31 },
    { id: "5", image: post1, likes: 945, comments: 12 },
    { id: "6", image: post2, likes: 1523, comments: 67 },
  ];

  const savedPosts = [
    { id: "1", image: post2, likes: 892, comments: 23 },
    { id: "2", image: post4, likes: 756, comments: 31 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-card border border-card-border rounded-lg shadow-soft mb-6 p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="story-ring">
            <div className="story-ring-inner">
              <img
                src={avatar1}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h1 className="text-2xl font-semibold">john_doe_official</h1>
              <div className="flex gap-2">
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  className={!isFollowing ? "btn-instagram" : ""}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <UserPlus size={16} className="mr-2" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline">
                  Message
                </Button>
                <Button variant="outline" size="icon">
                  <Settings size={16} />
                </Button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-8 mb-4">
              <div className="text-center">
                <div className="text-xl font-semibold">124</div>
                <div className="text-sm text-muted-foreground">posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">15.2k</div>
                <div className="text-sm text-muted-foreground">followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">892</div>
                <div className="text-sm text-muted-foreground">following</div>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="font-semibold">John Doe</h2>
              <p className="text-sm text-muted-foreground">
                📸 Content Creator & Photographer<br/>
                🌟 Sharing moments that matter<br/>
                📍 New York, USA<br/>
                👇 Latest work
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="bg-card border border-card-border rounded-lg shadow-soft overflow-hidden">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-14">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Grid size={16} />
              Posts
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark size={16} />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="p-0">
            <div className="grid grid-cols-3 gap-1">
              {userPosts.map((post) => (
                <div key={post.id} className="aspect-square relative group cursor-pointer">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-full object-cover transition-smooth group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center text-white">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        ❤️ {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        💬 {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="p-0">
            <div className="grid grid-cols-3 gap-1">
              {savedPosts.map((post) => (
                <div key={post.id} className="aspect-square relative group cursor-pointer">
                  <img
                    src={post.image}
                    alt="Saved post"
                    className="w-full h-full object-cover transition-smooth group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center text-white">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        ❤️ {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        💬 {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;