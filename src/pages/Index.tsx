import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import HomePage from "@/components/HomePage";
import SearchPage from "@/components/SearchPage";
import ProfilePage from "@/components/ProfilePage";
import { cn } from "@/lib/utils";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "search":
        return <SearchPage />;
      case "profile":
        return <ProfilePage />;
      case "explore":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-card-border rounded-lg shadow-soft p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Explore</h2>
              <p className="text-muted-foreground">Discover trending content and new creators</p>
            </div>
          </div>
        );
      case "messages":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-card-border rounded-lg shadow-soft p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Messages</h2>
              <p className="text-muted-foreground">Your direct messages will appear here</p>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-card-border rounded-lg shadow-soft p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Notifications</h2>
              <p className="text-muted-foreground">Stay updated with your latest activity</p>
            </div>
          </div>
        );
      case "create":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-card-border rounded-lg shadow-soft p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Create Post</h2>
              <p className="text-muted-foreground">Share your moments with the world</p>
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className={cn(
        "transition-smooth pt-6 pb-6",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <div className="container mx-auto px-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;
