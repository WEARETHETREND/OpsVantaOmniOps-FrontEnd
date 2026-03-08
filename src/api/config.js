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

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

if (!import.meta.env.VITE_API_URL) {
  console.warn('VITE_API_URL is not defined. Falling back to http://localhost:8000');
}
