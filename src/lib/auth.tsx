"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  loading: boolean;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if Supabase is properly configured
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    if (!configured) {
      console.warn('Supabase is not properly configured. Authentication will not work.');
      setLoading(false);
      return;
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        console.log('Initial session:', session);
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        console.log('Auth state changed:', event, 'Session:', session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!isConfigured) {
      return { success: false, error: 'Supabase is not properly configured' };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        return { success: false, error: error.message };
      }

      console.log('Sign up successful:', data);
      
      // Check if email confirmation is required
      if (data.user && !data.session) {
        return { 
          success: true, 
          message: 'Account created successfully! Please check your email to confirm your account before signing in.' 
        };
      }

      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      return { success: false, error: 'Supabase is not properly configured' };
    }

    try {
      console.log('Signing in with email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          return { 
            success: false, 
            error: 'Email not confirmed. Please check your email and click the confirmation link before signing in.',
            message: 'Please check your email and confirm your account.'
          };
        }
        
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'Invalid email or password' };
        }
        
        return { success: false, error: error.message };
      }

      console.log('Sign in successful:', data);
      console.log('User after sign in:', data.user);
      console.log('Session after sign in:', data.session);
      
      // Update state immediately
      setUser(data.user);
      setSession(data.session);
      
      return { success: true };
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    if (!isConfigured) {
      console.warn('Cannot sign out: Supabase is not properly configured');
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      // Clear state immediately
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Unexpected sign out error:', error);
    }
  };

  const requestPasswordReset = async (email: string) => {
    if (!isConfigured) {
      return { success: false, error: 'Supabase is not properly configured' };
    }

    try {
      // Determine redirect URL for password reset completion
      let redirectTo = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password` : '';
      if (typeof window !== 'undefined' && !redirectTo) {
        redirectTo = `${window.location.origin}/reset-password`;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        console.error('Password reset request error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, message: 'If an account exists, a reset email has been sent.' };
    } catch (error) {
      console.error('Unexpected password reset request error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const updatePassword = async (newPassword: string) => {
    if (!isConfigured) {
      return { success: false, error: 'Supabase is not properly configured' };
    }

    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        console.error('Update password error:', error);
        return { success: false, error: error.message };
      }
      // If successful, data.user should be present and session may update
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      console.error('Unexpected update password error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const value = {
    isAuthenticated: !!user,
    user,
    session,
    signUp,
    signIn,
    signOut,
    requestPasswordReset,
    updatePassword,
    loading,
    isConfigured,
  };

  console.log('Auth context state:', { isAuthenticated: !!user, loading, isConfigured });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 