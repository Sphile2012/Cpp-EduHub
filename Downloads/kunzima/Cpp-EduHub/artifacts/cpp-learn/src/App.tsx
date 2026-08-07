import React from 'react';
import { Router, Route } from 'wouter';
import { AuthProvider } from '@/hooks/use-auth';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import ProfilePage from '@/pages/profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/" component={LoginPage} />
        <Route path="/dashboard" component={ProfilePage} />
      </AuthProvider>
    </Router>
  );
}

export default App;
