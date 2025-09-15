// 'use client';
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// import { LogIn, Shield, Users } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { useAuth } from '@/contexts/AuthContexta';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login, isLoading } = useAuth();
//   const navigate = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     const success = await login(email, password);
//     if (success) {
//       toast.success("Welcome back!",{
        
//         description: "You have successfully logged in.",
//       });
//       navigate.push('/admin/dashboard');
//     } else {
//       setError('Invalid email or password');
//     }
//   };

//   const fillDemoCredentials = (role: 'admin' | 'actor') => {
//     if (role === 'admin') {
//       setEmail('admin@dashboard.com');
//       setPassword('admin123');
//     } else {
//       setEmail('actor@dashboard.com');
//       setPassword('actor123');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
//       <div className="w-full max-w-md space-y-6">
//         <div className="text-center space-y-4">
//           <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-medium">
//             <Shield className="w-8 h-8 text-primary" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2"> CCAP</h1>
//             <p className="text-white/80">Access your  dashboard here</p>
//           </div>
//         </div>

//         <Card className="shadow-strong border-0">
//           <CardHeader className="space-y-2">
//             <CardTitle className="text-2xl text-center">Sign In</CardTitle>
//             <CardDescription className="text-center">
//               Enter your credentials to access the dashboard
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="transition-smooth focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="transition-smooth focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-smooth"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     <span>Signing in...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <LogIn className="w-4 h-4" />
//                     <span>Sign In</span>
//                   </div>
//                 )}
//               </Button>
//             </form>

//             <div className="space-y-3">
//               <div className="text-center text-sm text-muted-foreground">
//                 Demo Credentials
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => fillDemoCredentials('admin')}
//                   className="text-xs"
//                 >
//                   <Shield className="w-3 h-3 mr-1" />
//                   Admin
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => fillDemoCredentials('actor')}
//                   className="text-xs"
//                 >
//                   <Users className="w-3 h-3 mr-1" />
//                   Actor
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }