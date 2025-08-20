import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import AttendanceSidebar from "@/components/AttendanceSidebar";
import Dashboard from "@/components/Dashboard";
import AttendancePage from "@/components/AttendancePage";
import ReportsPage from "@/components/ReportsPage";
import ZapierIntegration from "@/components/ZapierIntegration";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Import student avatars
import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";
import student4 from "@/assets/student-4.jpg";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  status: "Present" | "Absent" | "Late" | "";
  avatar: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { toast } = useToast();

  // Sample student data - replace with your actual data
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Rahul Sharma", rollNumber: "CSE001", class: "CSE-A", status: "", avatar: student1 },
    { id: "2", name: "Priya Singh", rollNumber: "CSE002", class: "CSE-A", status: "", avatar: student2 },
    { id: "3", name: "Amit Kumar", rollNumber: "CSE003", class: "CSE-A", status: "", avatar: student3 },
    { id: "4", name: "Sneha Patel", rollNumber: "CSE004", class: "CSE-A", status: "", avatar: student4 },
    { id: "5", name: "Ravi Gupta", rollNumber: "CSE005", class: "CSE-A", status: "", avatar: student1 },
    { id: "6", name: "Kavya Nair", rollNumber: "ECE001", class: "ECE-A", status: "", avatar: student2 },
    { id: "7", name: "Arjun Reddy", rollNumber: "ECE002", class: "ECE-A", status: "", avatar: student3 },
    { id: "8", name: "Pooja Sharma", rollNumber: "ECE003", class: "ECE-A", status: "", avatar: student4 },
    { id: "9", name: "Vikram Singh", rollNumber: "EEE001", class: "EEE-A", status: "", avatar: student1 },
    { id: "10", name: "Meera Krishnan", rollNumber: "EEE002", class: "EEE-A", status: "", avatar: student2 },
    { id: "11", name: "Suresh Kumar", rollNumber: "MECH001", class: "MECH-A", status: "", avatar: student3 },
    { id: "12", name: "Anita Sharma", rollNumber: "MECH002", class: "MECH-A", status: "", avatar: student4 },
  ]);

  const handleLogin = (name: string) => {
    setTeacherName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTeacherName("");
    setCurrentPage("dashboard");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAttendanceUpdate = (updatedStudents: Student[]) => {
    setStudents(updatedStudents);
  };

  const handleSyncToSheets = (attendanceData: any[]) => {
    // This will be handled by the ZapierIntegration component
    console.log("Syncing to sheets:", attendanceData);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard attendanceData={students} />;
      case "attendance":
        return (
          <AttendancePage
            students={students}
            onAttendanceUpdate={handleAttendanceUpdate}
            onSyncToSheets={handleSyncToSheets}
          />
        );
      case "reports":
        return <ReportsPage students={students} />;
      case "students":
        return (
          <div className="space-y-6">
            <div className="bg-card border border-card-border rounded-lg shadow-soft p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Student Management</h2>
              <p className="text-muted-foreground">
                Total Students: {students.length} across {[...new Set(students.map(s => s.class))].length} classes
              </p>
            </div>
          </div>
        );
      case "zapier":
        return <ZapierIntegration attendanceData={students} />;
      default:
        return <Dashboard attendanceData={students} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AttendanceSidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        teacherName={teacherName}
        onLogout={handleLogout}
      />
      
      <main className="ml-64 transition-smooth pt-6 pb-6">
        <div className="container mx-auto px-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;
