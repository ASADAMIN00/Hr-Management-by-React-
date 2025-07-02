import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: "present" | "absent" | "leave" | "holiday";
  checkInTime?: string;
  checkOutTime?: string;
  avatar?: string;
}

const mockAttendanceData: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "Sarah Johnson",
    date: new Date().toISOString().split("T")[0],
    status: "present",
    checkInTime: "09:15",
    checkOutTime: "18:30",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Mike Chen",
    date: new Date().toISOString().split("T")[0],
    status: "present",
    checkInTime: "09:00",
    checkOutTime: "17:45",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Emily Rodriguez",
    date: new Date().toISOString().split("T")[0],
    status: "leave",
  },
  {
    id: "4",
    employeeId: "4",
    employeeName: "James Wilson",
    date: new Date().toISOString().split("T")[0],
    status: "absent",
  },
  {
    id: "5",
    employeeId: "5",
    employeeName: "Lisa Anderson",
    date: new Date().toISOString().split("T")[0],
    status: "present",
    checkInTime: "08:45",
    checkOutTime: "17:30",
  },
];

export default function Attendance() {
  const [attendanceRecords, setAttendanceRecords] =
    useState<AttendanceRecord[]>(mockAttendanceData);

  const todayStats = {
    present: attendanceRecords.filter((r) => r.status === "present").length,
    absent: attendanceRecords.filter((r) => r.status === "absent").length,
    onLeave: attendanceRecords.filter((r) => r.status === "leave").length,
    total: attendanceRecords.length,
  };

  const attendanceRate = (
    (todayStats.present / todayStats.total) *
    100
  ).toFixed(1);

  const markAttendance = (employeeId: string, status: "present" | "absent") => {
    setAttendanceRecords((prev) =>
      prev.map((record) => {
        if (record.employeeId === employeeId) {
          const updatedRecord = { ...record, status };
          if (status === "present" && !record.checkInTime) {
            updatedRecord.checkInTime = new Date().toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            });
          }
          return updatedRecord;
        }
        return record;
      }),
    );

    toast({
      title: "Attendance Updated",
      description: `Attendance marked as ${status} successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Present
          </Badge>
        );
      case "absent":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Absent
          </Badge>
        );
      case "leave":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            On Leave
          </Badge>
        );
      case "holiday":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            Holiday
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Attendance Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Track and manage employee attendance records
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Present
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {todayStats.present}
            </div>
            <p className="text-xs text-muted-foreground">
              {attendanceRate}% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {todayStats.absent}
            </div>
            <p className="text-xs text-muted-foreground">
              {((todayStats.absent / todayStats.total) * 100).toFixed(1)}%
              absent rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {todayStats.onLeave}
            </div>
            <p className="text-xs text-muted-foreground">Approved leaves</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {todayStats.total}
            </div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
          <CardDescription>
            Real-time attendance tracking for {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={record.avatar}
                            alt={record.employeeName}
                          />
                          <AvatarFallback>
                            {record.employeeName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{record.employeeName}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      {record.checkInTime ? (
                        <span className="text-green-600 font-medium">
                          {record.checkInTime}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {record.checkOutTime ? (
                        <span className="text-blue-600 font-medium">
                          {record.checkOutTime}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            markAttendance(record.employeeId, "present")
                          }
                          disabled={record.status === "present"}
                          className="h-8"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            markAttendance(record.employeeId, "absent")
                          }
                          disabled={record.status === "absent"}
                          className="h-8"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Absent
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
