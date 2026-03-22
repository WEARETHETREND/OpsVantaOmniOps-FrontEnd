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

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined); // undefined = loading

  useEffect(() => {
    // Get the current session on mount
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Still loading — show nothing (or a spinner)
  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0d14]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
