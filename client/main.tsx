import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import Attendance from "./pages/Attendance";
import Salary from "./pages/Salary";
import Leave from "./pages/Leave";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              }
            />
            <Route
              path="/employees"
              element={
                <AppLayout>
                  <EmployeeManagement />
                </AppLayout>
              }
            />
            <Route
              path="/attendance"
              element={
                <AppLayout>
                  <Attendance />
                </AppLayout>
              }
            />
            <Route
              path="/salary"
              element={
                <AppLayout>
                  <Salary />
                </AppLayout>
              }
            />
            <Route
              path="/leave"
              element={
                <AppLayout>
                  <Leave />
                </AppLayout>
              }
            />
            {/* Placeholder routes for remaining modules */}
            <Route
              path="/companies"
              element={
                <AppLayout>
                  <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">
                      Company Management
                    </h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </AppLayout>
              }
            />
            <Route
              path="/reports"
              element={
                <AppLayout>
                  <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Reports</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </AppLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <AppLayout>
                  <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Settings</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </AppLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <AppLayout>
                  <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">My Profile</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </AppLayout>
              }
            />
            <Route
              path="/my-attendance"
              element={
                <AppLayout>
                  <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">My Attendance</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </AppLayout>
              }
            />
            <Route
              path="/my-salary"
              element={
                <AppLayout>
                  <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">My Salary</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </AppLayout>
              }
            />
            <Route
              path="/apply-leave"
              element={
                <AppLayout>
                  <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Apply for Leave</h1>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </AppLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
