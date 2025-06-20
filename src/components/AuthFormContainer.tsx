import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthFormContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footerContent?: React.ReactNode;
  className?: string;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  children,
  title,
  description,
  footerContent,
  className,
}) => {
  console.log('AuthFormContainer loaded');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className={`w-full max-w-md shadow-xl ${className}`}>
        {(title || description) && (
          <CardHeader className="text-center">
            {title && <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>}
            {description && <CardDescription className="mt-2">{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className="space-y-6">
          {children}
        </CardContent>
        {footerContent && (
          <CardFooter className="flex flex-col items-center justify-center pt-6">
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthFormContainer;