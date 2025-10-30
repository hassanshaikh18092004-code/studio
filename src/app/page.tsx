
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Blocks, LogOut } from 'lucide-react';

export default function HomePage() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('blockExplorerUser');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(storedUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('blockExplorerUser');
    setUser(null);
    router.push('/login');
  };

  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-body p-4">
      <header className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
        <div className="flex items-center">
            <Blocks className="h-8 w-8 text-primary-foreground mr-3" />
            <h1 className="text-xl font-bold font-headline">Block Explorers</h1>
        </div>
        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>
      <main className="w-full max-w-md sm:max-w-lg text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Choose Your Path</CardTitle>
            <CardDescription className="pt-2">Welcome, {user}! Select a programming language to begin your adventure.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/c" passHref>
              <Button variant="outline" className="w-full h-28 text-xl flex-col gap-2">
                  <div className='flex items-center'>
                    <Code className="h-7 w-7 mr-2" />
                    <span>C</span>
                  </div>
                  <span className='text-xs font-normal text-muted-foreground'>Learn the fundamentals</span>
              </Button>
            </Link>
            <Link href="/python" passHref>
              <Button variant="outline" className="w-full h-28 text-xl flex-col gap-2">
                <div className='flex items-center'>
                    <Code className="h-7 w-7 mr-2" />
                    <span>Python</span>
                </div>
                <span className='text-xs font-normal text-muted-foreground'>Start with a beginner-friendly language</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
      <footer className="mt-8 text-center text-muted-foreground text-sm">
        <p>Select a language to start solving puzzles!</p>
      </footer>
    </div>
  );
}
