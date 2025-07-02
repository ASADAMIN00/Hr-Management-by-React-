import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Clock,
  DollarSign,
  Calendar,
  TrendingUp,
  UserCheck,
  UserX,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const statsData = {
  totalEmployees: 234,
  presentToday: 187,
  absentToday: 12,
  onLeave: 8,
  pendingApprovals: 15,
  totalSalaryBudget: 2450000,
  avgSalary: 65000,
  leaveRequests: 7,
};

const recentActivities = [
  {
    id: 1,
    type: "attendance",
    message: "Sarah Johnson marked attendance",
    time: "2 minutes ago",
    icon: Clock,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "leave",
    message: "Leave request from Mike Chen pending approval",
    time: "15 minutes ago",
    icon: Calendar,
    color: "text-orange-600",
  },
  {
    id: 3,
    type: "salary",
    message: "Salary sheet for March generated",
    time: "1 hour ago",
    icon: DollarSign,
    color: "text-blue-600",
  },
  {
    id: 4,
    type: "employee",
    message: "New employee John Smith added",
    time: "2 hours ago",
    icon: Users,
    color: "text-purple-600",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    trend,
    color = "text-primary",
  }: {
    title: string;
    value: string | number;
    description: string;
    icon: React.ElementType;
    trend?: string;
    color?: string;
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2">
          <p className="text-xs text-muted-foreground">{description}</p>
          {trend && (
            <Badge variant="secondary" className="text-xs">
              {trend}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening at your company today.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={statsData.totalEmployees}
          description="Active employees"
          icon={Users}
          trend="+12 this month"
          color="text-blue-600"
        />
        <StatCard
          title="Present Today"
          value={statsData.presentToday}
          description={`${((statsData.presentToday / statsData.totalEmployees) * 100).toFixed(1)}% attendance rate`}
          icon={UserCheck}
          trend="94.5%"
          color="text-green-600"
        />
        <StatCard
          title="Pending Approvals"
          value={statsData.pendingApprovals}
          description="Requires your attention"
          icon={AlertCircle}
          color="text-orange-600"
        />
        <StatCard
          title="Monthly Payroll"
          value={`$${(statsData.totalSalaryBudget / 1000).toFixed(0)}K`}
          description="Total salary budget"
          icon={DollarSign}
          trend="+5.2%"
          color="text-purple-600"
        />
      </div>

      {/* Detailed Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Today's Attendance</span>
            </CardTitle>
            <CardDescription>
              Real-time attendance tracking overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {statsData.presentToday}
                </div>
                <div className="text-sm text-muted-foreground">Present</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {statsData.absentToday}
                </div>
                <div className="text-sm text-muted-foreground">Absent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {statsData.onLeave}
                </div>
                <div className="text-sm text-muted-foreground">On Leave</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${(statsData.presentToday / statsData.totalEmployees) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {(
                (statsData.presentToday / statsData.totalEmployees) *
                100
              ).toFixed(1)}
              % attendance rate today
            </p>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`mt-1 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {user?.role !== "employee" && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common HR tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <button className="p-4 border border-border rounded-lg hover:bg-hr-background/50 transition-colors text-left">
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-medium">Add Employee</div>
                <div className="text-sm text-muted-foreground">
                  Register new employee
                </div>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-hr-background/50 transition-colors text-left">
                <Calendar className="w-6 h-6 text-green-600 mb-2" />
                <div className="font-medium">Approve Leaves</div>
                <div className="text-sm text-muted-foreground">
                  {statsData.leaveRequests} pending
                </div>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-hr-background/50 transition-colors text-left">
                <DollarSign className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-medium">Generate Payroll</div>
                <div className="text-sm text-muted-foreground">
                  Monthly salary sheets
                </div>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-hr-background/50 transition-colors text-left">
                <Clock className="w-6 h-6 text-orange-600 mb-2" />
                <div className="font-medium">Attendance Report</div>
                <div className="text-sm text-muted-foreground">
                  View detailed reports
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
