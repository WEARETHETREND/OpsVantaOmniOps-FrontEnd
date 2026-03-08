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

import { useNavigate } from 'react-router-dom';
import Login from './Login';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (token) => {
    localStorage.setItem('opsvanta_token', token);
    navigate('/builder');
  };

  return <Login onLogin={handleLogin} />;
}
