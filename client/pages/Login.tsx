import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Building2, Users, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description: "Comprehensive employee records and profiles",
    },
    {
      icon: Clock,
      title: "Attendance Tracking",
      description: "Real-time attendance monitoring and reports",
    },
    {
      icon: DollarSign,
      title: "Payroll Management",
      description: "Automated salary calculations and processing",
    },
    {
      icon: Building2,
      title: "Multi-Company Support",
      description: "Manage multiple companies from one platform",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-hr-background via-white to-hr-blue/5 flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 bg-gradient-to-br from-primary to-hr-blue-dark">
        <div className="max-w-md">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">HRMS Pro</h1>
              <p className="text-blue-100">Human Resource Management</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Streamline Your HR Operations
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Manage employees, track attendance, process payroll, and handle HR
            operations all in one comprehensive platform.
          </p>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center space-x-2 mb-4 lg:hidden">
                <Building2 className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  HRMS Pro
                </span>
              </div>
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription className="text-base">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Demo credentials: asad47952@gmail.com / 123456
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
