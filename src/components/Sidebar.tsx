import { Home, Search, Compass, Heart, MessageCircle, PlusSquare, User, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Search, label: "Search", id: "search" },
    { icon: Compass, label: "Explore", id: "explore" },
    { icon: MessageCircle, label: "Messages", id: "messages" },
    { icon: Heart, label: "Notifications", id: "notifications" },
    { icon: PlusSquare, label: "Create", id: "create" },
    { icon: User, label: "Profile", id: "profile" },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card border-r border-card-border transition-smooth z-50",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold gradient-instagram bg-clip-text text-transparent">
              InstaLens
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-muted"
          >
            <Menu size={20} />
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12 transition-smooth",
                currentPage === item.id && "bg-secondary text-secondary-foreground",
                isCollapsed && "justify-center px-2"
              )}
              onClick={() => onPageChange(item.id)}
            >
              <item.icon size={24} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-6">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10",
              isCollapsed && "justify-center px-2"
            )}
          >
            <LogOut size={24} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;