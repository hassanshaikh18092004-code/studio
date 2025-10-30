
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Blocks } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email to sign in.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, you'd perform authentication here.
    // For this demo, we'll just save the email to local storage as the user ID.
    localStorage.setItem('blockExplorerUser', email);
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-body p-4">
      <header className="flex items-center justify-center mb-8 text-center">
        <Blocks className="h-10 w-10 text-primary-foreground mr-3" />
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-headline">Block Explorers</h1>
          <p className="text-base text-muted-foreground">Welcome Back!</p>
        </div>
      </header>
      <main className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your email to load your progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
