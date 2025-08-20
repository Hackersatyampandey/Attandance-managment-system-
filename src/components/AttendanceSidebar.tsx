import { LayoutDashboard, Users, ClipboardList, BarChart3, Settings, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AttendanceSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  teacherName: string;
  onLogout: () => void;
}

const AttendanceSidebar = ({ currentPage, onPageChange, teacherName, onLogout }: AttendanceSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: ClipboardList, label: "Mark Attendance", id: "attendance" },
    { icon: BarChart3, label: "Reports", id: "reports" },
    { icon: Users, label: "Students", id: "students" },
    { icon: Settings, label: "Google Sheets", id: "zapier" },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card border-r border-card-border transition-smooth z-50",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold gradient-education bg-clip-text text-transparent">
                College Attendance
              </h1>
              <p className="text-sm text-muted-foreground">Welcome, {teacherName}</p>
            </div>
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
            onClick={onLogout}
          >
            <LogOut size={24} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSidebar;