import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

// Custom Components
import MinimalHeader from '@/components/layout/MinimalHeader';
import MinimalFooter from '@/components/layout/MinimalFooter';
import AuthFormContainer from '@/components/AuthFormContainer';
import LogoDisplay from '@/components/LogoDisplay';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// Label is part of FormLabel from shadcn/ui Form

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(1, { message: "Email is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setSubmissionError(null);
    console.log('Login attempt with:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Placeholder authentication logic
    if (data.email === 'user@example.com' && data.password === 'password') {
      toast.success('Login Successful!', {
        description: 'Redirecting to your dashboard...',
      });
      navigate('/post-auth-landing'); // Path from App.tsx
    } else {
      setSubmissionError('Invalid email or password. Please try again.');
      // form.resetField("password"); // Optionally clear password field
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <MinimalHeader />
      <main className="flex-grow flex items-center justify-center">
        <AuthFormContainer
          title="Welcome Back!"
          description="Please enter your credentials to log in."
          footerContent={
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link to="/registration" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
          }
        >
          <div className="mb-6 flex justify-center">
            <LogoDisplay homePath="/" imgSizeClassName="h-12 w-auto" />
          </div>

          {submissionError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{submissionError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between flex-wrap gap-2">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="rememberMe"
                        />
                      </FormControl>
                      <FormLabel htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Link
                  to="/forgot-password" // Path from App.tsx
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
        </AuthFormContainer>
      </main>
      <MinimalFooter />
    </div>
  );
};

export default LoginPage;