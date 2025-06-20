import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

// Custom Components
import MinimalHeader from '@/components/layout/MinimalHeader';
import AuthFormContainer from '@/components/AuthFormContainer';
import LogoDisplay from '@/components/LogoDisplay';
import MinimalFooter from '@/components/layout/MinimalFooter';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Used by react-hook-form's FormLabel
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const registrationFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Show error on confirmPassword field
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<{ type: 'error' | 'success'; title: string; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    console.log('RegistrationPage loaded');
  }, []);

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    setAlertMessage(null);
    console.log('Registration form submitted:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful registration
    // In a real app, you would handle API responses here
    const registrationSuccessful = true; // Math.random() > 0.3; // Simulate potential failure

    if (registrationSuccessful) {
      setAlertMessage({
        type: 'success',
        title: 'Registration Successful!',
        message: "Your account has been created. You can now log in.",
      });
      form.reset();
      // Optional: redirect to login after a short delay
      // setTimeout(() => navigate('/'), 2000);
    } else {
      setAlertMessage({
        type: 'error',
        title: 'Registration Failed',
        message: "An unexpected error occurred. Please try again.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <MinimalHeader />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormContainer
          title="Create your account"
          description="Fill in the details below to get started."
          footerContent={
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                Sign in
              </Link>
            </p>
          }
          className="w-full max-w-lg" // Slightly wider for registration forms if needed
        >
          <div className="mb-6 flex justify-center">
            {/* App.tsx routes '/' to LoginPage, so LogoDisplay links to LoginPage */}
            <LogoDisplay 
              homePath="/" 
              logoSrc="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" 
              altText="AuthApp Logo" 
              imgSizeClassName="h-10 w-auto"
            />
          </div>

          {alertMessage && (
            <Alert variant={alertMessage.type === 'error' ? 'destructive' : 'default'} className="mb-6">
              <AlertTitle>{alertMessage.title}</AlertTitle>
              <AlertDescription>{alertMessage.message}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} disabled={isSubmitting} />
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
                      <Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </Form>
        </AuthFormContainer>
      </main>
      <MinimalFooter />
    </div>
  );
};

export default RegistrationPage;