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

import { Navigate } from 'react-router-dom';

function hasAuthToken() {
  return Boolean(localStorage.getItem('opsvanta_token'));
}

export default function ProtectedRoute({ children }) {
  if (!hasAuthToken()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
