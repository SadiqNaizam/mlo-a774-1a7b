import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail } from 'lucide-react';

import AuthFormContainer from '@/components/AuthFormContainer';
import LogoDisplay from '@/components/LogoDisplay';
import MinimalHeader from '@/components/layout/MinimalHeader';
import MinimalFooter from '@/components/layout/MinimalFooter';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const [submissionMessage, setSubmissionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    console.log('Forgot password form submitted:', data);
    setSubmissionMessage(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success
    setSubmissionMessage({
      type: 'success',
      text: "If an account with that email address exists, a password reset link has been sent. Please check your inbox (and spam folder).",
    });
    form.reset(); // Clear the form on success

    // Simulate error (example)
    // setSubmissionMessage({ type: 'error', text: "An unexpected error occurred. Please try again." });
  };

  const pageFooterContent = (
    <div className="text-center text-sm text-muted-foreground">
      <p>
        Remembered your password?{' '}
        <Link to="/" className="font-medium text-primary hover:underline">
          Sign In
        </Link>
      </p>
      <p className="mt-2">
        Don't have an account?{' '}
        <Link to="/registration" className="font-medium text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );

  return (
    <>
      <MinimalHeader />
      <AuthFormContainer
        title="Forgot Your Password?"
        description="No problem! Enter your email address below and we'll send you a link to reset your password."
        footerContent={pageFooterContent}
      >
        <div className="flex justify-center mb-6">
          <LogoDisplay homePath="/" imgSizeClassName="h-12 w-auto" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submissionMessage && (
              <Alert variant={submissionMessage.type === 'error' ? 'destructive' : 'default'} className={submissionMessage.type === 'success' ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400' : ''}>
                <AlertDescription>{submissionMessage.text}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Sending Link...' : 'Send Password Reset Link'}
            </Button>
          </form>
        </Form>
      </AuthFormContainer>
      <MinimalFooter />
    </>
  );
};

export default ForgotPasswordPage;