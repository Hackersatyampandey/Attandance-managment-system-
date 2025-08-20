import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Import generated images
import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";
import post3 from "@/assets/post-3.jpg";
import post4 from "@/assets/post-4.jpg";
import avatar1 from "@/assets/avatar-1.jpg";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingPosts = [
    { id: "1", image: post1, type: "photo", user: "coffee_lover" },
    { id: "2", image: post2, type: "photo", user: "foodie_daily" },
    { id: "3", image: post3, type: "photo", user: "travel_soul" },
    { id: "4", image: post4, type: "photo", user: "fashion_inspo" },
    { id: "5", image: post1, type: "photo", user: "nature_pics" },
    { id: "6", image: post2, type: "photo", user: "art_gallery" },
    { id: "7", image: post3, type: "photo", user: "street_art" },
    { id: "8", image: post4, type: "photo", user: "minimalist_life" },
    { id: "9", image: avatar1, type: "photo", user: "portrait_studio" },
  ];

  const suggestions = [
    { id: "1", username: "coffee_lover", name: "Coffee Lover", avatar: avatar1, followers: "12.3k" },
    { id: "2", username: "foodie_daily", name: "Daily Foodie", avatar: avatar1, followers: "8.7k" },
    { id: "3", username: "travel_soul", name: "Travel Soul", avatar: avatar1, followers: "25.1k" },
    { id: "4", username: "fashion_inspo", name: "Fashion Inspo", avatar: avatar1, followers: "15.9k" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="bg-card border border-card-border rounded-lg shadow-soft mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Search users, hashtags, and locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-input border-input-border"
          />
        </div>
      </div>

      {!searchQuery ? (
        <>
          {/* Trending/Explore Grid */}
          <div className="bg-card border border-card-border rounded-lg shadow-soft mb-6 overflow-hidden">
            <div className="p-4 border-b border-card-border">
              <h2 className="text-lg font-semibold">Explore</h2>
              <p className="text-sm text-muted-foreground">Discover trending posts and creators</p>
            </div>
            
            <div className="grid grid-cols-3 gap-1">
              {trendingPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className={`
                    aspect-square relative group cursor-pointer
                    ${index === 0 ? 'col-span-2 row-span-2' : ''}
                  `}
                >
                  <img
                    src={post.image}
                    alt="Trending post"
                    className="w-full h-full object-cover transition-smooth group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-sm font-medium">@{post.user}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Users */}
          <div className="bg-card border border-card-border rounded-lg shadow-soft">
            <div className="p-4 border-b border-card-border">
              <h2 className="text-lg font-semibold">Suggested for you</h2>
              <p className="text-sm text-muted-foreground">Based on your activity</p>
            </div>
            
            <div className="p-4 space-y-4">
              {suggestions.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm">{user.username}</div>
                      <div className="text-xs text-muted-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.followers} followers</div>
                    </div>
                  </div>
                  <button className="btn-instagram text-sm px-4 py-1">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Search Results */
        <div className="bg-card border border-card-border rounded-lg shadow-soft">
          <div className="p-4 border-b border-card-border">
            <h2 className="text-lg font-semibold">Search results for "{searchQuery}"</h2>
          </div>
          
          <div className="p-4">
            <div className="text-center text-muted-foreground py-8">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>Start typing to search for users, hashtags, and locations</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;