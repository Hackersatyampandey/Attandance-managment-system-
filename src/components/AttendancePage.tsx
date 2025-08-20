import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, Download, Send, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  status: "Present" | "Absent" | "Late" | "";
  avatar: string;
}

interface AttendancePageProps {
  students: Student[];
  onAttendanceUpdate: (updatedStudents: Student[]) => void;
  onSyncToSheets: (attendanceData: any[]) => void;
}

const AttendancePage = ({ students, onAttendanceUpdate, onSyncToSheets }: AttendancePageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const classes = [...new Set(students.map(student => student.class))];

  const updateAttendance = (studentId: string, status: "Present" | "Absent" | "Late") => {
    const updatedStudents = students.map(student =>
      student.id === studentId ? { ...student, status } : student
    );
    onAttendanceUpdate(updatedStudents);
  };

  const markAllPresent = () => {
    const updatedStudents = filteredStudents.map(student => ({ ...student, status: "Present" as const }));
    const finalStudents = students.map(student => {
      const updated = updatedStudents.find(u => u.id === student.id);
      return updated || student;
    });
    onAttendanceUpdate(finalStudents);
    toast({
      title: "Bulk Update",
      description: `Marked ${filteredStudents.length} students as present`,
    });
  };

  const exportToSheets = () => {
    const attendanceData = students.map(student => ({
      date: attendanceDate,
      rollNumber: student.rollNumber,
      name: student.name,
      class: student.class,
      status: student.status || "Not Marked",
      timestamp: new Date().toISOString()
    }));
    
    onSyncToSheets(attendanceData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800 border-green-200";
      case "Absent": return "bg-red-100 text-red-800 border-red-200";
      case "Late": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <CheckCircle className="w-4 h-4" />;
      case "Absent": return <XCircle className="w-4 h-4" />;
      case "Late": return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Mark Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="search">Search Students</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Name or roll number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="class">Filter by Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={markAllPresent} variant="outline" className="flex-1">
                Mark All Present
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={exportToSheets} className="btn-success">
              <Send className="w-4 h-4 mr-2" />
              Sync to Google Sheets
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="attendance-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Roll: {student.rollNumber}</span>
                      <span>•</span>
                      <span>Class: {student.class}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {student.status && (
                    <Badge className={getStatusColor(student.status)}>
                      {getStatusIcon(student.status)}
                      <span className="ml-1">{student.status}</span>
                    </Badge>
                  )}
                  
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant={student.status === "Present" ? "default" : "outline"}
                      onClick={() => updateAttendance(student.id, "Present")}
                      className={student.status === "Present" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "Late" ? "default" : "outline"}
                      onClick={() => updateAttendance(student.id, "Late")}
                      className={student.status === "Late" ? "bg-orange-600 hover:bg-orange-700" : ""}
                    >
                      <Clock className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "Absent" ? "default" : "outline"}
                      onClick={() => updateAttendance(student.id, "Absent")}
                      className={student.status === "Absent" ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No students found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendancePage;