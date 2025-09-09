
"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Bot } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground font-body p-4 lg:p-6">
      <header className="flex items-center justify-center mb-8">
        <Bot className="h-12 w-12 text-primary mr-4" />
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline">Block Explorers</h1>
          <p className="text-lg text-muted-foreground">A Visual Programming Adventure</p>
        </div>
      </header>
      <main className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Choose Your Path</CardTitle>
            <CardDescription>Select a programming language to begin your learning adventure.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/c" passHref>
              <Button variant="outline" className="w-full h-32 text-2xl flex-col gap-2 transition-transform transform hover:scale-105">
                  <div className='flex items-center'>
                    <Code className="h-8 w-8 mr-2" />
                    <span>C</span>
                  </div>
                  <span className='text-sm font-normal text-muted-foreground'>Learn the fundamentals</span>
              </Button>
            </Link>
            <Link href="/python" passHref>
              <Button variant="outline" className="w-full h-32 text-2xl flex-col gap-2 transition-transform transform hover:scale-105">
                <div className='flex items-center'>
                    <Code className="h-8 w-8 mr-2" />
                    <span>Python</span>
                </div>
                <span className='text-sm font-normal text-muted-foreground'>Start with a beginner-friendly language</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
      <footer className="absolute bottom-4 text-center text-muted-foreground text-sm">
        <p>Select a language to start solving puzzles and mastering code!</p>
      </footer>
    </div>
  );
}
