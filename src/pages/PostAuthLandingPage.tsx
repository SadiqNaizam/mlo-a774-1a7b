import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MinimalHeader from '@/components/layout/MinimalHeader'; // Custom component
import MinimalFooter from '@/components/layout/MinimalFooter'; // Custom component
import { Button } from '@/components/ui/button'; // shadcn/ui
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'; // shadcn/ui
import { LogOut, UserCircle } from 'lucide-react'; // Icons

const PostAuthLandingPage: React.FC = () => {
  console.log('PostAuthLandingPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd also clear auth tokens/session here
    console.log('User logging out');
    navigate('/'); // Navigate to LoginPage as per App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <MinimalHeader />

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <UserCircle className="mx-auto h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">
              You have successfully logged in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p>
              This is your personal landing page. From here, you can navigate to various sections of the application.
            </p>
            {/* Placeholder for future navigation or dashboard content */}
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
              <h3 className="font-semibold text-lg mb-2">Next Steps:</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Explore your dashboard (Content TBD)</li>
                <li>Manage your profile settings (Link TBD)</li>
                <li>Check recent activity (Feature TBD)</li>
              </ul>
            </div>
            <Button 
              onClick={handleLogout} 
              className="w-full sm:w-auto"
              variant="outline"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </CardContent>
        </Card>
      </main>

      <MinimalFooter />
    </div>
  );
};

export default PostAuthLandingPage;