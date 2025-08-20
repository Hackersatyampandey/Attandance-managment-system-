import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { useState } from "react";
import { Calendar, TrendingUp, Users, Award } from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  status: string;
  avatar: string;
}

interface ReportsPageProps {
  students: Student[];
}

const ReportsPage = ({ students }: ReportsPageProps) => {
  const [selectedClass, setSelectedClass] = useState("all");
  const [dateRange, setDateRange] = useState("week");

  const classes = [...new Set(students.map(student => student.class))];
  
  const filteredStudents = selectedClass === "all" 
    ? students 
    : students.filter(student => student.class === selectedClass);

  // Sample historical data
  const weeklyData = [
    { day: "Mon", attendance: 85, total: 100 },
    { day: "Tue", attendance: 92, total: 100 },
    { day: "Wed", attendance: 78, total: 100 },
    { day: "Thu", attendance: 88, total: 100 },
    { day: "Fri", attendance: 95, total: 100 },
  ];

  const monthlyData = [
    { month: "Jan", attendance: 88 },
    { month: "Feb", attendance: 91 },
    { month: "Mar", attendance: 85 },
    { month: "Apr", attendance: 89 },
    { month: "May", attendance: 93 },
  ];

  const classWiseData = [
    { class: "CSE-A", attendance: 92, total: 60 },
    { class: "CSE-B", attendance: 87, total: 58 },
    { class: "ECE-A", attendance: 89, total: 55 },
    { class: "EEE-A", attendance: 85, total: 52 },
    { class: "MECH-A", attendance: 91, total: 48 },
  ];

  // Calculate statistics
  const totalStudents = filteredStudents.length;
  const presentStudents = filteredStudents.filter(s => s.status === "Present").length;
  const absentStudents = filteredStudents.filter(s => s.status === "Absent").length;
  const lateStudents = filteredStudents.filter(s => s.status === "Late").length;

  const attendancePercentage = totalStudents > 0 ? (presentStudents / totalStudents * 100).toFixed(1) : 0;

  // Top performers
  const topPerformers = [
    { name: "Rahul Sharma", rollNumber: "CSE001", attendance: 98 },
    { name: "Priya Singh", rollNumber: "CSE015", attendance: 96 },
    { name: "Amit Kumar", rollNumber: "ECE022", attendance: 94 },
    { name: "Sneha Patel", rollNumber: "EEE008", attendance: 92 },
  ];

  const lowAttendance = [
    { name: "Ravi Gupta", rollNumber: "CSE045", attendance: 65 },
    { name: "Kavya Nair", rollNumber: "ECE031", attendance: 68 },
    { name: "Arjun Reddy", rollNumber: "MECH019", attendance: 72 },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Attendance Reports & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="class-filter">Filter by Class</Label>
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
            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Overall Attendance</h3>
              <div className="text-3xl font-bold text-education-blue mt-2">{attendancePercentage}%</div>
              <p className="text-sm text-muted-foreground">This week</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Total Students</h3>
              <div className="text-3xl font-bold text-education-purple mt-2">{totalStudents}</div>
              <p className="text-sm text-muted-foreground">Active students</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Present Today</h3>
              <div className="text-3xl font-bold text-green-600 mt-2">{presentStudents}</div>
              <p className="text-sm text-muted-foreground">Students present</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Absent Today</h3>
              <div className="text-3xl font-bold text-red-600 mt-2">{absentStudents}</div>
              <p className="text-sm text-muted-foreground">Students absent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--education-blue))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--education-blue))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classWiseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Bar dataKey="attendance" fill="hsl(var(--education-green))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div key={student.rollNumber} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {student.attendance}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Users className="w-5 h-5" />
              Low Attendance Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowAttendance.map((student) => (
                <div key={student.rollNumber} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                  </div>
                  <Badge variant="destructive">
                    {student.attendance}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;