/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 *
 * © 2026 OpsVanta LLC
 * ALL RIGHTS RESERVED
 *
 * UNAUTHORIZED ACCESS, USE, OR DISTRIBUTION PROHIBITED
 *
 * This file contains trade secrets and confidential information.
 * Violators will be prosecuted under trade secret law.
 *
 * For licensing: contact@opsvanta.com
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Login from './Login';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSignIn = async (email, password) => {
    setLoading(true);
    setError('');
    setInfo('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message || 'Sign in failed. Please check your credentials.');
    } else {
      navigate('/dashboard');
    }
  };

  const handleSignUp = async (email, password) => {
    setLoading(true);
    setError('');
    setInfo('');
    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message || 'Sign up failed. Please try again.');
    } else {
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      setError('Please enter your email address first, then click "Forgot password?"');
      return;
    }
    setLoading(true);
    setError('');
    setInfo('');
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message || 'Password reset failed. Please try again.');
    } else {
      setInfo('Password reset email sent! Check your inbox.');
    }
  };

  return (
    <Login
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
      onForgotPassword={handleForgotPassword}
      loading={loading}
      error={error}
      info={info}
    />
  );
}
