import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { login } from "@/lib/api";
import happyFoxLogo from "@/assets/happyfox-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const me = await login(email, password);
      if (me.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/intern");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
    <header className="bg-black/90 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/hf-logo-light.svg" alt="HappyFox" className="h-6 w-auto" />
            {/* <span className="text-xl font-bold text-background">HappyFox</span> */}
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-background hover:text-background/80 hover:bg-background/10">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary hover:bg-primary-hover" style={{ borderRadius: '4px' }}>
                Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-center">
          {/* Left Side - Content */}
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-6">
               <h1 data-reveal className="text-5xl md:text-5xl font-semibold text-foreground mb-6 leading-tight " style={{ fontFamily: 'Inter, sans-serif' , fontWeight: '500'}}>
            Intern Management<br />
            <span className="text-primary block mt-3">System</span>
          </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl" style={{fontFamily: 'Inter, sans-serif', fontWeight: '300', fontSize: '18px', lineHeight: '1.6'}}>
                Streamline your intern program with powerful project tracking, collaboration tools, and performance analytics.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Handle all projects in one system</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Centralized workspace for seamless team collaboration
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Track progress and milestones</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Real-time monitoring with detailed analytics dashboard
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Make data-driven decisions</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Comprehensive insights for better performance evaluations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-card border border-border/50 rounded-2xl p-8 lg:p-10 shadow-card">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Welcome back</h2>
                  <p className="text-muted-foreground">
                    Sign in to your account to continue
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Work Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 border-border"
                    />
                  </div>
                  
               
                  
                  <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                  {error && (
                    <div className="text-red-600 text-sm text-center" role="alert">
                      {error}
                    </div>
                  )}
                  
                  <div className="text-center text-sm pt-2">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link to="/register" className="text-primary hover:underline font-semibold">
                      Create account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
