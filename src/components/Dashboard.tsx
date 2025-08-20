import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

interface DashboardProps {
  attendanceData: any[];
}

const Dashboard = ({ attendanceData }: DashboardProps) => {
  // Calculate statistics
  const totalStudents = attendanceData.length;
  const presentStudents = attendanceData.filter(student => student.status === "Present").length;
  const absentStudents = attendanceData.filter(student => student.status === "Absent").length;
  const lateStudents = attendanceData.filter(student => student.status === "Late").length;

  const attendancePercentage = totalStudents > 0 ? ((presentStudents + lateStudents) / totalStudents * 100).toFixed(1) : 0;

  // Chart data
  const chartData = [
    { name: "Present", value: presentStudents, color: "#22c55e" },
    { name: "Absent", value: absentStudents, color: "#ef4444" },
    { name: "Late", value: lateStudents, color: "#f97316" },
  ];

  const weeklyData = [
    { day: "Mon", attendance: 85 },
    { day: "Tue", attendance: 92 },
    { day: "Wed", attendance: 78 },
    { day: "Thu", attendance: 88 },
    { day: "Fri", attendance: 95 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-education-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{presentStudents}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-red-600">{absentStudents}</p>
              </div>
              <UserX className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Late</p>
                <p className="text-2xl font-bold text-orange-600">{lateStudents}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <p className="text-sm text-muted-foreground">
              {attendancePercentage}% attendance rate
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {chartData.map((entry) => (
                <div key={entry.name} className="flex items-center space-x-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
            <p className="text-sm text-muted-foreground">
              Attendance percentage by day
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="attendance" fill="hsl(var(--education-blue))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;