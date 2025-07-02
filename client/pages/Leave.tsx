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
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: "casual" | "sick" | "annual" | "maternity" | "paternity";
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
  avatar?: string;
}

const mockLeaveData: LeaveRequest[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "Sarah Johnson",
    department: "Engineering",
    leaveType: "annual",
    fromDate: "2024-04-15",
    toDate: "2024-04-19",
    totalDays: 5,
    reason: "Family vacation to Europe",
    status: "pending",
    appliedDate: "2024-03-20",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Mike Chen",
    department: "Product",
    leaveType: "sick",
    fromDate: "2024-03-25",
    toDate: "2024-03-27",
    totalDays: 3,
    reason: "Medical appointment and recovery",
    status: "pending",
    appliedDate: "2024-03-22",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Emily Rodriguez",
    department: "Design",
    leaveType: "casual",
    fromDate: "2024-04-01",
    toDate: "2024-04-01",
    totalDays: 1,
    reason: "Personal work",
    status: "approved",
    appliedDate: "2024-03-25",
  },
  {
    id: "4",
    employeeId: "4",
    employeeName: "James Wilson",
    department: "Sales",
    leaveType: "annual",
    fromDate: "2024-04-10",
    toDate: "2024-04-14",
    totalDays: 5,
    reason: "Wedding ceremony",
    status: "pending",
    appliedDate: "2024-03-18",
  },
  {
    id: "5",
    employeeId: "5",
    employeeName: "Lisa Anderson",
    department: "Human Resources",
    leaveType: "sick",
    fromDate: "2024-03-28",
    toDate: "2024-03-29",
    totalDays: 2,
    reason: "Fever and flu symptoms",
    status: "approved",
    appliedDate: "2024-03-26",
  },
];

export default function Leave() {
  const [leaveRequests, setLeaveRequests] =
    useState<LeaveRequest[]>(mockLeaveData);

  const stats = {
    pending: leaveRequests.filter((r) => r.status === "pending").length,
    approved: leaveRequests.filter((r) => r.status === "approved").length,
    rejected: leaveRequests.filter((r) => r.status === "rejected").length,
    totalDays: leaveRequests
      .filter((r) => r.status === "approved")
      .reduce((sum, r) => sum + r.totalDays, 0),
  };

  const handleLeaveAction = (id: string, action: "approved" | "rejected") => {
    setLeaveRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: action } : request,
      ),
    );

    const request = leaveRequests.find((r) => r.id === id);
    toast({
      title: `Leave Request ${action === "approved" ? "Approved" : "Rejected"}`,
      description: `${request?.employeeName}'s leave request has been ${action}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getLeaveTypeBadge = (type: string) => {
    const colors = {
      casual: "bg-blue-100 text-blue-700",
      sick: "bg-red-100 text-red-700",
      annual: "bg-green-100 text-green-700",
      maternity: "bg-pink-100 text-pink-700",
      paternity: "bg-purple-100 text-purple-700",
    };

    return (
      <Badge
        className={`${colors[type as keyof typeof colors]} hover:${colors[type as keyof typeof colors]}`}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage employee leave requests and approvals
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.pending}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Requests
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.approved}
            </div>
            <p className="text-xs text-muted-foreground">Leave requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected Requests
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Leave Days
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalDays}
            </div>
            <p className="text-xs text-muted-foreground">Approved this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>
            Review and manage employee leave requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={request.avatar}
                            alt={request.employeeName}
                          />
                          <AvatarFallback>
                            {request.employeeName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {request.employeeName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.department}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getLeaveTypeBadge(request.leaveType)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {request.totalDays} days
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Applied {formatDate(request.appliedDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatDate(request.fromDate)}</div>
                        {request.fromDate !== request.toDate && (
                          <div className="text-muted-foreground">
                            to {formatDate(request.toDate)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="max-w-48 truncate text-sm"
                        title={request.reason}
                      >
                        {request.reason}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {request.status === "pending" ? (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleLeaveAction(request.id, "approved")
                            }
                            className="bg-green-600 hover:bg-green-700 h-8"
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleLeaveAction(request.id, "rejected")
                            }
                            className="border-red-200 text-red-700 hover:bg-red-50 h-8"
                          >
                            <ThumbsDown className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {request.status === "approved"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {leaveRequests.filter((r) => r.status === "pending").length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Pending Requests
              </h3>
              <p className="text-muted-foreground">
                All leave requests have been processed.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
