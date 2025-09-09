"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from 'sonner'
import Link from "next/link";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would call an API
    toast("Welcome back!", {
      
      description: "You have successfully signed in to CCAP.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="bg-gradient-hero text-primary-foreground px-6 py-3 rounded-lg font-bold text-2xl inline-block mb-4">
              CCAP
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Sign in to your account
            </h2>
            <p className="mt-2 text-muted-foreground">
              Access climate project data and transparency tools
            </p>
          </div>

          {/* Sign In Form */}
          <Card className="border-border bg-gradient-card shadow-elegant">
            <CardHeader>
              <CardTitle className="text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
                      Remember me
                    </Label>
                  </div>

                  <Link href ="/forgot-password" className="text-sm text-primary hover:text-primary-hover">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-gradient-hero hover:opacity-90 shadow-climate">
                  Sign In
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button variant="outline" className="w-full">
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    Facebook
                  </Button>
                  <Button variant="outline" className="w-full">
                    Microsoft
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href ="/signup" className="text-primary hover:text-primary-hover font-medium">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:text-primary-hover">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href ="/privacy" className="text-primary hover:text-primary-hover">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;