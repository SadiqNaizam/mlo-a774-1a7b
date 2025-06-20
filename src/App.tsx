import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeProvider"; // Added import

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import PostAuthLandingPage from "./pages/PostAuthLandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<ThemeProvider defaultTheme="system" storageKey="ui-theme"> {/* Wrapped with ThemeProvider */}
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>


            <Route path="/" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
            <Route path="/post-auth-landing" element={<PostAuthLandingPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            {/* catch-all */}
            <Route path="*" element={<NotFound />} />


          </Routes>
      </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
</ThemeProvider>
);

export default App;