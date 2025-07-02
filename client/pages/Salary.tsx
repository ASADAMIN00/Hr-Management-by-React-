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
  DollarSign,
  TrendingUp,
  FileText,
  CheckCircle,
  Plus,
  CreditCard,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SalaryRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  finalSalary: number;
  status: "pending" | "approved" | "paid";
  month: string;
  avatar?: string;
  department: string;
}

const mockSalaryData: SalaryRecord[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "Sarah Johnson",
    baseSalary: 95000,
    bonus: 5000,
    deductions: 2000,
    finalSalary: 98000,
    status: "pending",
    month: "March 2024",
    department: "Engineering",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Mike Chen",
    baseSalary: 105000,
    bonus: 3000,
    deductions: 1500,
    finalSalary: 106500,
    status: "approved",
    month: "March 2024",
    department: "Product",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Emily Rodriguez",
    baseSalary: 78000,
    bonus: 2000,
    deductions: 1000,
    finalSalary: 79000,
    status: "paid",
    month: "March 2024",
    department: "Design",
  },
  {
    id: "4",
    employeeId: "4",
    employeeName: "James Wilson",
    baseSalary: 85000,
    bonus: 1000,
    deductions: 800,
    finalSalary: 85200,
    status: "pending",
    month: "March 2024",
    department: "Sales",
  },
  {
    id: "5",
    employeeId: "5",
    employeeName: "Lisa Anderson",
    baseSalary: 68000,
    bonus: 1500,
    deductions: 600,
    finalSalary: 68900,
    status: "approved",
    month: "March 2024",
    department: "Human Resources",
  },
];

export default function Salary() {
  const [salaryRecords, setSalaryRecords] =
    useState<SalaryRecord[]>(mockSalaryData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: number }>({});

  const stats = {
    totalPayroll: salaryRecords.reduce(
      (sum, record) => sum + record.finalSalary,
      0,
    ),
    averageSalary:
      salaryRecords.reduce((sum, record) => sum + record.finalSalary, 0) /
      salaryRecords.length,
    pendingApprovals: salaryRecords.filter((r) => r.status === "pending")
      .length,
    processed: salaryRecords.filter((r) => r.status === "paid").length,
  };

  const updateSalaryStatus = (
    id: string,
    status: "pending" | "approved" | "paid",
  ) => {
    setSalaryRecords((prev) =>
      prev.map((record) => (record.id === id ? { ...record, status } : record)),
    );

    const action = status === "approved" ? "approved" : "marked as paid";
    toast({
      title: "Salary Updated",
      description: `Salary has been ${action} successfully.`,
    });
  };

  const startEditing = (record: SalaryRecord) => {
    setEditingId(record.id);
    setEditValues({
      baseSalary: record.baseSalary,
      bonus: record.bonus,
      deductions: record.deductions,
    });
  };

  const saveEditing = (id: string) => {
    const values = editValues;
    const finalSalary = values.baseSalary + values.bonus - values.deductions;

    setSalaryRecords((prev) =>
      prev.map((record) =>
        record.id === id
          ? {
              ...record,
              baseSalary: values.baseSalary,
              bonus: values.bonus,
              deductions: values.deductions,
              finalSalary: finalSalary,
              status: "pending" as const,
            }
          : record,
      ),
    );

    setEditingId(null);
    setEditValues({});

    toast({
      title: "Salary Updated",
      description: "Salary details have been updated successfully.",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValues({});
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
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Approved
          </Badge>
        );
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Paid
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
          Salary Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage payroll, salary sheets, and compensation
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Payroll
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${(stats.totalPayroll / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              Total monthly budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Salary
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${(stats.averageSalary / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              Per employee monthly
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.pendingApprovals}
            </div>
            <p className="text-xs text-muted-foreground">
              Salary sheets pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.processed}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Salary Management</CardTitle>
          <CardDescription>
            Manage employee salaries, bonuses, and deductions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Final Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaryRecords.map((record) => (
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
                        <div>
                          <div className="font-medium">
                            {record.employeeName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {record.department}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {editingId === record.id ? (
                        <Input
                          type="number"
                          value={editValues.baseSalary || record.baseSalary}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              baseSalary: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-20"
                        />
                      ) : (
                        <span className="font-medium">
                          ${record.baseSalary.toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === record.id ? (
                        <Input
                          type="number"
                          value={editValues.bonus || record.bonus}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              bonus: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-20"
                        />
                      ) : (
                        <span className="text-green-600">
                          ${record.bonus.toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === record.id ? (
                        <Input
                          type="number"
                          value={editValues.deductions || record.deductions}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              deductions: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-20"
                        />
                      ) : (
                        <span className="text-red-600">
                          ${record.deductions.toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-primary">
                        $
                        {editingId === record.id
                          ? (
                              editValues.baseSalary +
                              editValues.bonus -
                              editValues.deductions
                            ).toLocaleString()
                          : record.finalSalary.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {editingId === record.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => saveEditing(record.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={cancelEditing}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditing(record)}
                            >
                              Edit
                            </Button>
                            {record.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateSalaryStatus(record.id, "approved")
                                }
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Approve
                              </Button>
                            )}
                            {record.status === "approved" && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateSalaryStatus(record.id, "paid")
                                }
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CreditCard className="w-3 h-3 mr-1" />
                                Pay
                              </Button>
                            )}
                          </>
                        )}
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
